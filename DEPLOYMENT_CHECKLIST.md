# Deployment Checklist

## Pre-Deployment (Local Testing)

- [x] App builds without errors: `pnpm run build`
- [x] Dev server runs successfully: `pnpm run dev`
- [x] Provider selector UI appears in chat
- [x] Graceful error handling for missing API keys
- [x] Environment variables are optional (no required secrets)

## Vercel Deployment Steps

### Step 1: Prepare Your Repository
- [x] Code committed to branch
- [x] `vercel.json` uses correct environment variable format (no @secret references)
- [x] `.env.example` shows all provider options

### Step 2: Connect to Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Select repository: `toolsmlai-web/v0-audit-and-deploy`
- [ ] Select branch: `main` (or your branch)
- [ ] Click "Import"

### Step 3: Configure Environment Variables
Choose your setup option:

#### Option A: Single Provider (Start Here)
- [ ] Go to "Environment Variables" section
- [ ] Add ONE of the following:
  
**Anthropic:**
```
Name: ANTHROPIC_API_KEY
Value: sk-ant-your-api-key
```

**OR OpenAI:**
```
Name: OPENAI_API_KEY
Value: sk-your-api-key
```

**OR Gemini:**
```
Name: GEMINI_API_KEY
Value: your-api-key
```

#### Option B: Multiple Providers
- [ ] Add all three (optional ones you don't have can be skipped):
  - ANTHROPIC_API_KEY
  - OPENAI_API_KEY
  - GEMINI_API_KEY

### Step 4: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for deployment to complete
- [ ] Check deployment status: green checkmark = success

### Step 5: Post-Deployment Verification
- [ ] Visit your Vercel URL
- [ ] Provider selector appears above chat input
- [ ] Can select between configured providers
- [ ] Chat input is enabled (if API key is configured)
- [ ] Error message shows if no API key added

## Troubleshooting Deployment Issues

### Issue: "Environment Variable references Secret which does not exist"
**Location:** Vercel deployment dialog shows red error
**Cause:** Using `@secret-name` format instead of plain values
**Fix:** 
1. Click "Environment Variables" in Vercel project settings
2. Ensure values are plain text, not `@references`
3. Example: Use `sk-ant-xxxxx` not `@anthropic-api-key`

### Issue: Changes not visible after env var update
**Cause:** Env var changes require redeployment
**Fix:**
1. Go to "Deployments" tab
2. Click the latest deployment
3. Click "Redeploy" button
4. Wait for new deployment to complete

### Issue: API key not working in production
**Cause:** Wrong key format or incorrect key copied
**Fix:**
1. Copy API key directly from provider console (don't modify)
2. Ensure full key is pasted (no truncation)
3. Try with a fresh API key from provider dashboard

### Issue: Provider selector not showing
**Cause:** No API keys configured or network issue
**Fix:**
1. Verify at least one API key is set in Vercel environment variables
2. Check browser console for errors (F12 → Console)
3. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)

## Monitoring After Deployment

- [ ] Check Vercel Analytics dashboard
- [ ] Monitor error logs in Vercel dashboard
- [ ] Test each provider's functionality
- [ ] Verify response times are acceptable
- [ ] Check for any 500 errors in logs

## Rollback Plan

If deployment has issues:
1. Go to "Deployments" in Vercel
2. Find previous successful deployment
3. Click the three dots (...) menu
4. Select "Promote to Production"
5. Your site will rollback to that version

## Documentation Files

Created for this deployment:
- `VERCEL_DEPLOYMENT.md` - Detailed setup guide
- `ENV_SETUP_QUICK_REFERENCE.md` - Quick reference card
- `DEPLOYMENT_CHECKLIST.md` - This file

## Support

For issues:
1. Check VERCEL_DEPLOYMENT.md troubleshooting section
2. Review Vercel documentation: https://vercel.com/docs
3. Check provider API documentation:
   - Anthropic: https://docs.anthropic.com/
   - OpenAI: https://platform.openai.com/docs/
   - Google: https://ai.google.dev/

## Success Criteria

Deployment is successful when:
✓ Vercel shows green checkmark on deployment
✓ App loads at your Vercel URL
✓ Provider selector appears in chat interface
✓ At least one provider is functional
✓ Error messages display gracefully when needed
