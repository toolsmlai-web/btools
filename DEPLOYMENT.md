# 🚀 Deployment Guide

Complete step-by-step guide to deploy your Lovable Clone to production.

## 📋 Prerequisites Checklist

- [ ] GitHub account
- [ ] Vercel account (free tier is fine)
- [ ] Anthropic API key
- [ ] Credit card (for Anthropic API - they offer free credits)

## 🔑 Step 1: Get Anthropic API Key

### 1.1 Sign Up for Anthropic Console

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Click "Sign Up" or "Get Started"
3. Complete registration with your email
4. Verify your email address

### 1.2 Add Billing Information

1. Navigate to "Billing" in the console
2. Click "Add Payment Method"
3. Enter your credit card details
4. Anthropic offers $5 in free credits to start

### 1.3 Create API Key

1. Go to "API Keys" section
2. Click "Create Key"
3. Give it a name (e.g., "Lovable Clone Production")
4. Copy the key immediately (starts with `sk-ant-`)
5. Store it securely - you won't see it again!

**Important**: Never commit this key to GitHub!

## 📦 Step 2: Prepare Your Repository

### 2.1 Initialize Git (if not already done)

```bash
cd lovable-clone
git init
git add .
git commit -m "Initial commit: Lovable Clone"
```

### 2.2 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `lovable-clone` (or your preferred name)
3. Make it Private (recommended) or Public
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/lovable-clone.git
git branch -M main
git push -u origin main
```

## 🚀 Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com/)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### 3.2 Import Your Project

1. Click "Add New..." → "Project"
2. Find your `lovable-clone` repository
3. Click "Import"

### 3.3 Configure Project Settings

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (default)

**Build Command**: `npm run build` (default)

**Output Directory**: `.next` (default)

### 3.4 Add Environment Variables

In the "Environment Variables" section, add:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your API key (sk-ant-...) |

**Optional**: If using Supabase:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### 3.5 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build
3. Your app will be live at `your-project.vercel.app`

## 🎉 Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Try sending a message in the chat
3. Verify the AI responds correctly
4. Check the preview panel updates

## 🌐 Step 5: Add Custom Domain (Optional)

### 5.1 Purchase Domain

Buy a domain from:
- Namecheap
- GoDaddy
- Domain.com

Bangladesh-friendly: `yourapp.com.bd`

### 5.2 Configure in Vercel

1. Go to your project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `myapp.com`)
4. Follow the DNS configuration instructions
5. Add the provided DNS records to your domain registrar

### 5.3 DNS Records Example

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

```
Type: A
Name: @
Value: 76.76.21.21
```

## 🔄 Step 6: Continuous Deployment

Every time you push to `main` branch, Vercel automatically deploys!

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel deploys automatically in ~2 minutes
```

## 📊 Step 7: Monitor Your App

### 7.1 Vercel Analytics

1. Go to your project dashboard
2. Click "Analytics" tab
3. View:
   - Page views
   - Unique visitors
   - Response times

### 7.2 Anthropic Usage Dashboard

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Click "Usage"
3. Monitor:
   - API calls
   - Token usage
   - Costs

## 💰 Step 8: Cost Management

### Expected Costs (Monthly)

**Vercel**:
- Free tier: $0
- Pro tier: $20/month (if you need more)

**Anthropic Claude API**:
- Claude Sonnet 4: ~$3 per million input tokens
- Estimated: $10-50/month for small app
- $50-200/month for medium traffic

### Cost Optimization Tips

1. **Cache responses** for common queries
2. **Set rate limits** to prevent abuse
3. **Use cheaper models** for simple tasks
4. **Implement usage tracking** per user

## 🔒 Step 9: Security Best Practices

### 9.1 Environment Variables

✅ Never commit `.env` files
✅ Use Vercel's environment variables
✅ Rotate API keys regularly

### 9.2 Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});
```

### 9.3 API Key Protection

Never expose your Anthropic API key in:
- Client-side code
- Git commits
- Public logs
- Error messages

## 🐛 Troubleshooting

### Build Fails

**Error**: `Module not found`
**Solution**: 
```bash
npm install
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### API Key Not Working

**Error**: `401 Unauthorized`
**Solutions**:
1. Check if key is correct in Vercel
2. Ensure key starts with `sk-ant-`
3. Verify billing is active on Anthropic

### Preview Not Loading

**Error**: Sandpack timeout
**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Clear browser cache

### Out of Memory

**Error**: `JavaScript heap out of memory`
**Solution**: Upgrade Vercel plan or optimize bundle size

## 📈 Step 10: Scale Your App

### 10.1 Add Caching

Use Redis or Vercel KV:

```typescript
import { kv } from "@vercel/kv";

// Cache AI responses
await kv.set(`response:${hash}`, response, { ex: 3600 });
```

### 10.2 Add Analytics

```bash
npm install @vercel/analytics
```

### 10.3 Implement User Authentication

Use Supabase Auth or NextAuth.js

### 10.4 Add Database

Store user projects in Supabase:

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT,
  files JSONB,
  created_at TIMESTAMP
);
```

## 🎯 Bangladesh Market Specific

### Payment Integration

**bKash Integration**:
1. Apply for bKash merchant account
2. Get API credentials
3. Implement payment flow

**Nagad Integration**:
1. Register as Nagad merchant
2. Integrate payment gateway
3. Add webhook handlers

### Mobile Optimization

Ensure app works on:
- Low-end Android devices
- Slow 3G connections
- Small screens (320px width)

## ✅ Launch Checklist

- [ ] App deployed to Vercel
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Environment variables set
- [ ] API costs monitored
- [ ] Rate limiting enabled
- [ ] Error tracking setup (Sentry)
- [ ] Analytics enabled
- [ ] Mobile testing completed
- [ ] SEO optimized
- [ ] Social media cards configured

## 🚀 You're Live!

Congratulations! Your Lovable Clone is now live and ready to serve users in Bangladesh and beyond!

### Share Your App

- Tweet about it
- Post on Facebook
- Share in developer groups
- Add to Product Hunt

---

Need help? Open an issue on GitHub or contact support.
