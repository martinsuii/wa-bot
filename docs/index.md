# WA Mod Bot — Documentation

A WhatsApp moderation bot built with [Baileys](https://github.com/WhiskeySockets/Baileys). Detects profanity, warns users, and provides admin tools.

## Quick Start

```bash
git clone https://github.com/martinsuii/wa-bot.git
cd wa-bot
npm install
npm start
```

On first run, scan the QR code in your terminal using **WhatsApp → Linked Devices → Link a Device**. Credentials are saved to `./auth/` and reused on subsequent starts.

## How It Works

1. The bot connects to WhatsApp Web via Baileys
2. It listens for messages in all groups it's a member of
3. When it has admin privileges, it scans messages for profanity
4. Offending messages are deleted and the sender receives a DM warning
5. Admin commands (`?` prefix) allow moderators to warn, kick, ban, mute, and configure the bot

## Core Features

- **Profanity detection** — 20+ languages, leet-speak normalization, suffix/prefix evasion handling
- **Warning system** — Tracked per user, auto-bans after reaching the limit
- **Anti-spam** — 5 messages in 5 seconds triggers auto-mute
- **Ban enforcement** — Auto-kicks banned users if re-added, rejects join requests
- **Multi-language** — 8 languages, per-group setting
- **Custom badwords** — Group-specific word lists
- **Welcome messages** — Configurable, sent when members join
- **Persistence** — All data survives restarts via JSON files in `./data/`

## Pages

- [Commands](./commands.md) — Full command reference
- [Languages](./languages.md) — Supported languages and usage
- [Configuration](./configuration.md) — Data files and settings

## Requirements

- Node.js 18+
- A WhatsApp account (used as the bot's number)
