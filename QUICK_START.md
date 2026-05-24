# Quick Start Guide - 5 Minutes to Running

## Prerequisites
- Node.js 18+ installed
- 5 minutes of your time

## Step 1: Get Your API Key (2 min)

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click "API Keys" 
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)
6. Keep it safe - don't share it

## Step 2: Setup (1 min)

```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and paste your key:
# ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

On macOS/Linux, use nano:
```bash
nano .env.local
# Paste: ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
# Press Ctrl+X, then Y, then Enter
```

## Step 3: Install & Run (2 min)

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Open browser to http://localhost:3000
```

## Step 4: Use It

1. **Chat Panel (Left)** - Type what you want to build
2. **Preview Panel (Center)** - See your React app
3. **Code Editor (Right)** - Edit code in Sandpack

Try: "Create a counter button"

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "API key not set" | Check `.env.local` has `sk-ant-` prefix |
| Server won't start | Run `pnpm install` again, then `pnpm run dev` |
| "Authentication failed" | Get a new key from console.anthropic.com |
| Page shows errors | Check browser console (F12) for error messages |

## Deploy to Vercel

```bash
# 1. Push to GitHub
git push

# 2. Go to vercel.com
# 3. Click "Add New" → "Project"
# 4. Import your GitHub repo
# 5. Add env var: ANTHROPIC_API_KEY = your-key-here
# 6. Click Deploy
```

## Need Help?

See the detailed guides:
- **API Key Setup**: `ANTHROPIC_API_KEY_SETUP.md`
- **Full Setup**: `README.md`
- **Vercel Deployment**: `DEPLOYMENT.md`

## What's Next?

Once running, try these prompts:
- "Create a todo list app"
- "Add dark mode toggle" 
- "Make a form with validation"
- "Build a calculator"

Happy coding! 🚀
