# Multi-Provider AI Implementation

## Overview
The Lovable AI application now supports three AI providers:
- **Anthropic** (Claude Sonnet 4)
- **OpenAI** (GPT-4 Turbo)
- **Google Gemini** (Gemini 2.0 Flash)

Users can select their preferred provider and configure the corresponding API key.

## Implementation Details

### 1. Dependencies
Added two new packages:
- `openai`: ^6.39.0 - OpenAI API client
- `@google/generative-ai`: 0.24.1 - Google Gemini API client

Existing:
- `@anthropic-ai/sdk`: For Anthropic Claude

### 2. Server-Side Changes (`app/api/chat/route.ts`)

#### Provider Detection
```typescript
function getActiveProvider(): { provider: AIProvider; apiKey: string | null }
```
- Checks for available API keys in priority order: Anthropic → OpenAI → Gemini
- Returns the first configured provider and its API key
- Falls back gracefully if no keys are configured

#### Provider-Specific Implementations
Three async functions handle each provider:

**`callAnthropic(apiKey, messages)`**
- Uses Claude Sonnet 4 model
- Supports tool calling for code generation
- 8000 max tokens

**`callOpenAI(apiKey, messages)`**
- Uses GPT-4 Turbo model
- Standard chat completions API
- 8000 max tokens

**`callGemini(apiKey, messages)`**
- Uses Gemini 2.0 Flash model
- Converts messages to Gemini format (user/model roles)
- System instructions passed separately

#### Error Handling
- Unified error handling for all providers
- Clear error messages about missing API keys
- Provider-agnostic error responses

### 3. Client-Side Changes (`components/editor/ChatPanel.tsx`)

#### Type Definitions
```typescript
type AIProvider = "anthropic" | "openai" | "gemini";

const PROVIDER_CONFIG = {
  anthropic: { label: "Claude (Anthropic)", color: "bg-yellow-600 hover:bg-yellow-700" },
  openai: { label: "GPT-4 (OpenAI)", color: "bg-emerald-600 hover:bg-emerald-700" },
  gemini: { label: "Gemini (Google)", color: "bg-blue-600 hover:bg-blue-700" },
};
```

#### Provider Selection UI
- Dropdown button above the chat input
- Color-coded by provider (yellow/green/blue)
- Click to toggle provider menu
- Persists selection during session

#### Updated Message Sending
- Includes `provider` in API request payload
- API route uses selected provider if available

#### Enhanced Warning Message
- Lists all three API key options
- Shows environment variable names for each provider
- Instructions remain the same: add to `.env.local` and restart

### 4. Environment Variables

Users can configure one or more of these:

```bash
# .env.local

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI (GPT-4)
OPENAI_API_KEY=sk-...

# Google Gemini
GEMINI_API_KEY=...
```

The app will use whichever key is configured. If multiple keys exist, Anthropic takes priority.

## User Experience

### Setup
1. Choose which AI provider to use
2. Get API key from respective service:
   - Anthropic: https://console.anthropic.com
   - OpenAI: https://platform.openai.com
   - Google Gemini: https://makersuite.google.com
3. Add key to `.env.local`
4. Restart dev server
5. Select provider from UI dropdown
6. Start building

### No API Key Configured
- Provider selector visible and clickable
- Red warning banner shows all three key options
- Send button disabled with helpful message
- Instructions for adding keys

### With API Key Configured
- Provider selector active and functional
- User can switch between providers (if multiple keys exist)
- Full chat and code generation functionality

## API Key Priority
If multiple keys are configured:
1. ANTHROPIC_API_KEY (highest priority)
2. OPENAI_API_KEY
3. GEMINI_API_KEY (lowest priority)

## Testing

Build and run:
```bash
pnpm run build  # Verify compilation
pnpm run dev    # Start development server
```

Test scenarios:
1. **No keys configured**: Warning banner shown, send disabled
2. **One key configured**: Uses that provider
3. **Multiple keys configured**: Uses highest priority, selector allows switching
4. **Invalid key**: Clear error message about authentication

## Files Modified

1. **app/api/chat/route.ts**
   - Added OpenAI and Gemini imports
   - Added provider detection logic
   - Added provider-specific call functions
   - Enhanced error handling

2. **components/editor/ChatPanel.tsx**
   - Added provider selector UI
   - Added provider state management
   - Updated API request to include provider
   - Enhanced warning message with all three options
   - Color-coded provider buttons

3. **package.json**
   - Added `openai` dependency
   - Added `@google/generative-ai` dependency

## Architecture Notes

### Why This Approach?
- **Single API endpoint**: `/api/chat` handles all providers
- **Graceful degradation**: Works if any one key is configured
- **No window/SSR issues**: All AI clients created only after key validation
- **Clean separation**: Provider logic isolated in separate functions
- **User choice**: Can select preferred provider via UI

### Security
- API keys only read from environment variables
- Never exposed in client code
- Never logged or sent to third parties
- Always validated before use

### Performance
- No unnecessary API calls
- Provider detection happens once per request
- Efficient error handling and messaging
