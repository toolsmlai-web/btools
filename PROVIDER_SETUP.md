# Multi-Provider Setup Guide

Choose one or more AI providers to use with Lovable AI.

## Option 1: Anthropic (Claude)

### Get Your API Key
1. Visit https://console.anthropic.com
2. Sign in or create an account
3. Go to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### Add to Environment
Create or update `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-[your-key-here]
```

### Select in App
- The app will automatically detect your Anthropic key
- Provider dropdown defaults to "Claude (Anthropic)"
- Yellow button color

---

## Option 2: OpenAI (GPT-4)

### Get Your API Key
1. Visit https://platform.openai.com
2. Sign in or create an account
3. Go to **API Keys** in settings
4. Create a new API key
5. Copy the key (starts with `sk-`)

### Add to Environment
Update `.env.local`:
```bash
OPENAI_API_KEY=sk-[your-key-here]
```

### Select in App
- Click the provider dropdown
- Select "GPT-4 (OpenAI)"
- Green button color
- Model: gpt-4-turbo with 8000 max tokens

---

## Option 3: Google Gemini

### Get Your API Key
1. Visit https://makersuite.google.com
2. Click "Create API key"
3. Choose or create a Google Cloud project
4. Copy your API key

### Add to Environment
Update `.env.local`:
```bash
GEMINI_API_KEY=[your-key-here]
```

### Select in App
- Click the provider dropdown
- Select "Gemini (Google)"
- Blue button color
- Model: gemini-2.0-flash with no explicit token limit

---

## Using Multiple Providers

You can configure multiple API keys in `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
```

The app will:
1. Detect all configured keys
2. Show provider dropdown as active
3. Allow you to switch between providers
4. Remember your selection during the session

### Priority Order
If you don't select, the app uses this priority:
1. Anthropic (Claude)
2. OpenAI (GPT-4)
3. Gemini

---

## Troubleshooting

### "API key not configured" warning shown
- Check you've added the correct environment variable
- Verify the API key is correct in `.env.local`
- Restart the dev server: `pnpm run dev`
- Make sure the key isn't expired or revoked

### "Authentication failed" error
- Your API key is invalid or expired
- Double-check the key in `.env.local`
- Try generating a new key from your provider's dashboard
- Make sure the account has API access enabled (may require paid plan)

### Provider button is disabled
- No API keys configured
- Add at least one key to `.env.local`
- Restart the dev server

### Can't switch providers
- Only one API key configured
- Add additional keys to enable switching
- Or remove a key to make another the active provider

---

## After Setup

1. **Restart Dev Server**
   ```bash
   # Kill the current server (Ctrl+C in terminal)
   # Then restart:
   pnpm run dev
   ```

2. **Refresh Browser**
   - Go to http://localhost:3000
   - The warning banner should disappear
   - Provider selector will be active

3. **Start Building**
   - Type a prompt like "Create a todo list app"
   - Click Send
   - Watch your code get generated!

---

## Switching Providers During Development

You can change providers without restarting:

1. Add a new API key to `.env.local`
2. Restart dev server (so the new key is loaded)
3. Use the provider dropdown to switch
4. No need to refresh the browser

---

## Best Practices

- **Keep keys secret**: Never commit `.env.local` to git
- **Don't share keys**: Each key has access to your account
- **Rotate periodically**: Delete and regenerate old keys
- **Monitor usage**: Check your provider's dashboard for unexpected activity
- **Use paid plans**: Free tiers have strict rate limits

---

## Need Help?

- **Anthropic Docs**: https://docs.anthropic.com
- **OpenAI Docs**: https://platform.openai.com/docs
- **Gemini Docs**: https://ai.google.dev

Each provider has comprehensive documentation for troubleshooting API issues.
