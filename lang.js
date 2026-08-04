const translations = {
  en: {
    name: 'English',
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
    muteInvalid: 'Invalid mute format. Use: ?mute @user <number> [s|m|d]\nExample: ?mute @user 10 m',
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
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Group Settings*\n\n' +
      `*Language:* ${langName} (${langCode})\n` +
      `*Warn limit:* ${warnLimit}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Banned users:* ${banCount}\n` +
      `*Muted users:* ${muteCount}\n` +
      `*Custom words:* ${customCount}\n` +
      `*Welcome:* ${welcome}`,
    warnLimitSet: (n) => `Warn limit set to *${n}*. Users will be auto-banned after ${n} warnings.`,
    antiSpamSet: (val) => `Anti-spam set to *${val}*.`,
    welcomeSet: (msg) => `Welcome message set to: "${msg}"\nUse {user} as placeholder for the new member.`,
    pong: 'Pong!',
    status: (connected, uptime) =>
      '🤖 *Bot Status*\n\n' +
      `*Connection:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Uptime:* ${uptime}`,
    helpPublic:
      '📋 *Commands*\n\n' +
      '!ping - Test if the bot is alive\n' +
      '!status - Show bot status\n' +
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
      '?addword <word> - Add group-specific badword\n' +
      '?removeword <word> - Remove group-specific badword\n' +
      '?set-lang <code> - Set bot language for this group\n' +
      '?set-warnlimit <n> - Set warn limit for auto-ban\n' +
      '?set-antispam on/off - Toggle anti-spam\n' +
      '?set-welcome <msg> - Set welcome message ({user}=name)\n' +
      '?settings - Show group settings\n' +
      '?help - Show this help',
  },

  cs: {
    name: 'Čeština',
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
    muteInvalid: 'Neplatný formát. Použijte: ?mute @user <číslo> [s|m|d]\nPříklad: ?mute @user 10 m',
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
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Nastavení Skupiny*\n\n' +
      `*Jazyk:* ${langName} (${langCode})\n` +
      `*Limit varování:* ${warnLimit}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Zabanovaných:* ${banCount}\n` +
      `*Umlčených:* ${muteCount}\n` +
      `*Vlastních slov:* ${customCount}\n` +
      `*Uvítání:* ${welcome}`,
    warnLimitSet: (n) => `Limit varování nastaven na *${n}*. Uživatelé budou auto-zabanováni po ${n} varováních.`,
    antiSpamSet: (val) => `Anti-spam nastaven na *${val}*.`,
    welcomeSet: (msg) => `Uvítací zpráva nastavena na: "${msg}"\nPoužijte {user} jako zástupný symbol pro nového člena.`,
    pong: 'Pong!',
    status: (connected, uptime) =>
      '🤖 *Stav Bota*\n\n' +
      `*Připojení:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Běží:* ${uptime}`,
    helpPublic:
      '📋 *Příkazy*\n\n' +
      '!ping - Otestovat zda bot běží\n' +
      '!status - Zobrazit stav bota\n' +
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
      '?addword <slovo> - Přidat zakázané slovo skupiny\n' +
      '?removeword <slovo> - Odebrat zakázané slovo skupiny\n' +
      '?set-lang <kód> - Nastavit jazyk bota pro tuto skupinu\n' +
      '?set-warnlimit <n> - Nastavit limit varování\n' +
      '?set-antispam on/off - Zapnout/vypnout anti-spam\n' +
      '?set-welcome <zpráva> - Nastavit uvítací zprávu ({user}=jméno)\n' +
      '?settings - Zobrazit nastavení skupiny\n' +
      '?help - Zobrazit tuto nápovědu',
  },

  es: {
    name: 'Español',
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
    muteInvalid: 'Formato inválido. Usa: ?mute @user <número> [s|m|d]\nEjemplo: ?mute @user 10 m',
    warnCount: (user, count, limit) => `Advertido ${user}. Ahora tiene *${count}/${limit}* advertencias.`,
    autoBanDm: (groupName, count, limit) => `Has sido baneado automáticamente de *${groupName}* por alcanzar *${count}/${limit}* advertencias.`,
    autoBanned: (user, count, limit) => `Auto-baneado @${user} por alcanzar *${count}/${limit}* advertencias.`,
    spamMuteDm: (groupName, duration) => `Has sido silenciado automáticamente en *${groupName}* por *${duration}* debido a spam. Todos tus mensajes serán eliminados.`,
    spamMuted: (user) => `Anti-spam: silenciado @${user} por 5 minutos.`,
    unbanned: (nameList) => `Desbaneado ${nameList}.`,
    warningsNone: (user) => `@${user} no tiene advertencias.`,
    warningsList: (user, count, limit, entries) => `Advertencias de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `Añadido "${word}" a la lista de palabras prohibidas del grupo.`,
    wordRemoved: (word) => `Eliminado "${word}" de la lista de palabras prohibidas del grupo.`,
    wordNotFound: (word) => `"${word}" no está en la lista de palabras prohibidas del grupo.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Configuración del Grupo*\n\n' +
      `*Idioma:* ${langName} (${langCode})\n` +
      `*Límite avisos:* ${warnLimit}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Baneados:* ${banCount}\n` +
      `*Silenciados:* ${muteCount}\n` +
      `*Palabras propias:* ${customCount}\n` +
      `*Bienvenida:* ${welcome}`,
    warnLimitSet: (n) => `Límite de avisos establecido en *${n}*. Los usuarios serán auto-baneados tras ${n} avisos.`,
    antiSpamSet: (val) => `Anti-spam establecido en *${val}*.`,
    welcomeSet: (msg) => `Mensaje de bienvenida establecido: "${msg}"\nUsa {user} como marcador para el nuevo miembro.`,
    pong: '¡Pong!',
    status: (connected, uptime) =>
      '🤖 *Estado del Bot*\n\n' +
      `*Conexión:* ${connected ? '🟢 Conectado' : '🔴 Desconectado'}\n` +
      `*Tiempo activo:* ${uptime}`,
    helpPublic:
      '📋 *Comandos*\n\n' +
      '!ping - Probar si el bot está vivo\n' +
      '!status - Mostrar estado del bot\n' +
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
      '?addword <palabra> - Añadir palabra prohibida del grupo\n' +
      '?removeword <palabra> - Quitar palabra prohibida del grupo\n' +
      '?set-lang <código> - Cambiar idioma del bot para este grupo\n' +
      '?set-warnlimit <n> - Establecer límite de avisos\n' +
      '?set-antispam on/off - Activar/desactivar anti-spam\n' +
      '?set-welcome <msg> - Establecer mensaje de bienvenida ({user}=nombre)\n' +
      '?settings - Mostrar configuración del grupo\n' +
      '?help - Mostrar esta ayuda',
  },

  de: {
    name: 'Deutsch',
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
    muteInvalid: 'Ungültiges Format. Nutze: ?mute @user <Zahl> [s|m|d]\nBeispiel: ?mute @user 10 m',
    warnCount: (user, count, limit) => `Verwarnt: ${user}. Hat jetzt *${count}/${limit}* Warnungen.`,
    autoBanDm: (groupName, count, limit) => `Du wurdest automatisch aus *${groupName}* gebannt, weil du *${count}/${limit}* Warnungen erreicht hast.`,
    autoBanned: (user, count, limit) => `Auto-gebannt: @${user} hat *${count}/${limit}* Warnungen erreicht.`,
    spamMuteDm: (groupName, duration) => `Du wurdest in *${groupName}* für *${duration}* wegen Spam stummgeschaltet. Alle deine Nachrichten werden gelöscht.`,
    spamMuted: (user) => `Anti-Spam: @${user} für 5 Minuten stummgeschaltet.`,
    unbanned: (nameList) => `Entbannt: ${nameList}.`,
    warningsNone: (user) => `@${user} hat keine Warnungen.`,
    warningsList: (user, count, limit, entries) => `Warnungen für @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" zur gruppeneigenen Wortliste hinzugefügt.`,
    wordRemoved: (word) => `"${word}" aus der gruppeneigenen Wortliste entfernt.`,
    wordNotFound: (word) => `"${word}" ist nicht in der gruppeneigenen Wortliste.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Gruppeneinstellungen*\n\n' +
      `*Sprache:* ${langName} (${langCode})\n` +
      `*Warn-Limit:* ${warnLimit}\n` +
      `*Anti-Spam:* ${antiSpam}\n` +
      `*Gebannte:* ${banCount}\n` +
      `*Stummgeschaltete:* ${muteCount}\n` +
      `*Eigene Wörter:* ${customCount}\n` +
      `*Willkommen:* ${welcome}`,
    warnLimitSet: (n) => `Warn-Limit auf *${n}* gesetzt. Nutzer werden nach ${n} Warnungen automatisch gebannt.`,
    antiSpamSet: (val) => `Anti-Spam auf *${val}* gesetzt.`,
    welcomeSet: (msg) => `Willkommensnachricht gesetzt: "${msg}"\nNutze {user} als Platzhalter für das neue Mitglied.`,
    pong: 'Pong!',
    status: (connected, uptime) =>
      '🤖 *Bot-Status*\n\n' +
      `*Verbindung:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Betriebszeit:* ${uptime}`,
    helpPublic:
      '📋 *Befehle*\n\n' +
      '!ping - Testen ob der Bot läuft\n' +
      '!status - Bot-Status anzeigen\n' +
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
      '?addword <Wort> - Gruppen-eigenes Wort verbieten\n' +
      '?removeword <Wort> - Gruppen-eigenes Wort erlauben\n' +
      '?set-lang <Code> - Bot-Sprache für diese Gruppe setzen\n' +
      '?set-warnlimit <n> - Warn-Limit setzen\n' +
      '?set-antispam on/off - Anti-Spam ein/aus\n' +
      '?set-welcome <Nachricht> - Willkommensnachricht setzen ({user}=Name)\n' +
      '?settings - Gruppeneinstellungen anzeigen\n' +
      '?help - Diese Hilfe anzeigen',
  },

  fr: {
    name: 'Français',
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
    muteInvalid: 'Format invalide. Utilisez : ?mute @user <nombre> [s|m|d]\nExemple : ?mute @user 10 m',
    warnCount: (user, count, limit) => `Averti ${user}. A maintenant *${count}/${limit}* avertissements.`,
    autoBanDm: (groupName, count, limit) => `Vous avez été automatiquement banni de *${groupName}* pour avoir atteint *${count}/${limit}* avertissements.`,
    autoBanned: (user, count, limit) => `Auto-banni @${user} pour avoir atteint *${count}/${limit}* avertissements.`,
    spamMuteDm: (groupName, duration) => `Vous avez été automatiquement réduit au silence dans *${groupName}* pour *${duration}* à cause de spam. Tous vos messages seront supprimés.`,
    spamMuted: (user) => `Anti-spam : @${user} réduit au silence pour 5 minutes.`,
    unbanned: (nameList) => `Débanni ${nameList}.`,
    warningsNone: (user) => `@${user} n'a aucun avertissement.`,
    warningsList: (user, count, limit, entries) => `Avertissements de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" ajouté à la liste de mots interdits du groupe.`,
    wordRemoved: (word) => `"${word}" retiré de la liste de mots interdits du groupe.`,
    wordNotFound: (word) => `"${word}" n'est pas dans la liste de mots interdits du groupe.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Paramètres du Groupe*\n\n' +
      `*Langue :* ${langName} (${langCode})\n` +
      `*Limite avertissements :* ${warnLimit}\n` +
      `*Anti-spam :* ${antiSpam}\n` +
      `*Bannis :* ${banCount}\n` +
      `*Réduits au silence :* ${muteCount}\n` +
      `*Mots personnalisés :* ${customCount}\n` +
      `*Bienvenue :* ${welcome}`,
    warnLimitSet: (n) => `Limite d'avertissements définie à *${n}*. Les utilisateurs seront auto-bannis après ${n} avertissements.`,
    antiSpamSet: (val) => `Anti-spam défini sur *${val}*.`,
    welcomeSet: (msg) => `Message de bienvenue défini : "${msg}"\nUtilisez {user} comme marqueur pour le nouveau membre.`,
    pong: 'Pong !',
    status: (connected, uptime) =>
      '🤖 *Statut du Bot*\n\n' +
      `*Connexion :* ${connected ? '🟢 En ligne' : '🔴 Hors ligne'}\n` +
      `*Disponibilité :* ${uptime}`,
    helpPublic:
      '📋 *Commandes*\n\n' +
      '!ping - Tester si le bot est en vie\n' +
      '!status - Afficher le statut du bot\n' +
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
      '?addword <mot> - Ajouter un mot interdit au groupe\n' +
      '?removeword <mot> - Retirer un mot interdit du groupe\n' +
      '?set-lang <code> - Changer la langue du bot pour ce groupe\n' +
      '?set-warnlimit <n> - Définir la limite d\'avertissements\n' +
      '?set-antispam on/off - Activer/désactiver anti-spam\n' +
      '?set-welcome <msg> - Définir le message de bienvenue ({user}=nom)\n' +
      '?settings - Voir les paramètres du groupe\n' +
      '?help - Afficher cette aide',
  },

  pt: {
    name: 'Português',
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
    muteInvalid: 'Formato inválido. Use: ?mute @user <número> [s|m|d]\nExemplo: ?mute @user 10 m',
    warnCount: (user, count, limit) => `Avisado ${user}. Agora tem *${count}/${limit}* avisos.`,
    autoBanDm: (groupName, count, limit) => `Você foi banido automaticamente de *${groupName}* por atingir *${count}/${limit}* avisos.`,
    autoBanned: (user, count, limit) => `Auto-banido @${user} por atingir *${count}/${limit}* avisos.`,
    spamMuteDm: (groupName, duration) => `Você foi silenciado automaticamente em *${groupName}* por *${duration}* devido a spam. Todas as suas mensagens serão excluídas.`,
    spamMuted: (user) => `Anti-spam: silenciado @${user} por 5 minutos.`,
    unbanned: (nameList) => `Desbanido ${nameList}.`,
    warningsNone: (user) => `@${user} não tem avisos.`,
    warningsList: (user, count, limit, entries) => `Avisos de @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" adicionado à lista de palavras proibidas do grupo.`,
    wordRemoved: (word) => `"${word}" removido da lista de palavras proibidas do grupo.`,
    wordNotFound: (word) => `"${word}" não está na lista de palavras proibidas do grupo.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Configurações do Grupo*\n\n' +
      `*Idioma:* ${langName} (${langCode})\n` +
      `*Limite de avisos:* ${warnLimit}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Banidos:* ${banCount}\n` +
      `*Silenciados:* ${muteCount}\n` +
      `*Palavras próprias:* ${customCount}\n` +
      `*Boas-vindas:* ${welcome}`,
    warnLimitSet: (n) => `Limite de avisos definido como *${n}*. Usuários serão auto-banidos após ${n} avisos.`,
    antiSpamSet: (val) => `Anti-spam definido como *${val}*.`,
    welcomeSet: (msg) => `Mensagem de boas-vindas definida: "${msg}"\nUse {user} como marcador para o novo membro.`,
    pong: 'Pong!',
    status: (connected, uptime) =>
      '🤖 *Status do Bot*\n\n' +
      `*Conexão:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Ativo há:* ${uptime}`,
    helpPublic:
      '📋 *Comandos*\n\n' +
      '!ping - Testar se o bot está vivo\n' +
      '!status - Mostrar status do bot\n' +
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
      '?addword <palavra> - Adicionar palavra proibida do grupo\n' +
      '?removeword <palavra> - Remover palavra proibida do grupo\n' +
      '?set-lang <código> - Mudar idioma do bot para este grupo\n' +
      '?set-warnlimit <n> - Definir limite de avisos\n' +
      '?set-antispam on/off - Ativar/desativar anti-spam\n' +
      '?set-welcome <msg> - Definir mensagem de boas-vindas ({user}=nome)\n' +
      '?settings - Mostrar configurações do grupo\n' +
      '?help - Mostrar esta ajuda',
  },

  ru: {
    name: 'Русский',
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
    muteInvalid: 'Неверный формат. Используйте: ?mute @user <число> [s|m|d]\nПример: ?mute @user 10 m',
    warnCount: (user, count, limit) => `Предупреждён ${user}. Теперь *${count}/${limit}* предупреждений.`,
    autoBanDm: (groupName, count, limit) => `Вы были автоматически забанены в *${groupName}* за достижение *${count}/${limit}* предупреждений.`,
    autoBanned: (user, count, limit) => `Авто-забанен @${user} за достижение *${count}/${limit}* предупреждений.`,
    spamMuteDm: (groupName, duration) => `Вы были автоматически заглушены в *${groupName}* на *${duration}* из-за спама. Все ваши сообщения будут удаляться.`,
    spamMuted: (user) => `Анти-спам: заглушен @${user} на 5 минут.`,
    unbanned: (nameList) => `Разбанен ${nameList}.`,
    warningsNone: (user) => `@${user} не имеет предупреждений.`,
    warningsList: (user, count, limit, entries) => `Предупреждения @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" добавлено в список запрещённых слов группы.`,
    wordRemoved: (word) => `"${word}" удалено из списка запрещённых слов группы.`,
    wordNotFound: (word) => `"${word}" не найдено в списке запрещённых слов группы.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Настройки Группы*\n\n' +
      `*Язык:* ${langName} (${langCode})\n` +
      `*Лимит предупреждений:* ${warnLimit}\n` +
      `*Анти-спам:* ${antiSpam}\n` +
      `*Забанено:* ${banCount}\n` +
      `*Заглушено:* ${muteCount}\n` +
      `*Своих слов:* ${customCount}\n` +
      `*Приветствие:* ${welcome}`,
    warnLimitSet: (n) => `Лимит предупреждений установлен на *${n}*. Пользователи будут авто-забанены после ${n} предупреждений.`,
    antiSpamSet: (val) => `Анти-спам установлен на *${val}*.`,
    welcomeSet: (msg) => `Приветственное сообщение установлено: "${msg}"\nИспользуйте {user} как заполнитель для нового участника.`,
    pong: 'Понг!',
    status: (connected, uptime) =>
      '🤖 *Статус Бота*\n\n' +
      `*Подключение:* ${connected ? '🟢 Онлайн' : '🔴 Офлайн'}\n` +
      `*Аптайм:* ${uptime}`,
    helpPublic:
      '📋 *Команды*\n\n' +
      '!ping - Проверить работает ли бот\n' +
      '!status - Показать статус бота\n' +
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
      '?addword <слово> - Добавить запрещённое слово группы\n' +
      '?removeword <слово> - Удалить запрещённое слово группы\n' +
      '?set-lang <код> - Установить язык бота для этой группы\n' +
      '?set-warnlimit <n> - Установить лимит предупреждений\n' +
      '?set-antispam on/off - Вкл/выкл анти-спам\n' +
      '?set-welcome <сообщ> - Установить приветствие ({user}=имя)\n' +
      '?settings - Показать настройки группы\n' +
      '?help - Показать эту справку',
  },

  id: {
    name: 'Bahasa Indonesia',
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
    muteInvalid: 'Format tidak valid. Gunakan: ?mute @user <angka> [s|m|d]\nContoh: ?mute @user 10 m',
    warnCount: (user, count, limit) => `Diperingatkan ${user}. Sekarang memiliki *${count}/${limit}* peringatan.`,
    autoBanDm: (groupName, count, limit) => `Anda telah otomatis diblokir dari *${groupName}* karena mencapai *${count}/${limit}* peringatan.`,
    autoBanned: (user, count, limit) => `Auto-diblokir @${user} karena mencapai *${count}/${limit}* peringatan.`,
    spamMuteDm: (groupName, duration) => `Anda telah otomatis dibisukan di *${groupName}* selama *${duration}* karena spam. Semua pesan Anda akan dihapus.`,
    spamMuted: (user) => `Anti-spam: dibisukan @${user} selama 5 menit.`,
    unbanned: (nameList) => `Buka blokir ${nameList}.`,
    warningsNone: (user) => `@${user} tidak memiliki peringatan.`,
    warningsList: (user, count, limit, entries) => `Peringatan @${user} (*${count}/${limit}*):\n${entries}`,
    wordAdded: (word) => `"${word}" ditambahkan ke daftar kata terlarang grup.`,
    wordRemoved: (word) => `"${word}" dihapus dari daftar kata terlarang grup.`,
    wordNotFound: (word) => `"${word}" tidak ada di daftar kata terlarang grup.`,
    settingsDisplay: (langName, langCode, warnLimit, antiSpam, banCount, muteCount, customCount, welcome) =>
      '⚙ *Pengaturan Grup*\n\n' +
      `*Bahasa:* ${langName} (${langCode})\n` +
      `*Batas peringatan:* ${warnLimit}\n` +
      `*Anti-spam:* ${antiSpam}\n` +
      `*Diblokir:* ${banCount}\n` +
      `*Dibisukan:* ${muteCount}\n` +
      `*Kata khusus:* ${customCount}\n` +
      `*Sambutan:* ${welcome}`,
    warnLimitSet: (n) => `Batas peringatan diatur ke *${n}*. Pengguna akan otomatis diblokir setelah ${n} peringatan.`,
    antiSpamSet: (val) => `Anti-spam diatur ke *${val}*.`,
    welcomeSet: (msg) => `Pesan sambutan diatur: "${msg}"\nGunakan {user} sebagai pengganti untuk anggota baru.`,
    pong: 'Pong!',
    status: (connected, uptime) =>
      '🤖 *Status Bot*\n\n' +
      `*Koneksi:* ${connected ? '🟢 Online' : '🔴 Offline'}\n` +
      `*Waktu Aktif:* ${uptime}`,
    helpPublic:
      '📋 *Perintah*\n\n' +
      '!ping - Cek apakah bot hidup\n' +
      '!status - Tampilkan status bot\n' +
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
      '?addword <kata> - Tambah kata terlarang grup\n' +
      '?removeword <kata> - Hapus kata terlarang grup\n' +
      '?set-lang <kode> - Atur bahasa bot untuk grup ini\n' +
      '?set-warnlimit <n> - Atur batas peringatan\n' +
      '?set-antispam on/off - Aktifkan/nonaktifkan anti-spam\n' +
      '?set-welcome <pesan> - Atur pesan sambutan ({user}=nama)\n' +
      '?settings - Tampilkan pengaturan grup\n' +
      '?help - Tampilkan bantuan ini',
  },
};

const DEFAULT_LANG = 'en';

function t(lang, key) {
  const l = translations[lang] || translations[DEFAULT_LANG];
  return l?.[key] || translations[DEFAULT_LANG][key];
}

function supportedLangs() {
  return Object.entries(translations).map(([code, t]) => `${code} (${t.name})`).join(', ');
}

module.exports = { translations, DEFAULT_LANG, t, supportedLangs };
