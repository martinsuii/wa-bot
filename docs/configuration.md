# Configuration

## Data Files

All persistent data is stored as JSON in `./data/`. Each file is auto-created on first use.

| File | Purpose | Format |
|------|---------|--------|
| `langs.json` | Group language preferences | `{ "gJid": "cs" }` |
| `banned.json` | Banned users per group | `{ "gJid": ["userJid"] }` |
| `mutes.json` | Active mutes with expiry | `{ "gJid": { "userJid": 1234567890 } }` |
| `warnings.json` | Warning history | `{ "gJid": { "userJid": [{ "reason": "...", "by": "bot", "time": 1234567890 }] } }` |
| `custom_words.json` | Per-group custom badwords | `{ "gJid": ["word1", "word2"] }` |
| `settings.json` | Group settings | `{ "gJid": { "warnLimit": 3, "antiSpam": true, "welcome": "Hello!" } }` |

## Auth Directory

`./auth/` contains WhatsApp session credentials. **Do not share or commit this directory.**

To re-pair the bot, delete this folder and restart.

## Defaults

| Setting | Default |
|---------|---------|
| Language | `en` (English) |
| Warn limit | `3` |
| Anti-spam | `on` |
| Welcome message | *(none)* |
| Admin cache TTL | 60 seconds |
| Non-admin notification interval | 60 seconds |
| Spam window | 5 seconds |
| Spam threshold | 5 messages |
| Spam mute duration | 5 minutes |

## Environment

- Node.js 18+
- No API keys or environment variables required
- Logging via pino-pretty (colored, human-readable output)

## File Structure

```
wa-mod-bot/
├── index.js          # Main bot logic
├── badwords.js       # Global profanity list + detection
├── lang.js           # Translations (8 languages)
├── package.json
├── README.md
├── .gitignore
├── auth/             # WhatsApp session (auto-generated)
├── data/             # Persistent data (auto-generated)
│   ├── banned.json
│   ├── langs.json
│   ├── mutes.json
│   ├── warnings.json
│   ├── custom_words.json
│   └── settings.json
├── node_modules/
└── docs/             # Documentation
    ├── index.md
    ├── commands.md
    ├── languages.md
    └── configuration.md
```
