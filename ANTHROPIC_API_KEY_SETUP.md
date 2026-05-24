# Anthropic API Key Setup Guide

## The Problem: Vercel Vault Token vs Anthropic API Key

When you add an environment variable in Vercel's dashboard, it creates a **Vercel Vault Token** (starting with `vck_`). However, the code needs an actual **Anthropic API Key** (starting with `sk-ant-`).

### Token Types

| Token Type | Prefix | Source | Used For |
|-----------|--------|--------|----------|
| **Anthropic API Key** | `sk-ant-` | https://console.anthropic.com | Authenticating with Claude API |
| **Vercel Vault Token** | `vck_` | Vercel Dashboard | Vercel's secure storage reference |

## Local Development Setup

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign in or create an account
3. Click "API Keys" in the sidebar
4. Create a new API key
5. Copy the key (it will start with `sk-ant-`)

### Step 2: Create .env.local

Create a `.env.local` file in the project root:

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-YOUR_ACTUAL_KEY_HERE
```

Replace `YOUR_ACTUAL_KEY_HERE` with your actual Anthropic API key from step 1.

### Step 3: Restart Dev Server

```bash
# Kill the current server
pkill -f "next dev"

# Start a new server
pnpm run dev
```

The dev server will now load the `.env.local` file and use your actual API key.

## Vercel Deployment Setup

For production deployment to Vercel:

1. **You've already done this:** Added `ANTHROPIC_API_KEY` to Vercel project settings
2. The `vercel.json` configuration handles this correctly:
   ```json
   {
     "env": {
       "ANTHROPIC_API_KEY": "@anthropic-api-key"
     }
   }
   ```
3. This tells Vercel to use the secret stored as `@anthropic-api-key` in your vault

When deployed, Vercel will automatically provide the actual API key to the application.

## Troubleshooting

### "ANTHROPIC_API_KEY is not set"

- Check that `.env.local` exists in the project root
- Verify it contains a valid Anthropic API key (starts with `sk-ant-`)
- Make sure the dev server was restarted AFTER adding the key

### "Authentication failed"

- The API key exists but is invalid or expired
- Get a new API key from [console.anthropic.com](https://console.anthropic.com/)
- Update `.env.local` with the new key

### Error: "Error occurred in async GET"

- Check the dev server terminal for error messages
- Verify the API key format (must start with `sk-ant-`)
- Check your Anthropic account has available credits

## File Structure Reference

```
/vercel/share/v0-project/
├── .env.local                    # ← LOCAL ONLY: Contains actual API key
├── .env.example                  # ← Template for what to add
├── vercel.json                   # ← Tells Vercel to use @anthropic-api-key
├── app/
│   └── api/chat/route.ts        # ← Uses process.env.ANTHROPIC_API_KEY
└── components/
    └── editor/ChatPanel.tsx     # ← Calls /api/chat endpoint
```

## Security Notes

- **Never commit** `.env.local` to Git (it's in `.gitignore`)
- **Never share** your Anthropic API key publicly
- Keep API keys in environment variables, not in code
- Use Vercel's vault for production secrets

## Next Steps

1. Get your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
2. Create `.env.local` with the key
3. Restart `pnpm run dev`
4. Test by sending a message in the chat

Your app should now work with Claude AI!
