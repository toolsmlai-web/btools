# Lovable Clone AI - React Code Editor

An AI-powered React code editor built with Next.js and Claude AI. Chat with an intelligent assistant to generate, modify, and deploy React components in real-time.

## Features

- **AI Chat Assistant** - Describe what you want to build, and Claude generates React code
- **Live Preview** - Sandpack-powered preview of your React components  
- **Code Editor** - Edit code directly with syntax highlighting
- **Responsive Layout** - Resizable three-panel interface
- **Modern Dark UI** - Purple theme with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **AI**: Anthropic Claude API (Sonnet 4)
- **Code Preview**: Sandpack
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Build**: Turbopack

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm)
- Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure API key**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   ```

3. **Run development server**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Usage

1. **Chat Panel (Left)** - Type requests to Claude:
   - "Create a todo list app"
   - "Add a dark mode toggle"
   - "Make the buttons larger"

2. **Preview Panel (Center)** - See your React app render in real-time

3. **Code Editor (Right)** - Edit code using the Sandpack editor

## Project Structure

```
/app
  /api/chat         - Claude API integration
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
- Verify `.env.local` exists with your API key
- Restart dev server after adding the key
- Check API key is valid at [console.anthropic.com](https://console.anthropic.com/)

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
