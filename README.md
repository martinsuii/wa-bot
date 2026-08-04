# WA Mod Bot

A WhatsApp moderation bot built with [Baileys](https://github.com/WhiskeySockets/Baileys). Detects and deletes profanity in groups, warns users via DM, and provides admin tools for group management.

## Features

- **Profanity filtering** — Auto-deletes messages containing bad words in 20+ languages, with suffix/prefix evasion detection and leet-speak normalization
- **Custom badwords** — Per-group word lists via `?addword`/`?removeword`
- **Warnings system** — Tracks warnings per user, auto-bans after reaching the limit (configurable)
- **Anti-spam** — Auto-mutes users sending 5+ messages in 5 seconds
- **Admin commands** — Warn, kick, ban, unban, mute, unmute via @mentions
- **Ban enforcement** — Rejects rejoin attempts from banned users
- **Multi-language** — 8 languages supported (per-group setting)
- **Welcome messages** — Configurable welcome text for new members
- **Persistence** — All settings, bans, mutes, warnings survive restarts

## Installation

```bash
git clone https://github.com/martinsuii/wa-bot.git
cd wa-bot
npm install
npm start
```

On first run, scan the QR code with WhatsApp (Linked Devices) to pair. Credentials persist in `./auth/` for subsequent runs.

## Commands

### Public (anyone)
| Command | Description |
|---------|-------------|
| `!ping` | Test if the bot is alive |
| `!status` | Show connection status and uptime |
| `!help` | Show public commands |

### Admin (bot must be admin, `?` prefix)
| Command | Description |
|---------|-------------|
| `?warn @user [reason]` | Send a warning DM to the user |
| `?warnings @user` | Show warning history for the user |
| `?kick @user` | Remove the user from the group |
| `?ban @user` | Ban the user (auto-reject rejoin) |
| `?unban @user` | Remove the ban on the user |
| `?mute @user <time> [s\|m\|d]` | Auto-delete user's messages for duration |
| `?unmute @user` | Remove the mute |
| `?addword <word>` | Add a group-specific badword |
| `?removeword <word>` | Remove a group-specific badword |
| `?set-lang <code>` | Set bot language for this group |
| `?set-warnlimit <n>` | Set warning limit before auto-ban (default: 3) |
| `?set-antispam on\|off` | Toggle anti-spam |
| `?set-welcome <msg>` | Set welcome message (`{user}` = new member's name) |
| `?settings` | Show group configuration |
| `?help` | Show admin commands with available languages |

## Supported Languages

`en` English · `cs` Čeština · `es` Español · `de` Deutsch · `fr` Français · `pt` Português · `ru` Русский · `id` Bahasa Indonesia

## Data Files

All data stored in `./data/`:
- `banned.json` — Banned users per group
- `mutes.json` — Active mutes
- `warnings.json` — Warning history
- `custom_words.json` — Per-group custom badwords
- `settings.json` — Group settings (warn limit, anti-spam, welcome)
- `langs.json` — Group language preferences

## License

MIT
