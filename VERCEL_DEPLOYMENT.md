# Vercel Deployment Guide - Multi-Provider AI

This guide explains how to deploy the Lovable Clone AI app to Vercel with proper environment variable configuration.

## Quick Start

1. **Connect Your Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Select your repository: `toolsmlai-web/v0-audit-and-deploy`
   - Vercel will automatically detect Next.js settings

2. **Configure Environment Variables**
   - In the Vercel dashboard, go to "Environment Variables"
   - Add the API keys for the providers you want to use:

### Option A: Single Provider (Recommended for Testing)
Choose ONE provider and add its API key:

**For Anthropic Claude:**
- Name: `ANTHROPIC_API_KEY`
- Value: `sk-ant-xxxxxxxxxxxxx` (from https://console.anthropic.com/)
- Environments: Production, Preview, Development

**For OpenAI GPT-4:**
- Name: `OPENAI_API_KEY`
- Value: `sk-xxxxxxxxxxxxx` (from https://platform.openai.com/)
- Environments: Production, Preview, Development

**For Google Gemini:**
- Name: `GEMINI_API_KEY`
- Value: `xxxxxxxxxxxxx` (from https://makersuite.google.com/)
- Environments: Production, Preview, Development

### Option B: Multiple Providers
Add multiple API keys to enable provider selection:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
GEMINI_API_KEY=xxxxxxxxxxxxx
```

All are optional - the app will use whichever keys are available.

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your project
   - Once deployed, add the environment variables in project settings
   - Trigger a redeployment for changes to take effect

## Important Notes

- **No Required Secrets**: All API keys are optional. The app works with any combination.
- **Environment Variable Format**: Use plain text values, NOT secret references (e.g., `@anthropic-api-key`).
- **Redeployment Required**: When you update environment variables, trigger a redeployment.
- **Preview Environments**: Environment variables automatically apply to preview/PR deployments.

## Troubleshooting

### Error: "Environment Variable references Secret which does not exist"
**Solution**: Remove the `@` prefix. Use plain values:
- ❌ `ANTHROPIC_API_KEY=@anthropic-api-key`
- ✅ `ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx`

### Error: "Missing API Key"
**Solution**: Ensure at least one API key is set in Vercel environment variables.

### Still showing error after adding key?
**Solution**: 
1. Add the environment variable in Vercel dashboard
2. Click "Deployments"
3. Click the latest deployment
4. Click "Redeploy" button
5. Wait for new deployment to complete

## Production vs Preview

- **Production**: Uses environment variables set for "Production"
- **Preview** (PR deployments): Uses "Preview" environment variables
- **Development** (local): Uses `.env.local` file

Set variables for all three environments if you want the same behavior everywhere.

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use Vercel's environment variables** for production deployment
3. **Rotate API keys** regularly
4. **Limit API key scope** in provider dashboards:
   - Anthropic: Restrict to specific models/operations
   - OpenAI: Use API key with specific permissions
   - Google: Restrict to Gemini API only

## Next Steps

After deployment:
1. Visit your Vercel URL
2. The provider selector should appear above the chat input
3. Select your configured provider
4. Start building with AI!

For more information on Vercel environment variables, see:
https://vercel.com/docs/projects/environment-variables
