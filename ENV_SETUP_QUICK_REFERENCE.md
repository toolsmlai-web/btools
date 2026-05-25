# Environment Variables - Quick Reference

## Local Development (.env.local)

Create a `.env.local` file in the project root:

```bash
# Option 1: Use Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE

# Option 2: Use OpenAI GPT-4
OPENAI_API_KEY=sk-YOUR_KEY_HERE

# Option 3: Use Google Gemini
GEMINI_API_KEY=YOUR_KEY_HERE

# Option 4: Use Multiple Providers (Uncomment as needed)
# ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
# OPENAI_API_KEY=sk-YOUR_KEY_HERE
# GEMINI_API_KEY=YOUR_KEY_HERE
```

Then restart the dev server: `pnpm run dev`

## Vercel Deployment (Production)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `v0-audit-and-deploy`
3. Go to "Settings" → "Environment Variables"
4. Add variables (without @ symbols):

| Name | Value | Type |
|------|-------|------|
| `ANTHROPIC_API_KEY` | `sk-ant-xxxxx...` | Encrypted (Sensitive) |
| `OPENAI_API_KEY` | `sk-xxxxx...` | Encrypted (Sensitive) |
| `GEMINI_API_KEY` | `xxxxx...` | Encrypted (Sensitive) |

5. Set environment scope: Production, Preview, Development (as needed)
6. Save and **Redeploy** for changes to take effect

## Getting API Keys

| Provider | URL | Key Format |
|----------|-----|-----------|
| Anthropic | https://console.anthropic.com/ | `sk-ant-...` |
| OpenAI | https://platform.openai.com/api-keys | `sk-...` |
| Google Gemini | https://makersuite.google.com/app/apikey | Custom format |

## Common Issues

### "Environment Variable references Secret which does not exist"
- **Cause**: Using `@secret-name` format instead of plain values
- **Fix**: Use the actual API key value, not a reference

Example:
```json
// ❌ Wrong (vercel.json)
"ANTHROPIC_API_KEY": "@anthropic-api-key"

// ✅ Correct (Vercel UI)
Add variable with name: ANTHROPIC_API_KEY
Add variable with value: sk-ant-xxxxxxxxxxxxx
```

### Changes not taking effect after adding env var
- **Cause**: Need to redeploy after env var changes
- **Fix**: 
  1. Go to "Deployments" tab
  2. Click latest deployment
  3. Click "Redeploy"

### Which provider is used?
- App tries providers in this order:
  1. Anthropic (if `ANTHROPIC_API_KEY` set)
  2. OpenAI (if `OPENAI_API_KEY` set)
  3. Gemini (if `GEMINI_API_KEY` set)
- You can override via UI dropdown to switch between configured providers

## Minimal Setup

**Minimum required:** Add ONE API key for your chosen provider.

```bash
# Local development
ANTHROPIC_API_KEY=sk-ant-xxxx

# OR

OPENAI_API_KEY=sk-xxxx

# OR

GEMINI_API_KEY=xxxx
```

The app will work with just one provider configured!
