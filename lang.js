const translations = {
  en: {
    name: 'English',
    coinflip: (result) => `🪙 *Coin flip:* ${result}!`,
    heads: 'Heads',
    tails: 'Tails',
    profanityWarn: (groupName) =>
      '⚠️ *Warning: Profanity Detected*\n\n' +
      `You sent a message in the group *${groupName}* that contained inappropriate language. ` +
      'Your message has been deleted.\n\n' +
      'Please keep the conversation respectful. Repeated violations may result in further action.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Warning from Group Admin*\n\n' +
      `You have been warned by an admin in the group *${groupName}*.\n` +
      `*Reason:* ${reason}\n\n` +
      'Please follow the group rules. Further violations may result in removal.',
    adminRequest: 'Please make me an admin to enable automatic profanity filtering in this group.',
    langSet: (code, name) => `Language set to *${name}* (${code}) for this group.`,
    langUnknown: (code) => `Unknown language code "${code}". Use one of: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Please mention at least one user.',
    cantSelf: 'I cannot perform this action on myself.',
    cantOwner: 'Cannot perform this action on the group owner.',
    cantDm: (user) => `Could not DM @${user}. They may have DMs disabled.`,
    kickFail: (user, status) => `Failed to kick @${user}. Status: ${status}`,
    kickFailSimple: (user) => `Failed to kick @${user}.`,
    banFail: (user, status) => `Failed to ban @${user}. Status: ${status}`,
    banFailSimple: (user) => `Failed to ban @${user}.`,
    banned: (user) => `Banned @${user}. They cannot rejoin the group.`,
    muted: (nameList, duration) => `Muted ${nameList} for *${duration}*.\nAll their messages will be auto-deleted during this period.`,
    muteDm: (groupName, duration) => `You have been muted in *${groupName}* for *${duration}*.\nAll your messages will be auto-deleted during this time.`,
    unmuted: (nameList) => `Unmuted ${nameList}.`,
    unmuteDm: (groupName) => `Your mute in *${groupName}* has expired. You can send messages again.`,
    unmuteGc: (user) => `Mute expired for @${user}.`,
    muteInvalid: 'Invalid mute format. Use: ?mute @user <number> [s|m|d]\nExample: ?mute @user 10 m',
    pong: 'Pong!',
    credits: 'WhatsApp Mod bot\n\nMade by: Martin (github.com/martinsuii)\n\nBased on: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Bot Status*\n\n' +
      `*Connection:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Uptime:* ${uptime}`,
    helpPublic:
      '📋 *Commands*\n\n' +
      '!ping - Test if the bot is alive\n' +
      '!status - Show bot status\n' +
      '!credits - Show bot credits\n' +
      '!coinflip - Flip a coin\n' +
      '!help  - Show this help\n\n' +
      'The bot automatically deletes profanity in groups where it is admin.',
    helpAdmin:
      '🛡️ *Admin Commands*\n' +
      '(requires bot to be admin)\n\n' +
      '?warn @user [reason] - Warn a user via DM\n' +
      '?warnings @user - Show user warnings\n' +
      '?kick @user - Remove a user from the group\n' +
      '?ban @user - Ban a user (auto-reject rejoin)\n' +
      '?unban @user - Remove ban from a user\n' +
      '?mute @user <time> [s|m|d] - Auto-delete user messages\n' +
      '?unmute @user - Remove mute from user\n' +
      '?ignore @user - Exempt user from profanity checks\n' +
      '?unignore @user - Remove exemption\n' +
      '?addword <word> - Add group-specific badword\n' +
      '?removeword <word> - Remove group-specific badword\n' +
      '?purge <n> - Delete last N messages\n' +
      '?stats - Show group moderation stats\n' +
      '?settings - Show group settings\n' +
      '?export - Export group config as code\n' +
      '?import <code> - Import group config from code\n' +
      '?set-lang <code> - Set bot language for this group\n' +
      '?set-warnlimit <n> - Set warn limit for auto-ban\n' +
      '?set-warnpunish [ban|kick|mute] - Set warn punishment\n' +
      '?set-antispam on/off - Toggle anti-spam\n' +
      '?set-welcome <msg> - Set welcome message\n' +
      '?set-goodbye <msg> - Set goodbye message\n' +
      '?help - Show this help',
    warnCount: (user, count, limit) => `Warned ${user}. They now have *${count}/${limit}* warnings.`,
    autoBanDm: (groupName, count, limit) => `You have been auto-banned from *${groupName}* for reaching *${count}/${limit}* warnings.`,
    autoBanned: (user, count, limit) => `Auto-banned @${user} for reaching *${count}/${limit}* warnings.`,
    spamMuteDm: (groupName, duration) => `You have been auto-muted in *${groupName}* for *${duration}* due to spam. All your messages will be deleted.`,
    spamMuted: (user) => `Anti-spam: muted @${user} for 5 minutes.`,
    unbanned: (nameList) => `Unbanned ${nameList}.`,
    warningsNone: (user) => `@${user} has no warnings.`,
    warningsList: (user, count, limit, entries) => `Warnings for @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Added "${word}" to the group badword list.`,
    wordRemoved: (word) => `Removed "${word}" from the group badword list.`,
    wordNotFound: (word) => `"${word}" is not in the group badword list.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Group Settings*\n\n' +
      `*Language:* ${langName} (${langCode})\n` +
      `*Warn limit:* ${warnLimit}\n` +
      `*Warn punish:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Banned users:* ${banCount}\n` +
      `*Muted users:* ${muteCount}\n` +
      `*Ignored users:* ${ignoredCount}\n` +
      `*Custom words:* ${customCount}\n` +
      `*Welcome:* ${welcome}\n` +
      `*Goodbye:* ${goodbye}`,
    warnLimitSet: (n) => `Warn limit set to *${n}*.`,
    warnPunishSet: (type, dur) => `Warn punishment set to *${type}*${dur ? ' for ' + dur : ''}.`,
    warnPunishInvalid: 'Invalid punish type. Use: ?set-warnpunish [ban|kick|mute] [time if mute]\nExample: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `You have been auto-kicked from *${groupName}* for reaching *${count}/${limit}* warnings.`,
    autoKicked: (user, count, limit) => `Auto-kicked @${user} for reaching *${count}/${limit}* warnings.`,
    autoMuteDm: (groupName, count, limit, duration) => `You have been auto-muted in *${groupName}* for *${duration}* after reaching *${count}/${limit}* warnings.`,
    autoMuted: (user, count, limit, duration) => `Auto-muted @${user} for *${duration}* after reaching *${count}/${limit}* warnings.`,
    antiSpamSet: (val) => `Anti-spam set to *${val}*.`,
    welcomeSet: (msg) => `Welcome message set to: "${msg}"\nUse {user} as placeholder for the new member.`,
    goodbyeSet: (msg) => `Goodbye message set to: "${msg}"\nUse {user} as placeholder. Only shown when users leave voluntarily.`,
    ignored: (nameList) => `Now ignoring ${nameList}. Their messages won't be checked for profanity.`,
    unignored: (nameList) => `No longer ignoring ${nameList}.`,
    exported: (code) => `*Export code:*\n\`\`\`\n${code}\n\`\`\`\nImport with: ?import <code>`,
    imported: 'Settings imported successfully.',
    importInvalid: 'Invalid import code.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Group Stats*\n\n' +
      `*Warnings:* ${warns}\n` +
      `*Bans:* ${bans}\n` +
      `*Kicks:* ${kicks}\n` +
      `*Mutes:* ${mutes}\n` +
      `*Messages deleted:* ${deleted}\n` +
      `*Actions today:* ${today}`,
  },

  cs: {
    name: 'Čeština',
    coinflip: (result) => `🪙 *Hod mincí:* ${result}!`,
    heads: 'Panna',
    tails: 'Orel',
    profanityWarn: (groupName) =>
      '⚠️ *Varování: Detekovány vulgarity*\n\n' +
      `Ve skupině *${groupName}* jste poslali zprávu obsahující nevhodný jazyk. ` +
      'Vaše zpráva byla smazána.\n\n' +
      'Udržujte prosím konverzaci slušnou. Opakované porušení může vést k dalším opatřením.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Varování od admina skupiny*\n\n' +
      `Byli jste varováni adminem ve skupině *${groupName}*.\n` +
      `*Důvod:* ${reason}\n\n` +
      'Dodržujte prosím pravidla skupiny. Další porušení mohou vést k vyloučení.',
    adminRequest: 'Udělejte mi prosím admina, abych mohl automaticky filtrovat vulgarity v této skupině.',
    langSet: (code, name) => `Jazyk nastaven na *${name}* (${code}) pro tuto skupinu.`,
    langUnknown: (code) => `Neznámý kód jazyka "${code}". Použijte: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Prosím označte alespoň jednoho uživatele.',
    cantSelf: 'Tuto akci na sobě nemohu provést.',
    cantOwner: 'Tuto akci nelze provést na majiteli skupiny.',
    cantDm: (user) => `Nemohu poslat DM @${user}. Může mít vypnuté zprávy.`,
    kickFail: (user, status) => `Nepodařilo se vyhodit @${user}. Stav: ${status}`,
    kickFailSimple: (user) => `Nepodařilo se vyhodit @${user}.`,
    banFail: (user, status) => `Nepodařilo se zabanovat @${user}. Stav: ${status}`,
    banFailSimple: (user) => `Nepodařilo se zabanovat @${user}.`,
    banned: (user) => `Zabanován @${user}. Nemůže se znovu připojit do skupiny.`,
    muted: (nameList, duration) => `Umlčen ${nameList} na *${duration}*.\nVšechny jejich zprávy budou během této doby automaticky mazány.`,
    muteDm: (groupName, duration) => `Byli jste umlčeni ve skupině *${groupName}* na *${duration}*.\nVšechny vaše zprávy budou během této doby automaticky mazány.`,
    unmuted: (nameList) => `Odmlčen ${nameList}.`,
    unmuteDm: (groupName) => `Vaše umlčení ve skupině *${groupName}* vypršelo. Můžete znovu posílat zprávy.`,
    unmuteGc: (user) => `Umlčení vypršelo pro @${user}.`,
    muteInvalid: 'Neplatný formát. Použijte: ?mute @user <číslo> [s|m|d]\nPříklad: ?mute @user 10 m',
    pong: 'Pong!',
    credits: 'WhatsApp Mod bot\n\nVytvořil: Martin (github.com/martinsuii)\n\nZaloženo na: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Stav Bota*\n\n' +
      `*Připojení:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Běží:* ${uptime}`,
    helpPublic:
      '📋 *Příkazy*\n\n' +
      '!ping - Otestovat zda bot běží\n' +
      '!status - Zobrazit stav bota\n' +
      '!credits - Zobrazit kredity bota\n' +
      '!coinflip - Hodit si mincí\n' +
      '!help  - Zobrazit tuto nápovědu\n\n' +
      'Bot automaticky maže vulgarity ve skupinách, kde je admin.',
    helpAdmin:
      '🛡️ *Admin Příkazy*\n' +
      '(vyžaduje admin práva bota)\n\n' +
      '?warn @user [důvod] - Varovat uživatele přes DM\n' +
      '?warnings @user - Zobrazit varování uživatele\n' +
      '?kick @user - Odebrat uživatele ze skupiny\n' +
      '?ban @user - Zabanovat uživatele (auto-odmítnutí)\n' +
      '?unban @user - Zrušit ban uživatele\n' +
      '?mute @user <čas> [s|m|d] - Automatické mazání zpráv\n' +
      '?unmute @user - Zrušit umlčení\n' +
      '?ignore @user - Vyjmout uživatele z kontroly\n' +
      '?unignore @user - Zrušit vyjmutí\n' +
      '?addword <slovo> - Přidat zakázané slovo skupiny\n' +
      '?removeword <slovo> - Odebrat zakázané slovo skupiny\n' +
      '?purge <n> - Smazat posledních N zpráv\n' +
      '?stats - Zobrazit statistiky moderace\n' +
      '?settings - Zobrazit nastavení skupiny\n' +
      '?export - Exportovat nastavení jako kód\n' +
      '?import <kód> - Importovat nastavení z kódu\n' +
      '?set-lang <kód> - Nastavit jazyk bota pro tuto skupinu\n' +
      '?set-warnlimit <n> - Nastavit limit varování\n' +
      '?set-warnpunish [ban|kick|mute] - Nastavit trest\n' +
      '?set-antispam on/off - Zapnout/vypnout anti-spam\n' +
      '?set-welcome <zpráva> - Nastavit uvítací zprávu\n' +
      '?set-goodbye <zpráva> - Nastavit zprávu na rozloučenou\n' +
      '?help - Zobrazit tuto nápovědu',
    warnCount: (user, count, limit) => `Varován ${user}. Nyní má *${count}/${limit}* varování.`,
    autoBanDm: (groupName, count, limit) => `Byli jste automaticky zabanováni ze skupiny *${groupName}* za dosažení *${count}/${limit}* varování.`,
    autoBanned: (user, count, limit) => `Auto-zabanován @${user} za dosažení *${count}/${limit}* varování.`,
    spamMuteDm: (groupName, duration) => `Byli jste automaticky umlčeni ve skupině *${groupName}* na *${duration}* kvůli spamu. Všechny vaše zprávy budou mazány.`,
    spamMuted: (user) => `Anti-spam: umlčen @${user} na 5 minut.`,
    unbanned: (nameList) => `Odbanován ${nameList}.`,
    warningsNone: (user) => `@${user} nemá žádná varování.`,
    warningsList: (user, count, limit, entries) => `Varování pro @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Přidáno "${word}" do seznamu zakázaných slov skupiny.`,
    wordRemoved: (word) => `Odebráno "${word}" ze seznamu zakázaných slov skupiny.`,
    wordNotFound: (word) => `"${word}" není v seznamu zakázaných slov skupiny.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Nastavení Skupiny*\n\n' +
      `*Jazyk:* ${langName} (${langCode})\n` +
      `*Limit varování:* ${warnLimit}\n` +
      `*Trest:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Zabanovaných:* ${banCount}\n` +
      `*Umlčených:* ${muteCount}\n` +
      `*Ignorovaných:* ${ignoredCount}\n` +
      `*Vlastních slov:* ${customCount}\n` +
      `*Uvítání:* ${welcome}\n` +
      `*Rozloučení:* ${goodbye}`,
    warnLimitSet: (n) => `Limit varování nastaven na *${n}*.`,
    warnPunishSet: (type, dur) => `Trest za varování nastaven na *${type}*${dur ? ' na ' + dur : ''}.`,
    warnPunishInvalid: 'Neplatný typ trestu. Použijte: ?set-warnpunish [ban|kick|mute] [čas pokud mute]\nPříklad: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Byli jste automaticky vyhozeni ze skupiny *${groupName}* za dosažení *${count}/${limit}* varování.`,
    autoKicked: (user, count, limit) => `Auto-vyhozen @${user} za dosažení *${count}/${limit}* varování.`,
    autoMuteDm: (groupName, count, limit, duration) => `Byli jste automaticky umlčeni ve skupině *${groupName}* na *${duration}* po dosažení *${count}/${limit}* varování.`,
    autoMuted: (user, count, limit, duration) => `Auto-umlčen @${user} na *${duration}* po dosažení *${count}/${limit}* varování.`,
    antiSpamSet: (val) => `Anti-spam nastaven na *${val}*.`,
    welcomeSet: (msg) => `Uvítací zpráva nastavena na: "${msg}"\nPoužijte {user} jako zástupný symbol pro nového člena.`,
    goodbyeSet: (msg) => `Zpráva na rozloučenou nastavena: "${msg}"\nPoužijte {user} jako zástupný symbol. Zobrazí se jen když uživatel odejde sám.`,
    ignored: (nameList) => `Ignoruji ${nameList}. Jejich zprávy nebudou kontrolovány na vulgarity.`,
    unignored: (nameList) => `Již neignoruji ${nameList}.`,
    exported: (code) => `*Export kód:*\n\`\`\`\n${code}\n\`\`\`\nImportujte pomocí: ?import <kód>`,
    imported: 'Nastavení úspěšně importováno.',
    importInvalid: 'Neplatný import kód.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Statistiky Skupiny*\n\n' +
      `*Varování:* ${warns}\n` +
      `*Bany:* ${bans}\n` +
      `*Vyhození:* ${kicks}\n` +
      `*Umlčení:* ${mutes}\n` +
      `*Smazaných zpráv:* ${deleted}\n` +
      `*Akce dnes:* ${today}`,
  },

  es: {
    name: 'Español',
    coinflip: (result) => `🪙 *Lanzamiento de moneda:* ¡${result}!`,
    heads: 'Cara',
    tails: 'Cruz',
    profanityWarn: (groupName) =>
      '⚠️ *Advertencia: Lenguaje Inapropiado*\n\n' +
      `Enviaste un mensaje en el grupo *${groupName}* con lenguaje inapropiado. ` +
      'Tu mensaje ha sido eliminado.\n\n' +
      'Mantén la conversación respetuosa. Violaciones repetidas pueden resultar en más acciones.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Advertencia del Administrador*\n\n' +
      `Un administrador te ha advertido en el grupo *${groupName}*.\n` +
      `*Razón:* ${reason}\n\n` +
      'Sigue las reglas del grupo. Más violaciones pueden resultar en expulsión.',
    adminRequest: 'Por favor hazme administrador para habilitar el filtro automático de profanidad en este grupo.',
    langSet: (code, name) => `Idioma cambiado a *${name}* (${code}) para este grupo.`,
    langUnknown: (code) => `Código de idioma "${code}" desconocido. Usa: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Por favor menciona al menos un usuario.',
    cantSelf: 'No puedo hacer esto conmigo mismo.',
    cantOwner: 'No se puede hacer esto con el dueño del grupo.',
    cantDm: (user) => `No pude enviar MD a @${user}. Puede tener los MD desactivados.`,
    kickFail: (user, status) => `No se pudo expulsar a @${user}. Estado: ${status}`,
    kickFailSimple: (user) => `No se pudo expulsar a @${user}.`,
    banFail: (user, status) => `No se pudo banear a @${user}. Estado: ${status}`,
    banFailSimple: (user) => `No se pudo banear a @${user}.`,
    banned: (user) => `Baneado @${user}. No puede volver a unirse al grupo.`,
    muted: (nameList, duration) => `Silenciado ${nameList} por *${duration}*.\nTodos sus mensajes serán eliminados automáticamente durante este período.`,
    muteDm: (groupName, duration) => `Has sido silenciado en *${groupName}* por *${duration}*.\nTodos tus mensajes serán eliminados automáticamente durante este tiempo.`,
    unmuted: (nameList) => `Desilenciado ${nameList}.`,
    unmuteDm: (groupName) => `Tu silencio en *${groupName}* ha expirado. Puedes enviar mensajes de nuevo.`,
    unmuteGc: (user) => `Silencio expirado para @${user}.`,
    muteInvalid: 'Formato inválido. Usa: ?mute @user <número> [s|m|d]\nEjemplo: ?mute @user 10 m',
    pong: '¡Pong!',
    credits: 'WhatsApp Mod bot\n\nCreado por: Martin (github.com/martinsuii)\n\nBasado en: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Estado del Bot*\n\n' +
      `*Conexión:* ${connected ? '🟢 Conectado' : '🔴 Desconectado'}\n` +
      `*Tiempo activo:* ${uptime}`,
    helpPublic:
      '📋 *Comandos*\n\n' +
      '!ping - Probar si el bot está vivo\n' +
      '!status - Mostrar estado del bot\n' +
      '!credits - Mostrar créditos del bot\n' +
      '!coinflip - Lanzar una moneda\n' +
      '!help  - Mostrar esta ayuda\n\n' +
      'El bot elimina automáticamente groserías en grupos donde es admin.',
    helpAdmin:
      '🛡️ *Comandos de Admin*\n' +
      '(requiere que el bot sea admin)\n\n' +
      '?warn @user [razón] - Advertir a un usuario por DM\n' +
      '?warnings @user - Mostrar avisos del usuario\n' +
      '?kick @user - Expulsar a un usuario del grupo\n' +
      '?ban @user - Banear a un usuario (rechazo automático)\n' +
      '?unban @user - Quitar ban a un usuario\n' +
      '?mute @user <tiempo> [s|m|d] - Auto-eliminar mensajes\n' +
      '?unmute @user - Quitar silencio\n' +
      '?ignore @user - Eximir usuario de control\n' +
      '?unignore @user - Quitar exención\n' +
      '?addword <palabra> - Añadir palabra prohibida del grupo\n' +
      '?removeword <palabra> - Quitar palabra prohibida del grupo\n' +
      '?purge <n> - Borrar últimos N mensajes\n' +
      '?stats - Mostrar estadísticas\n' +
      '?settings - Mostrar configuración del grupo\n' +
      '?export - Exportar configuración como código\n' +
      '?import <código> - Importar configuración desde código\n' +
      '?set-lang <código> - Cambiar idioma del bot para este grupo\n' +
      '?set-warnlimit <n> - Establecer límite de avisos\n' +
      '?set-warnpunish [ban|kick|mute] - Establecer castigo\n' +
      '?set-antispam on/off - Activar/desactivar anti-spam\n' +
      '?set-welcome <msg> - Establecer mensaje de bienvenida\n' +
      '?set-goodbye <msg> - Establecer mensaje de despedida\n' +
      '?help - Mostrar esta ayuda',
    warnCount: (user, count, limit) => `Advertido ${user}. Ahora tiene *${count}/${limit}* avisos.`,
    autoBanDm: (groupName, count, limit) => `Has sido automáticamente baneado de *${groupName}* por alcanzar *${count}/${limit}* avisos.`,
    autoBanned: (user, count, limit) => `Auto-baneado @${user} por alcanzar *${count}/${limit}* avisos.`,
    spamMuteDm: (groupName, duration) => `Has sido automáticamente silenciado en *${groupName}* por *${duration}* debido a spam. Todos tus mensajes serán eliminados.`,
    spamMuted: (user) => `Anti-spam: silenciado @${user} por 5 minutos.`,
    unbanned: (nameList) => `Desbaneado ${nameList}.`,
    warningsNone: (user) => `@${user} no tiene avisos.`,
    warningsList: (user, count, limit, entries) => `Avisos de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Añadido "${word}" a la lista de palabras prohibidas del grupo.`,
    wordRemoved: (word) => `Eliminado "${word}" de la lista de palabras prohibidas del grupo.`,
    wordNotFound: (word) => `"${word}" no está en la lista de palabras prohibidas del grupo.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Configuración del Grupo*\n\n' +
      `*Idioma:* ${langName} (${langCode})\n` +
      `*Límite de avisos:* ${warnLimit}\n` +
      `*Castigo:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Baneados:* ${banCount}\n` +
      `*Silenciados:* ${muteCount}\n` +
      `*Ignorados:* ${ignoredCount}\n` +
      `*Palabras personalizadas:* ${customCount}\n` +
      `*Bienvenida:* ${welcome}\n` +
      `*Despedida:* ${goodbye}`,
    warnLimitSet: (n) => `Límite de avisos establecido en *${n}*.`,
    warnPunishSet: (type, dur) => `Castigo por avisos establecido en *${type}*${dur ? ' por ' + dur : ''}.`,
    warnPunishInvalid: 'Tipo de castigo inválido. Usa: ?set-warnpunish [ban|kick|mute] [tiempo si mute]\nEjemplo: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Has sido automáticamente expulsado de *${groupName}* por alcanzar *${count}/${limit}* avisos.`,
    autoKicked: (user, count, limit) => `Auto-expulsado @${user} por alcanzar *${count}/${limit}* avisos.`,
    autoMuteDm: (groupName, count, limit, duration) => `Has sido automáticamente silenciado en *${groupName}* por *${duration}* tras alcanzar *${count}/${limit}* avisos.`,
    autoMuted: (user, count, limit, duration) => `Auto-silenciado @${user} por *${duration}* tras alcanzar *${count}/${limit}* avisos.`,
    antiSpamSet: (val) => `Anti-spam establecido en *${val}*.`,
    welcomeSet: (msg) => `Mensaje de bienvenida establecido: "${msg}"\nUsa {user} como marcador para el nuevo miembro.`,
    goodbyeSet: (msg) => `Mensaje de despedida establecido: "${msg}"\nUsa {user} como marcador. Solo se muestra cuando los usuarios se van voluntariamente.`,
    ignored: (nameList) => `Ahora ignorando a ${nameList}. Sus mensajes no serán revisados por groserías.`,
    unignored: (nameList) => `Ya no se ignora a ${nameList}.`,
    exported: (code) => `*Código de exportación:*\n\`\`\`\n${code}\n\`\`\`\nImportar con: ?import <código>`,
    imported: 'Configuración importada exitosamente.',
    importInvalid: 'Código de importación inválido.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Estadísticas del Grupo*\n\n' +
      `*Avisos:* ${warns}\n` +
      `*Baneos:* ${bans}\n` +
      `*Expulsiones:* ${kicks}\n` +
      `*Silencios:* ${mutes}\n` +
      `*Mensajes eliminados:* ${deleted}\n` +
      `*Acciones hoy:* ${today}`,
  },

  de: {
    name: 'Deutsch',
    coinflip: (result) => `🪙 *Münzwurf:* ${result}!`,
    heads: 'Kopf',
    tails: 'Zahl',
    profanityWarn: (groupName) =>
      '⚠️ *Warnung: Unangemessene Sprache*\n\n' +
      `Du hast in der Gruppe *${groupName}* eine Nachricht mit unangemessener Sprache gesendet. ` +
      'Deine Nachricht wurde gelöscht.\n\n' +
      'Bitte halte die Konversation respektvoll. Wiederholte Verstöße können zu weiteren Maßnahmen führen.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Warnung vom Gruppen-Admin*\n\n' +
      `Du wurdest von einem Admin in der Gruppe *${groupName}* verwarnt.\n` +
      `*Grund:* ${reason}\n\n` +
      'Bitte befolge die Gruppenregeln. Weitere Verstöße können zum Ausschluss führen.',
    adminRequest: 'Bitte mach mich zum Admin, um die automatische Profanitätsfilterung in dieser Gruppe zu aktivieren.',
    langSet: (code, name) => `Sprache auf *${name}* (${code}) für diese Gruppe gesetzt.`,
    langUnknown: (code) => `Unbekannter Sprachcode "${code}". Verwende: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Bitte erwähne mindestens einen Benutzer.',
    cantSelf: 'Ich kann diese Aktion nicht auf mich selbst anwenden.',
    cantOwner: 'Diese Aktion kann nicht auf den Gruppenbesitzer angewendet werden.',
    cantDm: (user) => `Konnte @${user} keine DM senden. Möglicherweise sind DMs deaktiviert.`,
    kickFail: (user, status) => `Konnte @${user} nicht entfernen. Status: ${status}`,
    kickFailSimple: (user) => `Konnte @${user} nicht entfernen.`,
    banFail: (user, status) => `Konnte @${user} nicht bannen. Status: ${status}`,
    banFailSimple: (user) => `Konnte @${user} nicht bannen.`,
    banned: (user) => `Gebannt: @${user}. Kann der Gruppe nicht erneut beitreten.`,
    muted: (nameList, duration) => `Stummgeschaltet: ${nameList} für *${duration}*.\nAlle Nachrichten werden in dieser Zeit automatisch gelöscht.`,
    muteDm: (groupName, duration) => `Du wurdest in *${groupName}* für *${duration}* stummgeschaltet.\nAlle deine Nachrichten werden in dieser Zeit automatisch gelöscht.`,
    unmuted: (nameList) => `Stummschaltung aufgehoben: ${nameList}.`,
    unmuteDm: (groupName) => `Deine Stummschaltung in *${groupName}* ist abgelaufen. Du kannst wieder Nachrichten senden.`,
    unmuteGc: (user) => `Stummschaltung für @${user} abgelaufen.`,
    muteInvalid: 'Ungültiges Format. Nutze: ?mute @user <Zahl> [s|m|d]\nBeispiel: ?mute @user 10 m',
    pong: 'Pong!',
    credits: 'WhatsApp Mod bot\n\nErstellt von: Martin (github.com/martinsuii)\n\nBasiert auf: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Bot-Status*\n\n' +
      `*Verbindung:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Betriebszeit:* ${uptime}`,
    helpPublic:
      '📋 *Befehle*\n\n' +
      '!ping - Testen ob der Bot läuft\n' +
      '!status - Bot-Status anzeigen\n' +
      '!credits - Bot-Credits anzeigen\n' +
      '!coinflip - Eine Münze werfen\n' +
      '!help  - Diese Hilfe anzeigen\n\n' +
      'Der Bot löscht automatisch Schimpfwörter in Gruppen, in denen er Admin ist.',
    helpAdmin:
      '🛡️ *Admin-Befehle*\n' +
      '(erfordert Admin-Rechte des Bots)\n\n' +
      '?warn @user [Grund] - Benutzer per DM warnen\n' +
      '?warnings @user - Warnungen des Benutzers anzeigen\n' +
      '?kick @user - Benutzer aus Gruppe entfernen\n' +
      '?ban @user - Benutzer bannen (automatische Ablehnung)\n' +
      '?unban @user - Bann des Benutzers aufheben\n' +
      '?mute @user <Zeit> [s|m|d] - Nachrichten automatisch löschen\n' +
      '?unmute @user - Stummschaltung aufheben\n' +
      '?ignore @user - Benutzer von Prüfung ausnehmen\n' +
      '?unignore @user - Ausnahme aufheben\n' +
      '?addword <Wort> - Gruppen-eigenes Wort verbieten\n' +
      '?removeword <Wort> - Gruppen-eigenes Wort erlauben\n' +
      '?purge <n> - Letzte N Nachrichten löschen\n' +
      '?stats - Moderations-Statistiken anzeigen\n' +
      '?settings - Gruppeneinstellungen anzeigen\n' +
      '?export - Einstellungen als Code exportieren\n' +
      '?import <Code> - Einstellungen aus Code importieren\n' +
      '?set-lang <Code> - Bot-Sprache für diese Gruppe setzen\n' +
      '?set-warnlimit <n> - Warn-Limit setzen\n' +
      '?set-warnpunish [ban|kick|mute] - Strafe festlegen\n' +
      '?set-antispam on/off - Anti-Spam ein/aus\n' +
      '?set-welcome <Nachricht> - Willkommensnachricht setzen\n' +
      '?set-goodbye <Nachricht> - Abschiedsnachricht setzen\n' +
      '?help - Diese Hilfe anzeigen',
    warnCount: (user, count, limit) => `Verwarnt: ${user}. Nun *${count}/${limit}* Verwarnungen.`,
    autoBanDm: (groupName, count, limit) => `Du wurdest automatisch aus *${groupName}* gebannt, weil du *${count}/${limit}* Verwarnungen erreicht hast.`,
    autoBanned: (user, count, limit) => `Auto-gebannt: @${user} für *${count}/${limit}* Verwarnungen.`,
    spamMuteDm: (groupName, duration) => `Du wurdest in *${groupName}* wegen Spam für *${duration}* automatisch stummgeschaltet. Alle deine Nachrichten werden gelöscht.`,
    spamMuted: (user) => `Anti-Spam: @${user} für 5 Minuten stummgeschaltet.`,
    unbanned: (nameList) => `Bann aufgehoben: ${nameList}.`,
    warningsNone: (user) => `@${user} hat keine Verwarnungen.`,
    warningsList: (user, count, limit, entries) => `Verwarnungen für @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" zur gruppeneigenen Wortliste hinzugefügt.`,
    wordRemoved: (word) => `"${word}" aus der gruppeneigenen Wortliste entfernt.`,
    wordNotFound: (word) => `"${word}" ist nicht in der gruppeneigenen Wortliste.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Gruppeneinstellungen*\n\n' +
      `*Sprache:* ${langName} (${langCode})\n` +
      `*Warn-Limit:* ${warnLimit}\n` +
      `*Strafe:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-Spam:* ${antiSpam}\n` +
      `*Gebannt:* ${banCount}\n` +
      `*Stumm:* ${muteCount}\n` +
      `*Ignoriert:* ${ignoredCount}\n` +
      `*Eigene Wörter:* ${customCount}\n` +
      `*Begrüßung:* ${welcome}\n` +
      `*Abschied:* ${goodbye}`,
    warnLimitSet: (n) => `Warn-Limit auf *${n}* gesetzt.`,
    warnPunishSet: (type, dur) => `Strafe für Verwarnung auf *${type}*${dur ? ' für ' + dur : ''} gesetzt.`,
    warnPunishInvalid: 'Ungültiger Straftyp. Nutze: ?set-warnpunish [ban|kick|mute] [Zeit bei mute]\nBeispiel: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Du wurdest automatisch aus *${groupName}* entfernt, weil du *${count}/${limit}* Verwarnungen erreicht hast.`,
    autoKicked: (user, count, limit) => `Auto-entfernt: @${user} für *${count}/${limit}* Verwarnungen.`,
    autoMuteDm: (groupName, count, limit, duration) => `Du wurdest in *${groupName}* für *${duration}* automatisch stummgeschaltet, nachdem du *${count}/${limit}* Verwarnungen erreicht hast.`,
    autoMuted: (user, count, limit, duration) => `Auto-stumm: @${user} für *${duration}* nach *${count}/${limit}* Verwarnungen.`,
    antiSpamSet: (val) => `Anti-Spam auf *${val}* gesetzt.`,
    welcomeSet: (msg) => `Willkommensnachricht gesetzt: "${msg}"\nNutze {user} als Platzhalter für das neue Mitglied.`,
    goodbyeSet: (msg) => `Abschiedsnachricht gesetzt: "${msg}"\nNutze {user} als Platzhalter. Wird nur angezeigt, wenn Benutzer freiwillig gehen.`,
    ignored: (nameList) => `Ignoriere nun ${nameList}. Nachrichten werden nicht auf Schimpfwörter geprüft.`,
    unignored: (nameList) => `Ignoriere ${nameList} nicht mehr.`,
    exported: (code) => `*Export-Code:*\n\`\`\`\n${code}\n\`\`\`\nImportieren mit: ?import <Code>`,
    imported: 'Einstellungen erfolgreich importiert.',
    importInvalid: 'Ungültiger Import-Code.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Gruppenstatistiken*\n\n' +
      `*Verwarnungen:* ${warns}\n` +
      `*Banns:* ${bans}\n` +
      `*Entfernungen:* ${kicks}\n` +
      `*Stummschaltungen:* ${mutes}\n` +
      `*Gelöschte Nachrichten:* ${deleted}\n` +
      `*Aktionen heute:* ${today}`,
  },

  fr: {
    name: 'Français',
    coinflip: (result) => `🪙 *Pile ou face :* ${result} !`,
    heads: 'Pile',
    tails: 'Face',
    profanityWarn: (groupName) =>
      '⚠️ *Avertissement : Langage Inapproprié*\n\n' +
      `Vous avez envoyé un message dans le groupe *${groupName}* contenant un langage inapproprié. ` +
      'Votre message a été supprimé.\n\n' +
      "Veuillez garder la conversation respectueuse. Des violations répétées peuvent entraîner d'autres mesures.",
    adminWarn: (groupName, reason) =>
      '⚠️ *Avertissement de l\'Administrateur*\n\n' +
      `Un administrateur vous a averti dans le groupe *${groupName}*.\n` +
      `*Raison :* ${reason}\n\n` +
      "Veuillez respecter les règles du groupe. D'autres violations peuvent entraîner l'exclusion.",
    adminRequest: "Faites-moi administrateur pour activer le filtrage automatique des grossièretés dans ce groupe.",
    langSet: (code, name) => `Langue définie sur *${name}* (${code}) pour ce groupe.`,
    langUnknown: (code) => `Code de langue "${code}" inconnu. Utilisez : en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Veuillez mentionner au moins un utilisateur.',
    cantSelf: 'Je ne peux pas effectuer cette action sur moi-même.',
    cantOwner: 'Impossible d\'effectuer cette action sur le propriétaire du groupe.',
    cantDm: (user) => `Impossible d\'envoyer un MP à @${user}. Il a peut-être désactivé les MP.`,
    kickFail: (user, status) => `Impossible d\'expulser @${user}. Statut : ${status}`,
    kickFailSimple: (user) => `Impossible d\'expulser @${user}.`,
    banFail: (user, status) => `Impossible de bannir @${user}. Statut : ${status}`,
    banFailSimple: (user) => `Impossible de bannir @${user}.`,
    banned: (user) => `Banni @${user}. Il ne peut plus rejoindre le groupe.`,
    muted: (nameList, duration) => `${nameList} réduit au silence pour *${duration}*.\nTous ses messages seront automatiquement supprimés.`,
    muteDm: (groupName, duration) => `Vous avez été réduit au silence dans *${groupName}* pour *${duration}*.\nTous vos messages seront automatiquement supprimés.`,
    unmuted: (nameList) => `${nameList} n'est plus réduit au silence.`,
    unmuteDm: (groupName) => `Votre silence dans *${groupName}* a expiré. Vous pouvez à nouveau envoyer des messages.`,
    unmuteGc: (user) => `Silence expiré pour @${user}.`,
    muteInvalid: 'Format invalide. Utilisez : ?mute @user <nombre> [s|m|d]\nExemple : ?mute @user 10 m',
    pong: 'Pong !',
    credits: 'WhatsApp Mod bot\n\nCréé par : Martin (github.com/martinsuii)\n\nBasé sur : Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo : github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Statut du Bot*\n\n' +
      `*Connexion :* ${connected ? '🟢 En ligne' : '🔴 Hors ligne'}\n` +
      `*Disponibilité :* ${uptime}`,
    helpPublic:
      '📋 *Commandes*\n\n' +
      '!ping - Tester si le bot est en vie\n' +
      '!status - Afficher le statut du bot\n' +
      '!credits - Afficher les crédits\n' +
      '!coinflip - Lancer une pièce\n' +
      '!help  - Afficher cette aide\n\n' +
      'Le bot supprime automatiquement les grossièretés dans les groupes où il est admin.',
    helpAdmin:
      '🛡️ *Commandes Admin*\n' +
      '(nécessite que le bot soit admin)\n\n' +
      '?warn @user [raison] - Avertir un utilisateur par MP\n' +
      '?warnings @user - Voir les avertissements\n' +
      '?kick @user - Expulser un utilisateur du groupe\n' +
      '?ban @user - Bannir un utilisateur (rejet automatique)\n' +
      '?unban @user - Débannir un utilisateur\n' +
      '?mute @user <durée> [s|m|d] - Supprimer automatiquement\n' +
      '?unmute @user - Retirer le silence\n' +
      '?ignore @user - Exempter du contrôle\n' +
      '?unignore @user - Retirer l\'exemption\n' +
      '?addword <mot> - Ajouter un mot interdit au groupe\n' +
      '?removeword <mot> - Retirer un mot interdit du groupe\n' +
      '?purge <n> - Supprimer les N derniers messages\n' +
      '?stats - Voir les statistiques\n' +
      '?settings - Voir les paramètres du groupe\n' +
      '?export - Exporter la config en code\n' +
      '?import <code> - Importer la config depuis un code\n' +
      '?set-lang <code> - Changer la langue du bot pour ce groupe\n' +
      '?set-warnlimit <n> - Définir la limite d\'avertissements\n' +
      '?set-warnpunish [ban|kick|mute] - Définir la punition\n' +
      '?set-antispam on/off - Activer/désactiver anti-spam\n' +
      '?set-welcome <msg> - Définir le message de bienvenue\n' +
      '?set-goodbye <msg> - Définir le message d\'adieu\n' +
      '?help - Afficher cette aide',
    warnCount: (user, count, limit) => `Averti ${user}. Il a maintenant *${count}/${limit}* avertissements.`,
    autoBanDm: (groupName, count, limit) => `Vous avez été automatiquement banni de *${groupName}* pour avoir atteint *${count}/${limit}* avertissements.`,
    autoBanned: (user, count, limit) => `Auto-banni @${user} pour avoir atteint *${count}/${limit}* avertissements.`,
    spamMuteDm: (groupName, duration) => `Vous avez été automatiquement réduit au silence dans *${groupName}* pendant *${duration}* pour spam. Tous vos messages seront supprimés.`,
    spamMuted: (user) => `Anti-spam : @${user} réduit au silence pendant 5 minutes.`,
    unbanned: (nameList) => `Banni levé pour ${nameList}.`,
    warningsNone: (user) => `@${user} n'a aucun avertissement.`,
    warningsList: (user, count, limit, entries) => `Avertissements de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" ajouté à la liste des mots interdits du groupe.`,
    wordRemoved: (word) => `"${word}" retiré de la liste des mots interdits du groupe.`,
    wordNotFound: (word) => `"${word}" n'est pas dans la liste des mots interdits du groupe.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Paramètres du Groupe*\n\n' +
      `*Langue :* ${langName} (${langCode})\n` +
      `*Limite d'avertissements :* ${warnLimit}\n` +
      `*Punition :* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam :* ${antiSpam}\n` +
      `*Bannis :* ${banCount}\n` +
      `*Réduits au silence :* ${muteCount}\n` +
      `*Ignorés :* ${ignoredCount}\n` +
      `*Mots personnalisés :* ${customCount}\n` +
      `*Bienvenue :* ${welcome}\n` +
      `*Adieu :* ${goodbye}`,
    warnLimitSet: (n) => `Limite d'avertissements définie sur *${n}*.`,
    warnPunishSet: (type, dur) => `Punition d'avertissement définie sur *${type}*${dur ? ' pendant ' + dur : ''}.`,
    warnPunishInvalid: 'Type de punition invalide. Utilisez : ?set-warnpunish [ban|kick|mute] [durée si mute]\nExemple : ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Vous avez été automatiquement expulsé de *${groupName}* pour avoir atteint *${count}/${limit}* avertissements.`,
    autoKicked: (user, count, limit) => `Auto-expulsé @${user} pour avoir atteint *${count}/${limit}* avertissements.`,
    autoMuteDm: (groupName, count, limit, duration) => `Vous avez été automatiquement réduit au silence dans *${groupName}* pendant *${duration}* après avoir atteint *${count}/${limit}* avertissements.`,
    autoMuted: (user, count, limit, duration) => `Auto-silence @${user} pendant *${duration}* après *${count}/${limit}* avertissements.`,
    antiSpamSet: (val) => `Anti-spam défini sur *${val}*.`,
    welcomeSet: (msg) => `Message de bienvenue défini : "${msg}"\nUtilisez {user} comme espace réservé pour le nouveau membre.`,
    goodbyeSet: (msg) => `Message d'adieu défini : "${msg}"\nUtilisez {user} comme espace réservé. Affiché uniquement quand les utilisateurs partent volontairement.`,
    ignored: (nameList) => `Ignore maintenant ${nameList}. Leurs messages ne seront pas vérifiés.`,
    unignored: (nameList) => `N'ignore plus ${nameList}.`,
    exported: (code) => `*Code d'export :*\n\`\`\`\n${code}\n\`\`\`\nImportez avec : ?import <code>`,
    imported: 'Paramètres importés avec succès.',
    importInvalid: 'Code d\'import invalide.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Statistiques du Groupe*\n\n' +
      `*Avertissements :* ${warns}\n` +
      `*Bannissements :* ${bans}\n` +
      `*Expulsions :* ${kicks}\n` +
      `*Silences :* ${mutes}\n` +
      `*Messages supprimés :* ${deleted}\n` +
      `*Actions aujourd\'hui :* ${today}`,
  },

  pt: {
    name: 'Português',
    coinflip: (result) => `🪙 *Cara ou coroa:* ${result}!`,
    heads: 'Cara',
    tails: 'Coroa',
    profanityWarn: (groupName) =>
      '⚠️ *Aviso: Linguagem Inapropriada*\n\n' +
      `Você enviou uma mensagem no grupo *${groupName}* com linguagem inapropriada. ` +
      'Sua mensagem foi apagada.\n\n' +
      'Mantenha a conversa respeitosa. Violações repetidas podem resultar em mais ações.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Aviso do Administrador*\n\n' +
      `Você foi avisado por um administrador no grupo *${groupName}*.\n` +
      `*Motivo:* ${reason}\n\n` +
      'Siga as regras do grupo. Mais violações podem resultar em remoção.',
    adminRequest: 'Por favor, torne-me administrador para ativar o filtro automático de palavrões neste grupo.',
    langSet: (code, name) => `Idioma definido como *${name}* (${code}) para este grupo.`,
    langUnknown: (code) => `Código de idioma "${code}" desconhecido. Use: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Por favor, mencione pelo menos um usuário.',
    cantSelf: 'Não posso fazer isso comigo mesmo.',
    cantOwner: 'Não é possível fazer isso com o dono do grupo.',
    cantDm: (user) => `Não foi possível enviar DM para @${user}. Pode ter DMs desativadas.`,
    kickFail: (user, status) => `Falha ao expulsar @${user}. Status: ${status}`,
    kickFailSimple: (user) => `Falha ao expulsar @${user}.`,
    banFail: (user, status) => `Falha ao banir @${user}. Status: ${status}`,
    banFailSimple: (user) => `Falha ao banir @${user}.`,
    banned: (user) => `Banido @${user}. Não pode mais entrar no grupo.`,
    muted: (nameList, duration) => `Silenciado ${nameList} por *${duration}*.\nTodas as mensagens serão automaticamente excluídas.`,
    muteDm: (groupName, duration) => `Você foi silenciado em *${groupName}* por *${duration}*.\nTodas as suas mensagens serão automaticamente excluídas.`,
    unmuted: (nameList) => `Silêncio removido de ${nameList}.`,
    unmuteDm: (groupName) => `Seu silêncio em *${groupName}* expirou. Você pode enviar mensagens novamente.`,
    unmuteGc: (user) => `Silêncio expirado para @${user}.`,
    muteInvalid: 'Formato inválido. Use: ?mute @user <número> [s|m|d]\nExemplo: ?mute @user 10 m',
    pong: 'Pong!',
    credits: 'WhatsApp Mod bot\n\nCriado por: Martin (github.com/martinsuii)\n\nBaseado em: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Status do Bot*\n\n' +
      `*Conexão:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Ativo há:* ${uptime}`,
    helpPublic:
      '📋 *Comandos*\n\n' +
      '!ping - Testar se o bot está vivo\n' +
      '!status - Mostrar status do bot\n' +
      '!credits - Mostrar créditos do bot\n' +
      '!coinflip - Jogar uma moeda\n' +
      '!help  - Mostrar esta ajuda\n\n' +
      'O bot exclui automaticamente palavrões em grupos onde é admin.',
    helpAdmin:
      '🛡️ *Comandos de Admin*\n' +
      '(requer que o bot seja admin)\n\n' +
      '?warn @user [motivo] - Avisar um usuário por DM\n' +
      '?warnings @user - Ver avisos do usuário\n' +
      '?kick @user - Remover um usuário do grupo\n' +
      '?ban @user - Banir um usuário (rejeição automática)\n' +
      '?unban @user - Desbanir um usuário\n' +
      '?mute @user <tempo> [s|m|d] - Excluir mensagens automaticamente\n' +
      '?unmute @user - Remover silêncio\n' +
      '?ignore @user - Isentar usuário de verificação\n' +
      '?unignore @user - Remover isenção\n' +
      '?addword <palavra> - Adicionar palavra proibida do grupo\n' +
      '?removeword <palavra> - Remover palavra proibida do grupo\n' +
      '?purge <n> - Apagar últimas N mensagens\n' +
      '?stats - Mostrar estatísticas\n' +
      '?settings - Mostrar configurações do grupo\n' +
      '?export - Exportar configuração como código\n' +
      '?import <código> - Importar configuração do código\n' +
      '?set-lang <código> - Mudar idioma do bot para este grupo\n' +
      '?set-warnlimit <n> - Definir limite de avisos\n' +
      '?set-warnpunish [ban|kick|mute] - Definir punição\n' +
      '?set-antispam on/off - Ativar/desativar anti-spam\n' +
      '?set-welcome <msg> - Definir mensagem de boas-vindas\n' +
      '?set-goodbye <msg> - Definir mensagem de despedida\n' +
      '?help - Mostrar esta ajuda',
    warnCount: (user, count, limit) => `Avisado ${user}. Agora tem *${count}/${limit}* avisos.`,
    autoBanDm: (groupName, count, limit) => `Você foi automaticamente banido de *${groupName}* por atingir *${count}/${limit}* avisos.`,
    autoBanned: (user, count, limit) => `Auto-banido @${user} por atingir *${count}/${limit}* avisos.`,
    spamMuteDm: (groupName, duration) => `Você foi automaticamente silenciado em *${groupName}* por *${duration}* devido a spam. Todas as suas mensagens serão excluídas.`,
    spamMuted: (user) => `Anti-spam: silenciado @${user} por 5 minutos.`,
    unbanned: (nameList) => `Desbanido ${nameList}.`,
    warningsNone: (user) => `@${user} não tem avisos.`,
    warningsList: (user, count, limit, entries) => `Avisos de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Adicionado "${word}" à lista de palavras proibidas do grupo.`,
    wordRemoved: (word) => `Removido "${word}" da lista de palavras proibidas do grupo.`,
    wordNotFound: (word) => `"${word}" não está na lista de palavras proibidas do grupo.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Configurações do Grupo*\n\n' +
      `*Idioma:* ${langName} (${langCode})\n` +
      `*Limite de avisos:* ${warnLimit}\n` +
      `*Punição:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Banidos:* ${banCount}\n` +
      `*Silenciados:* ${muteCount}\n` +
      `*Ignorados:* ${ignoredCount}\n` +
      `*Palavras personalizadas:* ${customCount}\n` +
      `*Boas-vindas:* ${welcome}\n` +
      `*Despedida:* ${goodbye}`,
    warnLimitSet: (n) => `Limite de avisos definido como *${n}*.`,
    warnPunishSet: (type, dur) => `Punição de aviso definida como *${type}*${dur ? ' por ' + dur : ''}.`,
    warnPunishInvalid: 'Tipo de punição inválido. Use: ?set-warnpunish [ban|kick|mute] [tempo se mute]\nExemplo: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Você foi automaticamente expulso de *${groupName}* por atingir *${count}/${limit}* avisos.`,
    autoKicked: (user, count, limit) => `Auto-expulso @${user} por atingir *${count}/${limit}* avisos.`,
    autoMuteDm: (groupName, count, limit, duration) => `Você foi automaticamente silenciado em *${groupName}* por *${duration}* após atingir *${count}/${limit}* avisos.`,
    autoMuted: (user, count, limit, duration) => `Auto-silenciado @${user} por *${duration}* após atingir *${count}/${limit}* avisos.`,
    antiSpamSet: (val) => `Anti-spam definido como *${val}*.`,
    welcomeSet: (msg) => `Mensagem de boas-vindas definida: "${msg}"\nUse {user} como espaço reservado para o novo membro.`,
    goodbyeSet: (msg) => `Mensagem de despedida definida: "${msg}"\nUse {user} como espaço reservado. Exibida apenas quando usuários saem voluntariamente.`,
    ignored: (nameList) => `Agora ignorando ${nameList}. Suas mensagens não serão verificadas por palavrões.`,
    unignored: (nameList) => `Não ignorando mais ${nameList}.`,
    exported: (code) => `*Código de exportação:*\n\`\`\`\n${code}\n\`\`\`\nImporte com: ?import <código>`,
    imported: 'Configurações importadas com sucesso.',
    importInvalid: 'Código de importação inválido.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Estatísticas do Grupo*\n\n' +
      `*Avisos:* ${warns}\n` +
      `*Bans:* ${bans}\n` +
      `*Expulsões:* ${kicks}\n` +
      `*Silêncios:* ${mutes}\n` +
      `*Mensagens excluídas:* ${deleted}\n` +
      `*Ações hoje:* ${today}`,
  },

  ru: {
    name: 'Русский',
    coinflip: (result) => `🪙 *Подбрасывание монеты:* ${result}!`,
    heads: 'Орёл',
    tails: 'Решка',
    profanityWarn: (groupName) =>
      '⚠️ *Предупреждение: Нецензурная лексика*\n\n' +
      `Вы отправили сообщение в группе *${groupName}*, содержащее нецензурную лексику. ` +
      'Ваше сообщение удалено.\n\n' +
      'Пожалуйста, соблюдайте уважение в общении. Повторные нарушения могут привести к дальнейшим мерам.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Предупреждение от администратора*\n\n' +
      `Администратор вынес вам предупреждение в группе *${groupName}*.\n` +
      `*Причина:* ${reason}\n\n` +
      'Соблюдайте правила группы. Дальнейшие нарушения могут привести к исключению.',
    adminRequest: 'Пожалуйста, сделайте меня администратором для включения автоматической фильтрации ненормативной лексики в этой группе.',
    langSet: (code, name) => `Язык изменён на *${name}* (${code}) для этой группы.`,
    langUnknown: (code) => `Неизвестный код языка "${code}". Используйте: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Пожалуйста, упомяните хотя бы одного пользователя.',
    cantSelf: 'Я не могу выполнить это действие над собой.',
    cantOwner: 'Нельзя выполнить это действие над владельцем группы.',
    cantDm: (user) => `Не удалось отправить ЛС @${user}. Возможно, у него отключены личные сообщения.`,
    kickFail: (user, status) => `Не удалось исключить @${user}. Статус: ${status}`,
    kickFailSimple: (user) => `Не удалось исключить @${user}.`,
    banFail: (user, status) => `Не удалось забанить @${user}. Статус: ${status}`,
    banFailSimple: (user) => `Не удалось забанить @${user}.`,
    banned: (user) => `Забанен @${user}. Не может повторно присоединиться к группе.`,
    muted: (nameList, duration) => `${nameList} заглушен на *${duration}*.\nВсе его сообщения будут автоматически удаляться.`,
    muteDm: (groupName, duration) => `Вы были заглушены в группе *${groupName}* на *${duration}*.\nВсе ваши сообщения будут автоматически удаляться в течение этого времени.`,
    unmuted: (nameList) => `Заглушение снято с ${nameList}.`,
    unmuteDm: (groupName) => `Ваше заглушение в *${groupName}* истекло. Вы снова можете отправлять сообщения.`,
    unmuteGc: (user) => `Заглушение истекло для @${user}.`,
    muteInvalid: 'Неверный формат. Используйте: ?mute @user <число> [s|m|d]\nПример: ?mute @user 10 m',
    pong: 'Понг!',
    credits: 'WhatsApp Mod bot\n\nСоздал: Martin (github.com/martinsuii)\n\nНа основе: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Статус Бота*\n\n' +
      `*Подключение:* ${connected ? '🟢 Онлайн' : '🔴 Офлайн'}\n` +
      `*Аптайм:* ${uptime}`,
    helpPublic:
      '📋 *Команды*\n\n' +
      '!ping - Проверить работает ли бот\n' +
      '!status - Показать статус бота\n' +
      '!credits - Показать авторов\n' +
      '!coinflip - Подбросить монету\n' +
      '!help  - Показать эту справку\n\n' +
      'Бот автоматически удаляет нецензурную лексику в группах, где он админ.',
    helpAdmin:
      '🛡️ *Команды Админа*\n' +
      '(требуются права админа бота)\n\n' +
      '?warn @user [причина] - Предупредить пользователя в ЛС\n' +
      '?warnings @user - Показать предупреждения\n' +
      '?kick @user - Исключить пользователя из группы\n' +
      '?ban @user - Забанить пользователя (авто-отказ)\n' +
      '?unban @user - Разбанить пользователя\n' +
      '?mute @user <время> [s|m|d] - Автоудаление сообщений\n' +
      '?unmute @user - Снять заглушение\n' +
      '?ignore @user - Исключить из проверки\n' +
      '?unignore @user - Убрать исключение\n' +
      '?addword <слово> - Добавить запрещённое слово группы\n' +
      '?removeword <слово> - Удалить запрещённое слово группы\n' +
      '?purge <n> - Удалить последние N сообщений\n' +
      '?stats - Показать статистику\n' +
      '?settings - Показать настройки группы\n' +
      '?export - Экспорт настроек как код\n' +
      '?import <код> - Импорт настроек из кода\n' +
      '?set-lang <код> - Установить язык бота для этой группы\n' +
      '?set-warnlimit <n> - Установить лимит предупреждений\n' +
      '?set-warnpunish [ban|kick|mute] - Установить наказание\n' +
      '?set-antispam on/off - Вкл/выкл анти-спам\n' +
      '?set-welcome <сообщ> - Установить приветствие\n' +
      '?set-goodbye <сообщ> - Установить прощание\n' +
      '?help - Показать эту справку',
    warnCount: (user, count, limit) => `Предупреждён ${user}. Теперь у него *${count}/${limit}* предупреждений.`,
    autoBanDm: (groupName, count, limit) => `Вы были автоматически забанены в группе *${groupName}* за достижение *${count}/${limit}* предупреждений.`,
    autoBanned: (user, count, limit) => `Авто-бан @${user} за достижение *${count}/${limit}* предупреждений.`,
    spamMuteDm: (groupName, duration) => `Вы были автоматически заглушены в группе *${groupName}* на *${duration}* из-за спама. Все ваши сообщения будут удаляться.`,
    spamMuted: (user) => `Анти-спам: заглушен @${user} на 5 минут.`,
    unbanned: (nameList) => `Разбанен ${nameList}.`,
    warningsNone: (user) => `У @${user} нет предупреждений.`,
    warningsList: (user, count, limit, entries) => `Предупреждения @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Добавлено "${word}" в список запрещённых слов группы.`,
    wordRemoved: (word) => `Удалено "${word}" из списка запрещённых слов группы.`,
    wordNotFound: (word) => `"${word}" нет в списке запрещённых слов группы.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Настройки Группы*\n\n' +
      `*Язык:* ${langName} (${langCode})\n` +
      `*Лимит предупреждений:* ${warnLimit}\n` +
      `*Наказание:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Анти-спам:* ${antiSpam}\n` +
      `*Забанено:* ${banCount}\n` +
      `*Заглушено:* ${muteCount}\n` +
      `*Игнорируется:* ${ignoredCount}\n` +
      `*Своих слов:* ${customCount}\n` +
      `*Приветствие:* ${welcome}\n` +
      `*Прощание:* ${goodbye}`,
    warnLimitSet: (n) => `Лимит предупреждений установлен на *${n}*.`,
    warnPunishSet: (type, dur) => `Наказание за предупреждения: *${type}*${dur ? ' на ' + dur : ''}.`,
    warnPunishInvalid: 'Неверный тип наказания. Используйте: ?set-warnpunish [ban|kick|mute] [время если mute]\nПример: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Вы были автоматически исключены из группы *${groupName}* за достижение *${count}/${limit}* предупреждений.`,
    autoKicked: (user, count, limit) => `Авто-кик @${user} за достижение *${count}/${limit}* предупреждений.`,
    autoMuteDm: (groupName, count, limit, duration) => `Вы были автоматически заглушены в группе *${groupName}* на *${duration}* после достижения *${count}/${limit}* предупреждений.`,
    autoMuted: (user, count, limit, duration) => `Авто-заглушение @${user} на *${duration}* после *${count}/${limit}* предупреждений.`,
    antiSpamSet: (val) => `Анти-спам установлен на *${val}*.`,
    welcomeSet: (msg) => `Приветственное сообщение: "${msg}"\nИспользуйте {user} как заполнитель для нового участника.`,
    goodbyeSet: (msg) => `Прощальное сообщение: "${msg}"\nИспользуйте {user} как заполнитель. Показывается только когда пользователи уходят сами.`,
    ignored: (nameList) => `Теперь игнорирую ${nameList}. Их сообщения не будут проверяться на ненормативную лексику.`,
    unignored: (nameList) => `Больше не игнорирую ${nameList}.`,
    exported: (code) => `*Код экспорта:*\n\`\`\`\n${code}\n\`\`\`\nИмпорт с помощью: ?import <код>`,
    imported: 'Настройки успешно импортированы.',
    importInvalid: 'Неверный код импорта.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Статистика Группы*\n\n' +
      `*Предупреждений:* ${warns}\n` +
      `*Банов:* ${bans}\n` +
      `*Киков:* ${kicks}\n` +
      `*Заглушений:* ${mutes}\n` +
      `*Удалено сообщений:* ${deleted}\n` +
      `*Действий сегодня:* ${today}`,
  },

  id: {
    name: 'Bahasa Indonesia',
    coinflip: (result) => `🪙 *Lempar koin:* ${result}!`,
    heads: 'Kepala',
    tails: 'Ekor',
    profanityWarn: (groupName) =>
      '⚠️ *Peringatan: Bahasa Tidak Pantas*\n\n' +
      `Anda mengirim pesan di grup *${groupName}* yang mengandung bahasa tidak pantas. ` +
      'Pesan Anda telah dihapus.\n\n' +
      'Harap jaga percakapan tetap sopan. Pelanggaran berulang dapat mengakibatkan tindakan lebih lanjut.',
    adminWarn: (groupName, reason) =>
      '⚠️ *Peringatan dari Admin Grup*\n\n' +
      `Anda telah diperingatkan oleh admin di grup *${groupName}*.\n` +
      `*Alasan:* ${reason}\n\n` +
      'Harap patuhi aturan grup. Pelanggaran lebih lanjut dapat mengakibatkan pengeluaran.',
    adminRequest: 'Tolong jadikan saya admin untuk mengaktifkan filter kata kasar otomatis di grup ini.',
    langSet: (code, name) => `Bahasa diatur ke *${name}* (${code}) untuk grup ini.`,
    langUnknown: (code) => `Kode bahasa "${code}" tidak dikenal. Gunakan: en, cs, es, de, fr, pt, ru, id.`,
    noMention: 'Harap sebutkan setidaknya satu pengguna.',
    cantSelf: 'Saya tidak bisa melakukan tindakan ini pada diri sendiri.',
    cantOwner: 'Tidak bisa melakukan tindakan ini pada pemilik grup.',
    cantDm: (user) => `Tidak dapat mengirim DM ke @${user}. Mungkin DM dinonaktifkan.`,
    kickFail: (user, status) => `Gagal mengeluarkan @${user}. Status: ${status}`,
    kickFailSimple: (user) => `Gagal mengeluarkan @${user}.`,
    banFail: (user, status) => `Gagal memblokir @${user}. Status: ${status}`,
    banFailSimple: (user) => `Gagal memblokir @${user}.`,
    banned: (user) => `Diblokir @${user}. Tidak dapat bergabung kembali ke grup.`,
    muted: (nameList, duration) => `Dibisukan ${nameList} selama *${duration}*.\nSemua pesan akan otomatis dihapus selama periode ini.`,
    muteDm: (groupName, duration) => `Anda telah dibisukan di *${groupName}* selama *${duration}*.\nSemua pesan Anda akan otomatis dihapus selama waktu ini.`,
    unmuted: (nameList) => `Pembisuan dibatalkan untuk ${nameList}.`,
    unmuteDm: (groupName) => `Pembisuan Anda di *${groupName}* telah berakhir. Anda dapat mengirim pesan lagi.`,
    unmuteGc: (user) => `Pembisuan berakhir untuk @${user}.`,
    muteInvalid: 'Format tidak valid. Gunakan: ?mute @user <angka> [s|m|d]\nContoh: ?mute @user 10 m',
    pong: 'Pong!',
    credits: 'WhatsApp Mod bot\n\nDibuat oleh: Martin (github.com/martinsuii)\n\nBerdasarkan: Baileys (https://github.com/WhiskeySockets/Baileys)\n\nGithub Repo: github.com/martinsuii/wa-bot',
    status: (connected, uptime) =>
      '🤖 *Status Bot*\n\n' +
      `*Koneksi:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Waktu Aktif:* ${uptime}`,
    helpPublic:
      '📋 *Perintah*\n\n' +
      '!ping - Cek apakah bot hidup\n' +
      '!status - Tampilkan status bot\n' +
      '!credits - Tampilkan kredit bot\n' +
      '!coinflip - Lempar koin\n' +
      '!help  - Tampilkan bantuan ini\n\n' +
      'Bot otomatis menghapus kata kasar di grup tempat bot menjadi admin.',
    helpAdmin:
      '🛡️ *Perintah Admin*\n' +
      '(perlu bot menjadi admin)\n\n' +
      '?warn @user [alasan] - Peringatkan pengguna via DM\n' +
      '?warnings @user - Lihat peringatan pengguna\n' +
      '?kick @user - Keluarkan pengguna dari grup\n' +
      '?ban @user - Blokir pengguna (tolak otomatis)\n' +
      '?unban @user - Buka blokir pengguna\n' +
      '?mute @user <waktu> [s|m|d] - Hapus otomatis pesan\n' +
      '?unmute @user - Batalkan pembisuan\n' +
      '?ignore @user - Kecualikan dari pemeriksaan\n' +
      '?unignore @user - Hapus pengecualian\n' +
      '?addword <kata> - Tambah kata terlarang grup\n' +
      '?removeword <kata> - Hapus kata terlarang grup\n' +
      '?purge <n> - Hapus N pesan terakhir\n' +
      '?stats - Tampilkan statistik\n' +
      '?settings - Tampilkan pengaturan grup\n' +
      '?export - Ekspor pengaturan sebagai kode\n' +
      '?import <kode> - Impor pengaturan dari kode\n' +
      '?set-lang <kode> - Atur bahasa bot untuk grup ini\n' +
      '?set-warnlimit <n> - Atur batas peringatan\n' +
      '?set-warnpunish [ban|kick|mute] - Atur hukuman\n' +
      '?set-antispam on/off - Aktifkan/nonaktifkan anti-spam\n' +
      '?set-welcome <pesan> - Atur pesan sambutan\n' +
      '?set-goodbye <pesan> - Atur pesan perpisahan\n' +
      '?help - Tampilkan bantuan ini',
    warnCount: (user, count, limit) => `Diperingatkan ${user}. Sekarang memiliki *${count}/${limit}* peringatan.`,
    autoBanDm: (groupName, count, limit) => `Anda telah otomatis diblokir dari *${groupName}* karena mencapai *${count}/${limit}* peringatan.`,
    autoBanned: (user, count, limit) => `Otomatis diblokir @${user} karena mencapai *${count}/${limit}* peringatan.`,
    spamMuteDm: (groupName, duration) => `Anda telah otomatis dibisukan di *${groupName}* selama *${duration}* karena spam. Semua pesan Anda akan dihapus.`,
    spamMuted: (user) => `Anti-spam: dibisukan @${user} selama 5 menit.`,
    unbanned: (nameList) => `Blokir dibuka untuk ${nameList}.`,
    warningsNone: (user) => `@${user} tidak memiliki peringatan.`,
    warningsList: (user, count, limit, entries) => `Peringatan untuk @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Ditambahkan "${word}" ke daftar kata terlarang grup.`,
    wordRemoved: (word) => `Dihapus "${word}" dari daftar kata terlarang grup.`,
    wordNotFound: (word) => `"${word}" tidak ada di daftar kata terlarang grup.`,
    settingsDisplay: (langName, langCode, warnLimit, punish, punishDur, antiSpam, banCount, muteCount, customCount, ignoredCount, welcome, goodbye) =>
      '⚙ *Pengaturan Grup*\n\n' +
      `*Bahasa:* ${langName} (${langCode})\n` +
      `*Batas peringatan:* ${warnLimit}\n` +
      `*Hukuman:* ${punish}${punishDur ? ' (' + punishDur + ')' : ''}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Diblokir:* ${banCount}\n` +
      `*Dibisukan:* ${muteCount}\n` +
      `*Diabaikan:* ${ignoredCount}\n` +
      `*Kata kustom:* ${customCount}\n` +
      `*Sambutan:* ${welcome}\n` +
      `*Perpisahan:* ${goodbye}`,
    warnLimitSet: (n) => `Batas peringatan diatur ke *${n}*.`,
    warnPunishSet: (type, dur) => `Hukuman peringatan diatur ke *${type}*${dur ? ' selama ' + dur : ''}.`,
    warnPunishInvalid: 'Tipe hukuman tidak valid. Gunakan: ?set-warnpunish [ban|kick|mute] [waktu jika mute]\nContoh: ?set-warnpunish mute 30 m',
    autoKickDm: (groupName, count, limit) => `Anda telah otomatis dikeluarkan dari *${groupName}* karena mencapai *${count}/${limit}* peringatan.`,
    autoKicked: (user, count, limit) => `Otomatis dikeluarkan @${user} karena mencapai *${count}/${limit}* peringatan.`,
    autoMuteDm: (groupName, count, limit, duration) => `Anda telah otomatis dibisukan di *${groupName}* selama *${duration}* setelah mencapai *${count}/${limit}* peringatan.`,
    autoMuted: (user, count, limit, duration) => `Otomatis dibisukan @${user} selama *${duration}* setelah *${count}/${limit}* peringatan.`,
    antiSpamSet: (val) => `Anti-spam diatur ke *${val}*.`,
    welcomeSet: (msg) => `Pesan sambutan diatur: "${msg}"\nGunakan {user} sebagai placeholder untuk anggota baru.`,
    goodbyeSet: (msg) => `Pesan perpisahan diatur: "${msg}"\nGunakan {user} sebagai placeholder. Hanya ditampilkan saat pengguna keluar secara sukarela.`,
    ignored: (nameList) => `Sekarang mengabaikan ${nameList}. Pesan mereka tidak akan diperiksa kata kasarnya.`,
    unignored: (nameList) => `Tidak lagi mengabaikan ${nameList}.`,
    exported: (code) => `*Kode ekspor:*\n\`\`\`\n${code}\n\`\`\`\nImpor dengan: ?import <kode>`,
    imported: 'Pengaturan berhasil diimpor.',
    importInvalid: 'Kode impor tidak valid.',
    statsDisplay: (warns, bans, kicks, mutes, deleted, today) =>
      '📊 *Statistik Grup*\n\n' +
      `*Peringatan:* ${warns}\n` +
      `*Blokir:* ${bans}\n` +
      `*Keluarkan:* ${kicks}\n` +
      `*Bisukan:* ${mutes}\n` +
      `*Pesan dihapus:* ${deleted}\n` +
      `*Aksi hari ini:* ${today}`,
  },

};

const DEFAULT_LANG = 'en';

function t(lang, key) {
  const l = translations[lang] || translations[DEFAULT_LANG];
  const val = l?.[key] || translations[DEFAULT_LANG]?.[key];
  if (typeof val !== 'function' && typeof val !== 'string') {
    return () => `[missing: ${key}]`;
  }
  return val;
}

function supportedLangs() {
  return Object.entries(translations).map(([code, t]) => `${code} (${t.name})`).join(', ');
}

module.exports = { translations, DEFAULT_LANG, t, supportedLangs };
