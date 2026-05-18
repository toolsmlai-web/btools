# Lovable Clone - AI Code Editor

> 🚀 AI-powered code editor optimized for the Bangladesh market. Built with Next.js, Claude AI, and Sandpack.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- 🤖 **AI-Powered Code Generation** - Uses Claude Sonnet 4 for intelligent code creation
- 🔄 **Real-Time Preview** - See changes instantly with Sandpack integration
- 💬 **Interactive Chat Interface** - Natural language code editing
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI
- 📱 **Mobile-First** - Optimized for Bangladesh's mobile-heavy market
- 🌐 **Bilingual Ready** - Easy to add Bengali/English support
- 💳 **Payment Integration Ready** - Setup for bKash, Nagad integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **AI**: Anthropic Claude API (Sonnet 4)
- **Preview**: Sandpack (CodeSandbox)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Database**: Supabase (optional)
- **Hosting**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/))
- A Vercel account (for deployment)
- (Optional) Supabase account for database features

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/lovable-clone.git
cd lovable-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxx
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
lovable-clone/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/         # Claude AI endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── editor/           # Editor-specific components
│   │   ├── ChatPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── MessageBubble.tsx
│   │   └── EditorLayout.tsx
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── prompts/          # AI prompts configuration
│   │   ├── system.ts
│   │   └── tools.ts
│   ├── store/            # State management
│   │   └── editor-store.ts
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🎨 Customization

### Modify System Prompt

Edit `lib/prompts/system.ts` to customize Claude's behavior:

```typescript
export const SYSTEM_PROMPT = `
  You are an AI code editor...
  // Add your custom instructions here
`;
```

### Add New Tools

Extend `lib/prompts/tools.ts` to add new capabilities:

```typescript
{
  name: "your_tool",
  description: "What it does",
  input_schema: { /* ... */ }
}
```

### Customize Default Template

Edit the `DEFAULT_APP_CODE` in `lib/store/editor-store.ts`.

## 🌍 Bangladesh Market Features

### Add Bengali Language Support

1. Install i18n:
```bash
npm install next-intl
```

2. Create translations in `messages/bn.json` and `messages/en.json`

3. Update system prompt to support Bengali instructions

### Integrate Local Payments

```typescript
// lib/payment/bkash.ts
export async function processBkashPayment(amount: number) {
  // bKash integration logic
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project"

4. Import your GitHub repository

5. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Click "Deploy"

Your app will be live at `your-project.vercel.app`

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 💰 Monetization Ideas

1. **Freemium Model**
   - Free: 50 messages/month
   - Pro ($9/month): Unlimited messages
   - Enterprise ($49/month): White-label, API access

2. **Pay-per-Use**
   - Integrate bKash/Nagad
   - Charge per AI generation

3. **Templates Marketplace**
   - Sell premium templates
   - Commission on template sales

## 🔧 Advanced Configuration

### Enable Supabase Authentication

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Add Image Generation

Install Replicate:
```bash
npm install replicate
```

Add to tools:
```typescript
{
  name: "generate_image",
  description: "Generate images with AI",
  // ...
}
```

## 📊 Performance Optimization

1. **Enable Edge Runtime** for API routes
2. **Use Next.js Image Optimization**
3. **Implement caching** for AI responses
4. **Add rate limiting** to prevent abuse

## 🐛 Troubleshooting

### API Key Issues
- Verify your Anthropic API key is correct
- Check if you have sufficient credits

### Sandpack Not Loading
- Clear browser cache
- Check console for errors
- Verify internet connection

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude AI API key | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Optional |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Optional |
| `NEXT_PUBLIC_APP_URL` | Your app URL | No |

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- Built with inspiration from [Lovable.dev](https://lovable.dev)
- System prompts from [x1xhlol/system-prompts](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
- UI components from [shadcn/ui](https://ui.shadcn.com)

## 📧 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

## 🗺️ Roadmap

- [ ] Bengali language support
- [ ] bKash/Nagad payment integration
- [ ] Template marketplace
- [ ] Collaborative editing
- [ ] Mobile app (React Native)
- [ ] VS Code extension
- [ ] API access for developers

---

**Built with ❤️ for Bangladesh** 🇧🇩
