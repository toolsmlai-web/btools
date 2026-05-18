# 📚 Quick Reference Guide

## 🚀 Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Git
git add .
git commit -m "message"
git push origin main
```

## 🔧 File Locations

| What | Where |
|------|-------|
| System Prompt | `lib/prompts/system.ts` |
| Tools Config | `lib/prompts/tools.ts` |
| Chat Panel | `components/editor/ChatPanel.tsx` |
| Preview Panel | `components/editor/PreviewPanel.tsx` |
| State Store | `lib/store/editor-store.ts` |
| API Route | `app/api/chat/route.ts` |
| Styles | `app/globals.css` |

## 🎨 Customization Shortcuts

### Change AI Behavior
Edit `lib/prompts/system.ts`:
```typescript
export const SYSTEM_PROMPT = `
Your custom instructions here...
`;
```

### Add New Tool
Edit `lib/prompts/tools.ts`:
```typescript
{
  name: "new_tool",
  description: "What it does",
  input_schema: { /* params */ }
}
```

### Modify Default Code
Edit `lib/store/editor-store.ts`:
```typescript
const DEFAULT_APP_CODE = `
// Your default React app here
`;
```

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  /* etc... */
}
```

## 🔑 Environment Variables

```env
# Required
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Optional
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

## 📡 API Integration

### Call Claude API
```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({
    messages: [...],
    files: {...}
  })
});
```

### Response Format
```typescript
{
  response: {
    content: [
      { type: "text", text: "..." },
      { type: "tool_use", name: "...", input: {...} }
    ]
  }
}
```

## 🎯 Component Architecture

```
EditorLayout (Split panel)
├── ChatPanel (Left)
│   ├── MessageBubble (repeated)
│   └── Input + Button
└── PreviewPanel (Right)
    └── Sandpack (Live preview)
```

## 💾 State Management

```typescript
// Get state
const { messages, files } = useEditorStore();

// Update state
const { addMessage, updateFile } = useEditorStore();

// Use
addMessage({ role: "user", content: "Hello" });
updateFile("src/App.tsx", newCode);
```

## 🐛 Debugging

```bash
# Check logs
npm run dev
# Then check browser console (F12)

# API errors
# Check: app/api/chat/route.ts
# Add: console.log(error)

# Build errors
rm -rf .next
npm run build
```

## 🚀 Deployment

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Vercel
# Go to vercel.com → Import repo → Deploy

# 3. Add env vars in Vercel dashboard
```

## 📱 Mobile Testing

```bash
# Find your local IP
ipconfig (Windows) or ifconfig (Mac/Linux)

# Access from phone
http://YOUR_IP:3000
```

## 🎨 UI Components

```tsx
// Button
<Button onClick={...}>Click me</Button>

// Input
<Input value={...} onChange={...} placeholder="..." />

// ScrollArea
<ScrollArea className="h-full">
  <div>Content</div>
</ScrollArea>
```

## 🔒 Security Checklist

- [ ] Never commit `.env.local`
- [ ] Use environment variables for secrets
- [ ] Add rate limiting
- [ ] Validate user input
- [ ] Sanitize AI responses

## 💰 Cost Estimation

**Anthropic Claude Sonnet 4:**
- Input: $3 / million tokens
- Output: $15 / million tokens

**Average conversation:**
- ~1,000 input tokens
- ~500 output tokens
- Cost: ~$0.01 per conversation

**Monthly estimate:**
- 1,000 users × 10 conversations = 10,000 conversations
- Cost: ~$100/month

## 📞 Quick Help

**Chat not working?**
→ Check ANTHROPIC_API_KEY in .env.local

**Preview not loading?**
→ Check browser console for errors

**Build failing?**
→ Run `npm install` and try again

**API key invalid?**
→ Verify at console.anthropic.com

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sandpack](https://sandpack.codesandbox.io/)

## 💡 Pro Tips

1. **Use TypeScript** - Catch errors early
2. **Test on mobile** - Most Bangladesh users are mobile
3. **Cache responses** - Save API costs
4. **Add analytics** - Understand your users
5. **Iterate fast** - Deploy often

---

**Need more help?** Check README.md or DEPLOYMENT.md
