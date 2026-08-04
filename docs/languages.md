# Languages

The bot supports 8 languages. Language is set **per-group** and persists across restarts.

## Supported Languages

| Code | Language |
|------|---------|
| `en` | English *(default)* |
| `cs` | Čeština (Czech) |
| `es` | Español (Spanish) |
| `de` | Deutsch (German) |
| `fr` | Français (French) |
| `pt` | Português (Portuguese) |
| `ru` | Русский (Russian) |
| `id` | Bahasa Indonesia |

## Setting a Language

```bash
?set-lang cs
```

All bot messages in that group will use the selected language:
- Profanity warnings
- Admin command responses
- Auto-moderation messages (spam mute, auto-ban)
- Status and help output

## Unknown Languages

If an unsupported language code is used, the bot responds with an error listing the valid codes:

```
?set-lang jp
> Unknown language code "jp". Use one of: en, cs, es, de, fr, pt, ru, id.
```

## Fallback

If no language is set for a group, or if a key is missing from a translation, English is used as the fallback.

## Adding a New Language

1. Add a new block in `lang.js` following the existing pattern
2. Translate all keys: `profanityWarn`, `adminWarn`, `adminRequest`, `langSet`, `langUnknown`, `noMention`, `cantSelf`, `cantOwner`, `cantDm`, `kickFail`, `kickFailSimple`, `banFail`, `banFailSimple`, `banned`, `muted`, `muteDm`, `unmuted`, `muteInvalid`, `pong`, `status`, `helpPublic`, `helpAdmin`, `warnCount`, `autoBanDm`, `autoBanned`, `spamMuteDm`, `spamMuted`, `unbanned`, `warningsNone`, `warningsList`, `wordAdded`, `wordRemoved`, `wordNotFound`, `settingsDisplay`, `warnLimitSet`, `antiSpamSet`, `welcomeSet`
3. The language will be automatically available via `?set-lang` and `?help`
