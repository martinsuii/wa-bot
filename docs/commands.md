# Commands

## Public Commands

These work for anyone, in both groups and DMs.

| Command | Description | Example |
|---------|-------------|---------|
| `!ping` | Bot responds with "Pong!" | `!ping` |
| `!status` | Shows connection status and uptime | `!status` |
| `!help` | Shows public command list | `!help` |

## Admin Commands

These require the bot to have admin privileges in the group. All use the `?` prefix and require @mentioning the target user.

### Moderation

| Command | Description | Example |
|---------|-------------|---------|
| `?warn @user [reason]` | Warn user via DM, increments warning count | `?warn @user spamming links` |
| `?warnings @user` | Show warning history for the user | `?warnings @user` |
| `?kick @user` | Remove user from the group | `?kick @user` |
| `?ban @user` | Remove user and prevent rejoin | `?ban @user` |
| `?unban @user` | Remove ban, allowing rejoin | `?unban @user` |

### Mute

| Command | Description | Example |
|---------|-------------|---------|
| `?mute @user 5 m` | Auto-delete user's messages for 5 minutes | `?mute @user 30 s` |
| `?mute @user 30 s` | Mute for 30 seconds | `?mute @user 1 d` |
| `?mute @user 1 d` | Mute for 1 day | `?mute @user 1 d` |
| `?unmute @user` | Remove mute | `?unmute @user` |

Default unit is minutes if no `s`/`m`/`d` suffix is provided.

### Custom Badwords

| Command | Description | Example |
|---------|-------------|---------|
| `?addword <word>` | Add a group-specific banned word | `?addword spoiler` |
| `?removeword <word>` | Remove a group-specific banned word | `?removeword spoiler` |

Custom words are checked alongside the global profanity list.

### Configuration

| Command | Description | Example |
|---------|-------------|---------|
| `?set-lang <code>` | Set bot language for this group | `?set-lang cs` |
| `?set-warnlimit <n>` | Warnings before auto-ban (default: 3) | `?set-warnlimit 5` |
| `?set-antispam on\|off` | Toggle anti-spam feature | `?set-antispam off` |
| `?set-welcome <msg>` | Set welcome message for new members | `?set-welcome Welcome {user}!` |
| `?settings` | Show current group configuration | `?settings` |
| `?help` | Show admin command list with available languages | `?help` |

### Welcome Message

Use `{user}` as a placeholder for the new member's name:

```
?set-welcome Hello {user}, welcome to the group! Please read the rules.
```

To remove the welcome message, send `?set-welcome` with no text.

## Auto-Warning

When the bot detects profanity in a message, it automatically:
1. Deletes the message
2. DMs the sender a warning
3. Records the warning

If a user reaches the warn limit (default 3), they are auto-banned.
