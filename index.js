const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers,
  jidNormalizedUser,
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { checkText } = require('./badwords');
const { t, DEFAULT_LANG, translations } = require('./lang');

const AUTH_DIR = './auth';
const DATA_DIR = './data';
const BANNED_FILE = path.join(DATA_DIR, 'banned.json');
const LANGS_FILE = path.join(DATA_DIR, 'langs.json');
const MUTES_FILE = path.join(DATA_DIR, 'mutes.json');
const WARNINGS_FILE = path.join(DATA_DIR, 'warnings.json');
const CUSTOM_WORDS_FILE = path.join(DATA_DIR, 'custom_words.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const IGNORED_FILE = path.join(DATA_DIR, 'ignored.json');
const LOG_LEVEL = 'info';
const ADMIN_CACHE_TTL = 60_000;
const NON_ADMIN_INTERVAL = 60_000;
const SPAM_WINDOW = 5000;
const SPAM_THRESHOLD = 5;
const SPAM_MUTE_DURATION = 300_000;
const DEFAULT_WARN_LIMIT = 3;
const PURGE_BUFFER = 100;

const logger = pino({
  level: LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
      hideObject: true,
    },
  },
});
const adminCache = new Map();
const nonAdminNotified = new Map();
const bannedUsers = new Map();
const groupLangs = new Map();
const mutedUsers = new Map();
const warnings = new Map();
const customBadwords = new Map();
const groupSettings = new Map();
const spamTimestamps = new Map();
const msgKeyBuffer = new Map();
const ignoredUsers = new Map();
const groupStats = new Map();

const STATUS = {
  startTime: Date.now(),
  connected: false,
  groupsCount: 0,
};

function isGroup(jid) {
  return jid?.endsWith('@g.us');
}

function getBotId(sock) {
  return sock.user?.id;
}

async function isBotAdmin(sock, groupJid) {
  const botId = getBotId(sock);
  if (!botId) return null;

  const now = Date.now();
  const cached = adminCache.get(groupJid);
  if (cached && (now - cached.time) < ADMIN_CACHE_TTL) {
    return cached.value;
  }

  try {
    const normalizedBotIds = new Set([
      jidNormalizedUser(botId),
      sock.user?.lid ? jidNormalizedUser(sock.user.lid) : null,
      botId,
      sock.user?.lid,
    ].filter(Boolean));
    const meta = await sock.groupMetadata(groupJid);
    const me = meta.participants.find((p) => {
      return normalizedBotIds.has(p.id) || normalizedBotIds.has(jidNormalizedUser(p.id));
    });
    const result = !!(me?.admin === 'admin' || me?.admin === 'superadmin' || me?.isAdmin);
    adminCache.set(groupJid, { time: now, value: result });
    return result;
  } catch (err) {
    logger.error({ err, groupJid }, 'Failed to fetch group metadata');
    return null;
  }
}

function extractText(msg) {
  if (!msg.message) return null;
  const m = msg.message;
  if (m.conversation) return m.conversation;
  if (m.extendedTextMessage?.text) return m.extendedTextMessage.text;
  if (m.imageMessage?.caption) return m.imageMessage.caption;
  if (m.videoMessage?.caption) return m.videoMessage.caption;
  if (m.documentMessage?.caption) return m.documentMessage.caption;
  if (m.audioMessage?.caption) return m.audioMessage.caption;
  return null;
}

const loadJson = (file, label) => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      logger.info({ count: Object.keys(data).length }, `Loaded ${label}`);
      return data;
    }
  } catch (err) {
    logger.error({ err }, `Failed to load ${label}`);
  }
  return {};
};

const saveJson = (file, label, data) => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    logger.error({ err }, `Failed to save ${label}`);
  }
};

function loadBannedUsers() {
  const data = loadJson(BANNED_FILE, 'banned users');
  for (const [gJid, users] of Object.entries(data)) {
    bannedUsers.set(gJid, new Set(users));
  }
}
function saveBannedUsers() {
  const data = {};
  for (const [gJid, users] of bannedUsers) data[gJid] = [...users];
  saveJson(BANNED_FILE, 'banned users', data);
}

function loadGroupLangs() {
  const data = loadJson(LANGS_FILE, 'group languages');
  for (const [gJid, lang] of Object.entries(data)) groupLangs.set(gJid, lang);
}
function saveGroupLangs() {
  saveJson(LANGS_FILE, 'group languages', Object.fromEntries(groupLangs));
}

function getGroupLang(groupJid) {
  return groupLangs.get(groupJid) || DEFAULT_LANG;
}

function loadMutes() {
  const data = loadJson(MUTES_FILE, 'muted users');
  for (const [gJid, users] of Object.entries(data)) {
    const map = new Map();
    for (const [user, expires] of Object.entries(users)) map.set(user, expires);
    mutedUsers.set(gJid, map);
  }
  cleanExpiredMutes();
}
function saveMutes() {
  const data = {};
  for (const [gJid, users] of mutedUsers) {
    const obj = {};
    for (const [u, e] of users) obj[u] = e;
    if (Object.keys(obj).length) data[gJid] = obj;
  }
  saveJson(MUTES_FILE, 'muted users', data);
}

function isMuted(groupJid, userJid) {
  const group = mutedUsers.get(groupJid);
  if (!group) return false;
  const expires = group.get(userJid);
  if (!expires) return false;
  if (Date.now() > expires) {
    group.delete(userJid);
    if (group.size === 0) mutedUsers.delete(groupJid);
    saveMutes();
    return false;
  }
  return true;
}

async function checkExpiredMutes(sock) {
  const now = Date.now();
  for (const [gJid, users] of mutedUsers) {
    for (const [user, expires] of users) {
      if (now > expires) {
        users.delete(user);
        const lang = getGroupLang(gJid);
        let groupName = gJid;
        try { groupName = (await sock.groupMetadata(gJid)).subject || gJid; } catch (_) {}
        try {
          await sock.sendMessage(user, { text: t(lang, 'unmuteDm')(groupName) });
        } catch (_) {}
        try {
          await sock.sendMessage(gJid, { text: t(lang, 'unmuteGc')(user.split('@')[0]), mentions: [user] });
        } catch (_) {}
        saveMutes();
      }
    }
    if (users.size === 0) mutedUsers.delete(gJid);
  }
}

function cleanExpiredMutes() {
  for (const [gJid, users] of mutedUsers) {
    for (const [user, expires] of users) {
      if (Date.now() > expires) users.delete(user);
    }
    if (users.size === 0) mutedUsers.delete(gJid);
  }
}

function parseDuration(text) {
  const match = text.trim().match(/^(\d+)\s*(s|m|d)?$/i);
  if (!match) return null;
  const n = parseInt(match[1], 10);
  return n * ({ s: 1000, m: 60_000, d: 86_400_000 })[(match[2] || 'm').toLowerCase()];
}

function formatDuration(ms) {
  if (ms >= 86_400_000) return `${ms / 86_400_000}d`;
  if (ms >= 60_000) return `${ms / 60_000}m`;
  return `${ms / 1000}s`;
}

function getMentionedJids(msg) {
  if (!msg.message) return [];
  for (const key of Object.keys(msg.message)) {
    if (msg.message[key]?.contextInfo?.mentionedJid?.length) {
      return msg.message[key].contextInfo.mentionedJid;
    }
  }
  return [];
}

function loadWarnings() {
  const data = loadJson(WARNINGS_FILE, 'warnings');
  for (const [gJid, users] of Object.entries(data)) {
    const map = new Map();
    for (const [user, entries] of Object.entries(users)) map.set(user, entries);
    warnings.set(gJid, map);
  }
}
function saveWarnings() {
  const data = {};
  for (const [gJid, users] of warnings) {
    data[gJid] = Object.fromEntries(users);
  }
  saveJson(WARNINGS_FILE, 'warnings', data);
}

function addWarning(groupJid, userJid, reason, by) {
  if (!warnings.has(groupJid)) warnings.set(groupJid, new Map());
  const users = warnings.get(groupJid);
  if (!users.has(userJid)) users.set(userJid, []);
  users.get(userJid).push({ reason, by, time: Date.now() });
  saveWarnings();
  return users.get(userJid).length;
}

function getWarnLimit(groupJid) {
  return groupSettings.get(groupJid)?.warnLimit || DEFAULT_WARN_LIMIT;
}

function loadCustomBadwords() {
  const data = loadJson(CUSTOM_WORDS_FILE, 'custom words');
  for (const [gJid, words] of Object.entries(data)) {
    customBadwords.set(gJid, new Set(words));
  }
}
function saveCustomBadwords() {
  const data = {};
  for (const [gJid, words] of customBadwords) data[gJid] = [...words];
  saveJson(CUSTOM_WORDS_FILE, 'custom words', data);
}

function loadSettings() {
  const data = loadJson(SETTINGS_FILE, 'group settings');
  for (const [gJid, settings] of Object.entries(data)) {
    groupSettings.set(gJid, settings);
  }
}
function saveSettings() {
  const data = Object.fromEntries(groupSettings);
  saveJson(SETTINGS_FILE, 'group settings', data);
}

function getSetting(groupJid, key, def) {
  return groupSettings.get(groupJid)?.[key] ?? def;
}

function setSetting(groupJid, key, value) {
  if (!groupSettings.has(groupJid)) groupSettings.set(groupJid, {});
  groupSettings.get(groupJid)[key] = value;
  saveSettings();
}

function trackMsgKey(groupJid, key) {
  if (!msgKeyBuffer.has(groupJid)) msgKeyBuffer.set(groupJid, []);
  const buf = msgKeyBuffer.get(groupJid);
  buf.push(key);
  if (buf.length > PURGE_BUFFER) buf.shift();
}

function loadIgnored() {
  const data = loadJson(IGNORED_FILE, 'ignored users');
  for (const [gJid, users] of Object.entries(data)) {
    ignoredUsers.set(gJid, new Set(users));
  }
}
function saveIgnored() {
  const data = {};
  for (const [gJid, s] of ignoredUsers) data[gJid] = [...s];
  saveJson(IGNORED_FILE, 'ignored users', data);
}

function isIgnored(groupJid, userJid) {
  return ignoredUsers.get(groupJid)?.has(userJid) || false;
}

function bumpStat(groupJid, key) {
  if (!groupStats.has(groupJid)) groupStats.set(groupJid, { warns: 0, bans: 0, kicks: 0, mutes: 0, deleted: 0, lastDay: 0 });
  const s = groupStats.get(groupJid);
  s[key] = (s[key] || 0) + 1;
  if (Date.now() - s.lastDay > 86400000) { s.lastDay = Date.now(); s.today = 0; }
  s.today = (s.today || 0) + 1;
}

function checkSpam(groupJid, userJid) {
  if (!groupJid || !userJid) return false;
  if (!getSetting(groupJid, 'antiSpam', true)) return false;

  if (!spamTimestamps.has(groupJid)) spamTimestamps.set(groupJid, new Map());
  const users = spamTimestamps.get(groupJid);
  if (!users.has(userJid)) users.set(userJid, []);
  const stamps = users.get(userJid);
  stamps.push(Date.now());
  const cutoff = Date.now() - SPAM_WINDOW;
  while (stamps.length && stamps[0] < cutoff) stamps.shift();
  return stamps.length >= SPAM_THRESHOLD;
}

function checkCustomWords(text, groupJid) {
  if (!text) return { found: false };
  const words = customBadwords.get(groupJid);
  if (!words || words.size === 0) return { found: false };
  const tokens = text.toLowerCase().split(/[\s\-_.,!?;:'"()\[\]{}<>\/\\|@#$%^&*+=~`]+/).filter(Boolean);
  for (const token of tokens) {
    if (words.has(token)) return { found: true, word: token };
  }
  const compact = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const w of words) {
    if (w.length >= 3 && compact.includes(w.toLowerCase())) return { found: true, word: w };
  }
  return { found: false };
}

async function autoPunish(sock, groupJid, userJid, groupName) {
  const count = (warnings.get(groupJid)?.get(userJid) || []).length;
  const limit = getWarnLimit(groupJid);
  if (count < limit) return false;

  const punish = getSetting(groupJid, 'warnPunish', 'ban');
  const lang = getGroupLang(groupJid);

  try {
    if (punish === 'mute') {
      const duration = getSetting(groupJid, 'warnPunishDuration', 300000);
      if (!mutedUsers.has(groupJid)) mutedUsers.set(groupJid, new Map());
      mutedUsers.get(groupJid).set(userJid, Date.now() + duration);
      saveMutes();
      warnings.get(groupJid)?.delete(userJid);
      saveWarnings();
      const durStr = formatDuration(duration);
      try {
        await sock.sendMessage(userJid, { text: t(lang, 'autoMuteDm')(groupName, count, limit, durStr) });
      } catch (_) {}
      await sock.sendMessage(groupJid, { text: t(lang, 'autoMuted')(userJid.split('@')[0], count, limit, durStr), mentions: [userJid] });
      return true;
    }

    const [result] = await sock.groupParticipantsUpdate(groupJid, [userJid], 'remove');
    if (result.status === '200') {
      warnings.get(groupJid)?.delete(userJid);
      saveWarnings();

      if (punish === 'ban') {
        if (!bannedUsers.has(groupJid)) bannedUsers.set(groupJid, new Set());
        bannedUsers.get(groupJid).add(userJid);
        saveBannedUsers();
        try { await sock.groupJoinApprovalMode(groupJid, 'on'); } catch (_) {}
        try {
          await sock.sendMessage(userJid, { text: t(lang, 'autoBanDm')(groupName, count, limit) });
        } catch (_) {}
        await sock.sendMessage(groupJid, { text: t(lang, 'autoBanned')(userJid.split('@')[0], count, limit), mentions: [userJid] });
      } else {
        try {
          await sock.sendMessage(userJid, { text: t(lang, 'autoKickDm')(groupName, count, limit) });
        } catch (_) {}
        await sock.sendMessage(groupJid, { text: t(lang, 'autoKicked')(userJid.split('@')[0], count, limit), mentions: [userJid] });
      }
      return true;
    }
  } catch (err) {
    logger.error({ err, userJid, group: groupJid }, 'Failed to auto-punish');
  }
  return false;
}

async function notifyNonAdminGroups(sock) {
  if (!sock.user?.id) return;
  try {
    const groups = await sock.groupFetchAllParticipating();
    STATUS.groupsCount = Object.keys(groups || {}).length;
    for (const [jid] of Object.entries(groups || {})) {
      const isAdmin = await isBotAdmin(sock, jid);
      if (isAdmin === null || isAdmin === true) continue;
      const now = Date.now();
      if (now - (nonAdminNotified.get(jid) || 0) < NON_ADMIN_INTERVAL) continue;
      nonAdminNotified.set(jid, now);
      await sock.sendMessage(jid, { text: t(getGroupLang(jid), 'adminRequest') });
    }
  } catch (err) {
    logger.error({ err }, 'Failed in notifyNonAdminGroups');
  }
}

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
    logger,
    browser: Browsers.macOS('Chrome'),
    markOnlineOnConnect: true,
  });

  let nonAdminTimer = null;

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) { qrcode.generate(qr, { small: true }); logger.info('Scan the QR code to pair'); }
    if (connection === 'open') {
      STATUS.connected = true;
      logger.info('Bot started successfully');
      adminCache.clear();
      nonAdminNotified.clear();
      if (nonAdminTimer) clearInterval(nonAdminTimer);
      nonAdminTimer = setInterval(() => { notifyNonAdminGroups(sock); checkExpiredMutes(sock); }, NON_ADMIN_INTERVAL);
      notifyNonAdminGroups(sock);
    }
    if (connection === 'close') {
      STATUS.connected = false;
      if (nonAdminTimer) { clearInterval(nonAdminTimer); nonAdminTimer = null; }
      const sc = (lastDisconnect?.error instanceof Boom) ? lastDisconnect.error.output.statusCode : undefined;
      if (sc !== DisconnectReason.loggedOut) setTimeout(() => connect(), 5000);
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      try { await handleMessage(sock, msg); }
      catch (err) { logger.error({ err, msgKey: msg.key }, 'Unhandled message error'); }
    }
  });

  sock.ev.on('group-participants.update', async ({ id, participants, action, author }) => {
    adminCache.delete(id);
    nonAdminNotified.delete(id);

    if (action === 'add') {
      for (const p of participants) {
        if (bannedUsers.get(id)?.has(p)) {
          try {
            await sock.groupParticipantsUpdate(id, [p], 'remove');
            logger.info({ group: id, participant: p }, 'Kicked banned user who was re-added');
          } catch (_) {}
        }
      }

      const welcome = getSetting(id, 'welcome', '');
      if (welcome) {
        for (const p of participants) {
          if (bannedUsers.get(id)?.has(p)) continue;
          try {
            await sock.sendMessage(id, { text: welcome.replace('{user}', `@${p.split('@')[0]}`), mentions: [p] });
          } catch (_) {}
        }
      }
    }

    if (action === 'remove') {
      const goodbye = getSetting(id, 'goodbye', '');
      if (goodbye) {
        for (const p of participants) {
          if (author && author === p) continue;
          try {
            await sock.sendMessage(id, { text: goodbye.replace('{user}', `@${p.split('@')[0]}`), mentions: [p] });
          } catch (_) {}
        }
      }
    }
  });

  sock.ev.on('group.join-request', async ({ id, participant }) => {
    if (bannedUsers.get(id)?.has(participant)) {
      try { await sock.groupRequestParticipantsUpdate(id, [participant], 'reject'); }
      catch (err) { logger.error({ err }, 'Failed to reject join request'); }
    }
  });

  return sock;
}

function formatUptime(ms) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${s % 60}s`);
  return parts.join(' ');
}

async function handleMessage(sock, msg) {
  if (!msg.key || msg.key.fromMe) return;
  const remoteJid = msg.key.remoteJid;
  const sender = msg.key.participant || remoteJid;
  const text = extractText(msg);
  if (!text) return;

  if (isGroup(remoteJid)) trackMsgKey(remoteJid, msg.key);

  if (isGroup(remoteJid) && isMuted(remoteJid, sender)) {
    await sock.sendMessage(remoteJid, { delete: msg.key });
    addWarning(remoteJid, sender, 'muted', 'bot');
    let groupName = 'Unknown Group';
    try { groupName = (await sock.groupMetadata(remoteJid)).subject || groupName; } catch (_) {}
    await autoPunish(sock, remoteJid, sender, groupName);
    return;
  }

  const cmd = text.trim();
  const replyJid = isGroup(remoteJid) ? remoteJid : sender;

  if (cmd === '!ping') { await sock.sendMessage(replyJid, { text: t(getGroupLang(remoteJid), 'pong') }); return; }
  if (cmd === '!credits') { await sock.sendMessage(replyJid, { text: t(getGroupLang(remoteJid), 'credits') }); return; }
  if (cmd === '!help') { await sock.sendMessage(replyJid, { text: t(getGroupLang(remoteJid), 'helpPublic') }); return; }
  if (cmd === '!status') {
    await sock.sendMessage(replyJid, { text: t(getGroupLang(remoteJid), 'status')(STATUS.connected, formatUptime(Date.now() - STATUS.startTime)) });
    return;
  }
  if (!isGroup(remoteJid)) return;

  if (checkSpam(remoteJid, sender)) {
    if (!isMuted(remoteJid, sender)) {
      if (!mutedUsers.has(remoteJid)) mutedUsers.set(remoteJid, new Map());
      mutedUsers.get(remoteJid).set(sender, Date.now() + SPAM_MUTE_DURATION);
      saveMutes();
      const lang = getGroupLang(remoteJid);
      try {
        let gname = 'Unknown Group';
        try { gname = (await sock.groupMetadata(remoteJid)).subject || gname; } catch (_) {}
        await sock.sendMessage(sender, { text: t(lang, 'spamMuteDm')(gname, formatDuration(SPAM_MUTE_DURATION)) });
      } catch (_) {}
      await sock.sendMessage(remoteJid, { text: t(lang, 'spamMuted')(sender.split('@')[0]), mentions: [sender] });
    }
    await sock.sendMessage(remoteJid, { delete: msg.key });
    return;
  }

  const admin = await isBotAdmin(sock, remoteJid);
  if (!admin) return;

  const commandMap = {
    '?set-lang': () => handleSetLang(sock, cmd, remoteJid),
    '?help': () => {
      const lang = getGroupLang(remoteJid);
      const codes = Object.keys(translations).map(c => c === lang ? `*${c}*` : c).join(', ');
      sock.sendMessage(remoteJid, { text: t(lang, 'helpAdmin') + '\n\n*Available languages:* ' + codes });
    },
    '?warnings': () => handleWarnings(sock, msg, cmd, remoteJid),
    '?warn': () => handleAdminCommand(sock, msg, cmd, remoteJid, sender),
    '?kick': () => handleAdminCommand(sock, msg, cmd, remoteJid, sender),
    '?ban': () => handleAdminCommand(sock, msg, cmd, remoteJid, sender),
    '?unban': () => handleUnban(sock, msg, cmd, remoteJid),
    '?unmute': () => handleMuteCommand(sock, msg, cmd, remoteJid, sender),
    '?mute': () => handleMuteCommand(sock, msg, cmd, remoteJid, sender),
    '?addword': () => handleAddWord(sock, cmd, remoteJid),
    '?removeword': () => handleRemoveWord(sock, cmd, remoteJid),
    '?settings': () => handleSettings(sock, remoteJid),
    '?set-warnlimit': () => handleSetWarnLimit(sock, cmd, remoteJid),
    '?set-warnpunish': () => handleSetWarnPunish(sock, cmd, remoteJid),
    '?set-antispam': () => handleSetAntiSpam(sock, cmd, remoteJid),
    '?set-welcome': () => handleSetWelcome(sock, cmd, remoteJid),
    '?set-goodbye': () => handleSetGoodbye(sock, cmd, remoteJid),
    '?purge': () => handlePurge(sock, cmd, remoteJid),
    '?ignore': () => handleIgnore(sock, msg, remoteJid),
    '?unignore': () => handleUnignore(sock, msg, remoteJid),
    '?stats': () => handleStats(sock, remoteJid),
    '?export': () => handleExport(sock, remoteJid),
    '?import': () => handleImport(sock, cmd, remoteJid),
  };

  const prefix = Object.keys(commandMap).find(k => cmd.startsWith(k));
  if (prefix) { await commandMap[prefix](); return; }

  if (isIgnored(remoteJid, sender)) return;

  let badResult = checkCustomWords(text, remoteJid);
  const isCustom = badResult.found;
  if (!badResult.found) badResult = checkText(text);
  if (!badResult.found) return;

  let groupName = 'Unknown Group';
  try { groupName = (await sock.groupMetadata(remoteJid)).subject || groupName; } catch (_) {}

  await sock.sendMessage(remoteJid, { delete: msg.key });
  bumpStat(remoteJid, 'deleted');

  const lang = getGroupLang(remoteJid);
  const warnMsg = t(lang, 'profanityWarn')(groupName);
  try { await sock.sendMessage(sender, { text: warnMsg }); } catch (_) {}

  addWarning(remoteJid, sender, badResult.word, 'bot');
  await autoPunish(sock, remoteJid, sender, groupName);
}

async function handleAdminCommand(sock, msg, cmd, groupJid, sender) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }

  const botId = getBotId(sock);
  let meta;
  try { meta = await sock.groupMetadata(groupJid); } catch (_) {}
  const ownerJid = meta?.owner;
  const groupName = meta?.subject || 'Unknown Group';

  for (const target of mentions) {
    if (target === botId || target === sock.user?.lid) { await sock.sendMessage(groupJid, { text: t(lang, 'cantSelf') }); continue; }
    if (target === ownerJid) { await sock.sendMessage(groupJid, { text: t(lang, 'cantOwner') }); continue; }

    if (cmd.startsWith('?warn')) {
      bumpStat(groupJid, 'warns');
      const reason = cmd.replace(/^\?warn\s*/, '').trim() || 'No reason provided';
      try { await sock.sendMessage(target, { text: t(lang, 'adminWarn')(groupName, reason) }); } catch (_) {}
      const count = addWarning(groupJid, target, reason, sender.split('@')[0]);
      const limit = getWarnLimit(groupJid);
      await sock.sendMessage(groupJid, { text: t(lang, 'warnCount')(target.split('@')[0], count, limit), mentions: [target] });
      await autoBanIfNeeded(sock, groupJid, target, groupName);
    }

    if (cmd.startsWith('?kick')) {
      bumpStat(groupJid, 'kicks');
      try {
        const [r] = await sock.groupParticipantsUpdate(groupJid, [target], 'remove');
        if (r.status === '200') {
          warnings.get(groupJid)?.delete(target);
          saveWarnings();
        } else { await sock.sendMessage(groupJid, { text: t(lang, 'kickFail')(target.split('@')[0], r.status), mentions: [target] }); }
      } catch (_) { await sock.sendMessage(groupJid, { text: t(lang, 'kickFailSimple')(target.split('@')[0]), mentions: [target] }); }
    }

    if (cmd.startsWith('?ban')) {
      bumpStat(groupJid, 'bans');
      try {
        const [r] = await sock.groupParticipantsUpdate(groupJid, [target], 'remove');
        if (r.status === '200') {
          if (!bannedUsers.has(groupJid)) bannedUsers.set(groupJid, new Set());
          bannedUsers.get(groupJid).add(target);
          saveBannedUsers();
          try { await sock.groupJoinApprovalMode(groupJid, 'on'); } catch (_) {}
          warnings.get(groupJid)?.delete(target);
          saveWarnings();
          await sock.sendMessage(groupJid, { text: t(lang, 'banned')(target.split('@')[0]), mentions: [target] });
        } else { await sock.sendMessage(groupJid, { text: t(lang, 'banFail')(target.split('@')[0], r.status), mentions: [target] }); }
      } catch (_) { await sock.sendMessage(groupJid, { text: t(lang, 'banFailSimple')(target.split('@')[0]), mentions: [target] }); }
    }
  }
}

async function handleMuteCommand(sock, msg, cmd, groupJid, sender) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }

  if (cmd.startsWith('?unmute')) {
    const group = mutedUsers.get(groupJid);
    for (const target of mentions) {
      if (group?.has(target)) { group.delete(target); if (group.size === 0) mutedUsers.delete(groupJid); }
    }
    saveMutes();
    await sock.sendMessage(groupJid, { text: t(lang, 'unmuted')(mentions.map(j => `@${j.split('@')[0]}`).join(', ')), mentions });
    return;
  }

  const rawDuration = cmd.replace(/^\?mute\s*/, '').replace(/@\d+\s*/g, '').trim();
  const ms = parseDuration(rawDuration);
  if (!ms) { await sock.sendMessage(groupJid, { text: t(lang, 'muteInvalid') }); return; }

  const botId = getBotId(sock);
  let meta;
  try { meta = await sock.groupMetadata(groupJid); } catch (_) {}
  const ownerJid = meta?.owner;
  const duration = formatDuration(ms);
  const groupName = meta?.subject || 'Unknown Group';

  for (const target of mentions) {
    if (target === botId || target === sock.user?.lid) { await sock.sendMessage(groupJid, { text: t(lang, 'cantSelf') }); continue; }
    if (target === ownerJid) { await sock.sendMessage(groupJid, { text: t(lang, 'cantOwner') }); continue; }
    if (!mutedUsers.has(groupJid)) mutedUsers.set(groupJid, new Map());
    mutedUsers.get(groupJid).set(target, Date.now() + ms);
    bumpStat(groupJid, 'mutes');
    try { await sock.sendMessage(target, { text: t(lang, 'muteDm')(groupName, duration) }); } catch (_) {}
  }
  saveMutes();
  await sock.sendMessage(groupJid, { text: t(lang, 'muted')(mentions.map(j => `@${j.split('@')[0]}`).join(', '), duration), mentions });
}

async function handleUnban(sock, msg, cmd, groupJid) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }
  const group = bannedUsers.get(groupJid);
  if (!group) return;
  for (const target of mentions) group.delete(target);
  if (group.size === 0) bannedUsers.delete(groupJid);
  saveBannedUsers();
  await sock.sendMessage(groupJid, { text: t(lang, 'unbanned')(mentions.map(j => `@${j.split('@')[0]}`).join(', ')), mentions });
}

async function handleWarnings(sock, msg, cmd, groupJid) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }
  for (const target of mentions) {
    const w = warnings.get(groupJid)?.get(target) || [];
    if (w.length === 0) {
      await sock.sendMessage(groupJid, { text: t(lang, 'warningsNone')(target.split('@')[0]), mentions: [target] });
    } else {
      const entries = w.map((e, i) => `${i + 1}. ${e.reason} (${e.by})`).join('\n');
      await sock.sendMessage(groupJid, { text: t(lang, 'warningsList')(target.split('@')[0], w.length, getWarnLimit(groupJid), entries), mentions: [target] });
    }
  }
}

async function handleAddWord(sock, cmd, groupJid) {
  const word = cmd.replace(/^\?addword\s*/, '').trim().toLowerCase();
  if (!word) return;
  if (!customBadwords.has(groupJid)) customBadwords.set(groupJid, new Set());
  customBadwords.get(groupJid).add(word);
  saveCustomBadwords();
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'wordAdded')(word) });
}

async function handleRemoveWord(sock, cmd, groupJid) {
  const word = cmd.replace(/^\?removeword\s*/, '').trim().toLowerCase();
  if (!word) return;
  const set = customBadwords.get(groupJid);
  const existed = set?.delete(word);
  if (existed) { saveCustomBadwords(); if (set.size === 0) customBadwords.delete(groupJid); }
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), existed ? 'wordRemoved' : 'wordNotFound')(word) });
}

async function handleSettings(sock, groupJid) {
  const lang = getGroupLang(groupJid);
  const s = groupSettings.get(groupJid) || {};
  const banCount = bannedUsers.get(groupJid)?.size || 0;
  const muteCount = mutedUsers.get(groupJid)?.size || 0;
  const customCount = customBadwords.get(groupJid)?.size || 0;
  const warnLimit = s.warnLimit ?? DEFAULT_WARN_LIMIT;
  const antiSpam = s.antiSpam !== false;
  const welcome = s.welcome || '-';
  const punish = s.warnPunish || 'ban';
  const punishDur = s.warnPunishDuration ? formatDuration(s.warnPunishDuration) : '';
  const langName = translations[lang]?.name || lang;
  const ignoredCount = ignoredUsers.get(groupJid)?.size || 0;
  const msg = t(lang, 'settingsDisplay')(langName, lang, warnLimit, punish, punishDur, antiSpam ? 'ON' : 'OFF', banCount, muteCount, customCount, ignoredCount, welcome, s.goodbye || '-');
  await sock.sendMessage(groupJid, { text: msg });
}

async function handleSetWarnLimit(sock, cmd, groupJid) {
  const n = parseInt(cmd.replace(/^\?set-warnlimit\s*/, '').trim(), 10);
  if (!n || n < 1) return;
  setSetting(groupJid, 'warnLimit', n);
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'warnLimitSet')(n) });
}

async function handleSetWarnPunish(sock, cmd, groupJid) {
  const args = cmd.replace(/^\?set-warnpunish\s*/, '').trim().toLowerCase().split(/\s+/);
  const type = args[0];
  if (!['ban', 'kick', 'mute'].includes(type)) {
    await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'warnPunishInvalid') });
    return;
  }
  setSetting(groupJid, 'warnPunish', type);
  if (type === 'mute') {
    const ms = parseDuration(args[1] || '5m');
    setSetting(groupJid, 'warnPunishDuration', ms);
    await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'warnPunishSet')(type, formatDuration(ms)) });
  } else {
    await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'warnPunishSet')(type, '') });
  }
}

async function handleSetAntiSpam(sock, cmd, groupJid) {
  const val = cmd.replace(/^\?set-antispam\s*/, '').trim().toLowerCase();
  const on = val === 'on' || val === 'true' || val === '1';
  const off = val === 'off' || val === 'false' || val === '0';
  if (!on && !off) return;
  setSetting(groupJid, 'antiSpam', on);
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'antiSpamSet')(on ? 'ON' : 'OFF') });
}

async function handleSetWelcome(sock, cmd, groupJid) {
  const msg = cmd.replace(/^\?set-welcome\s*/, '').trim();
  if (!msg) { setSetting(groupJid, 'welcome', ''); }
  else { setSetting(groupJid, 'welcome', msg); }
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'welcomeSet')(msg || '(cleared)') });
}

async function handleSetGoodbye(sock, cmd, groupJid) {
  const msg = cmd.replace(/^\?set-goodbye\s*/, '').trim();
  if (!msg) { setSetting(groupJid, 'goodbye', ''); }
  else { setSetting(groupJid, 'goodbye', msg); }
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'goodbyeSet')(msg || '(cleared)') });
}

async function handlePurge(sock, cmd, groupJid) {
  const n = parseInt(cmd.replace(/^\?purge\s*/, '').trim(), 10);
  if (!n || n < 1 || n > PURGE_BUFFER) return;
  const buf = msgKeyBuffer.get(groupJid);
  if (!buf || buf.length === 0) return;
  const keys = buf.splice(-Math.min(n, buf.length));
  try {
    for (const key of keys) await sock.sendMessage(groupJid, { delete: key });
  } catch (_) {}
}

async function handleIgnore(sock, msg, groupJid) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }
  for (const target of mentions) {
    if (!ignoredUsers.has(groupJid)) ignoredUsers.set(groupJid, new Set());
    ignoredUsers.get(groupJid).add(target);
  }
  saveIgnored();
  const nameList = mentions.map(j => `@${j.split('@')[0]}`).join(', ');
  await sock.sendMessage(groupJid, { text: t(lang, 'ignored')(nameList), mentions });
}

async function handleUnignore(sock, msg, groupJid) {
  const mentions = getMentionedJids(msg);
  const lang = getGroupLang(groupJid);
  if (mentions.length === 0) { await sock.sendMessage(groupJid, { text: t(lang, 'noMention') }); return; }
  for (const target of mentions) {
    ignoredUsers.get(groupJid)?.delete(target);
  }
  saveIgnored();
  const nameList = mentions.map(j => `@${j.split('@')[0]}`).join(', ');
  await sock.sendMessage(groupJid, { text: t(lang, 'unignored')(nameList), mentions });
}

async function handleStats(sock, groupJid) {
  const lang = getGroupLang(groupJid);
  const s = groupStats.get(groupJid) || { warns: 0, bans: 0, kicks: 0, mutes: 0, deleted: 0, today: 0 };
  const msg = t(lang, 'statsDisplay')(s.warns || 0, s.bans || 0, s.kicks || 0, s.mutes || 0, s.deleted || 0, s.today || 0);
  await sock.sendMessage(groupJid, { text: msg });
}

async function handleExport(sock, groupJid) {
  const data = {
    lang: groupLangs.get(groupJid) || DEFAULT_LANG,
    settings: groupSettings.get(groupJid) || {},
    banned: [...(bannedUsers.get(groupJid) || [])],
    ignored: [...(ignoredUsers.get(groupJid) || [])],
    customWords: [...(customBadwords.get(groupJid) || [])],
  };
  const code = Buffer.from(JSON.stringify(data)).toString('base64');
  await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'exported')(code) });
}

async function handleImport(sock, cmd, groupJid) {
  const code = cmd.replace(/^\?import\s*/, '').trim();
  try {
    const data = JSON.parse(Buffer.from(code, 'base64').toString('utf8'));
    if (data.settings) groupSettings.set(groupJid, data.settings);
    if (data.lang) { groupLangs.set(groupJid, data.lang); saveGroupLangs(); }
    if (data.banned) { bannedUsers.set(groupJid, new Set(data.banned)); saveBannedUsers(); }
    if (data.ignored) { ignoredUsers.set(groupJid, new Set(data.ignored)); saveIgnored(); }
    if (data.customWords) { customBadwords.set(groupJid, new Set(data.customWords)); saveCustomBadwords(); }
    saveSettings();
    await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'imported') });
  } catch (_) {
    await sock.sendMessage(groupJid, { text: t(getGroupLang(groupJid), 'importInvalid') });
  }
}

async function handleSetLang(sock, cmd, groupJid) {
  const code = cmd.replace(/^\?set-lang\s*/, '').trim().toLowerCase();
  if (!translations[code]) { await sock.sendMessage(groupJid, { text: t(DEFAULT_LANG, 'langUnknown')(code) }); return; }
  groupLangs.set(groupJid, code);
  saveGroupLangs();
  await sock.sendMessage(groupJid, { text: t(code, 'langSet')(code, translations[code].name) });
}

loadIgnored();
loadBannedUsers();
loadGroupLangs();
loadMutes();
loadWarnings();
loadCustomBadwords();
loadSettings();
connect().catch((err) => { logger.error(err, 'Fatal startup error'); process.exit(1); });
