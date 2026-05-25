# Lovable Clone AI - React Code Editor

An AI-powered React code editor built with Next.js supporting multiple AI providers. Chat with an intelligent assistant to generate, modify, and deploy React components in real-time.

## Features

- **Multi-Provider AI** - Support for Anthropic Claude, OpenAI GPT-4, and Google Gemini
- **Provider Selection** - Switch between AI providers with a dropdown selector
- **AI Chat Assistant** - Describe what you want to build, and AI generates React code
- **Live Preview** - Sandpack-powered preview of your React components  
- **Code Editor** - Edit code directly with syntax highlighting
- **Responsive Layout** - Resizable three-panel interface
- **Modern Dark UI** - Purple theme with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **AI Providers**: 
  - Anthropic Claude Sonnet 4
  - OpenAI GPT-4 Turbo
  - Google Gemini 2.0 Flash
- **Code Preview**: Sandpack
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Build**: Turbopack

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm)
- At least one API key from:
  - [Anthropic Console](https://console.anthropic.com/) (Claude)
  - [OpenAI Platform](https://platform.openai.com/) (GPT-4)
  - [Google AI Studio](https://makersuite.google.com) (Gemini)

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure API Keys** (Add at least one)
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add one or more API keys:
   ```
   # Anthropic (Claude)
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   
   # OpenAI (GPT-4)
   OPENAI_API_KEY=sk-xxxxxxxxxxxxx
   
   # Google Gemini
   GEMINI_API_KEY=xxxxxxxxxxxxx
   ```
   
   See [PROVIDER_SETUP.md](PROVIDER_SETUP.md) for detailed setup instructions for each provider.

3. **Run development server**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Usage

1. **Select AI Provider** - Click the provider dropdown button above the input:
   - **Claude (Anthropic)** - Yellow button
   - **GPT-4 (OpenAI)** - Green button
   - **Gemini (Google)** - Blue button

2. **Chat Panel (Left)** - Type requests to your selected AI:
   - "Create a todo list app"
   - "Add a dark mode toggle"
   - "Make the buttons larger"

3. **Preview Panel (Center)** - See your React app render in real-time

4. **Code Editor (Right)** - Edit code using the Sandpack editor

## Switching Providers

If you have multiple API keys configured:
1. Click the provider button above the chat input
2. Select a different provider from the menu
3. The app will use the selected provider for the next message
4. Your selection persists during the session

## Project Structure

```
/app
  /api/chat         - Multi-provider AI integration (Claude, GPT-4, Gemini)
  /layout.tsx       - Root layout
  /page.tsx         - Main page
  /globals.css      - Global styles

/components
  /editor           - Editor panels (Chat, Preview, Layout)
  /ui               - shadcn/ui components

/lib
  /store            - Zustand state management
  /prompts          - Claude system prompts and tools
```

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes | Claude API authentication |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Future database integration |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Future database integration |

## Troubleshooting

### "ANTHROPIC_API_KEY is not set"
- Verify `.env.local` exists with your **actual** Anthropic API key (starts with `sk-ant-`)
- Restart dev server after adding the key: `pkill -f "next dev"` then `pnpm run dev`
- Check API key is valid at [console.anthropic.com](https://console.anthropic.com/)
- See [ANTHROPIC_API_KEY_SETUP.md](ANTHROPIC_API_KEY_SETUP.md) for detailed setup instructions

### "Authentication failed"
- Confirm API key has sufficient credits
- Check for typos in the API key
- Try generating a new key

### Build errors
```bash
pnpm install  # Reinstall dependencies
pnpm run build  # Test build locally
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in settings
4. Deploy

Your app will be live at `your-project.vercel.app`

## Architecture Notes

### State Management
- **Zustand store** (`lib/store/editor-store.ts`): Manages messages, files, and preview code
- **Local state**: Input fields and loading states in components

### API Integration
- **Chat route** (`app/api/chat/route.ts`): Handles Claude API calls
- **Error handling**: User-friendly messages for common errors
- **Tool support**: Claude can edit files through tool use

### Limitations
- Code changes in Sandpack don't auto-trigger Claude regeneration
- Max 8000 tokens per request
- Requires active Anthropic API subscription

## Future Enhancements

- [ ] Real-time code sync with preview
- [ ] User authentication (Supabase)
- [ ] Save/load projects
- [ ] Export to GitHub
- [ ] Component templates
- [ ] Collaboration features

## License

MIT

## Support

- API issues: Check [Anthropic docs](https://docs.anthropic.com/)
- UI issues: Check [shadcn/ui docs](https://ui.shadcn.com/)
- Framework questions: [Next.js docs](https://nextjs.org/)
