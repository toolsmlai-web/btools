import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";
import { TOOLS } from "@/lib/prompts/tools";

type AIProvider = "anthropic" | "openai" | "gemini";

function getActiveProvider(): { provider: AIProvider; apiKey: string | null } {
  // Check which API key is available (in priority order)
  if (process.env.ANTHROPIC_API_KEY) {
    return { provider: "anthropic", apiKey: process.env.ANTHROPIC_API_KEY };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  }
  if (process.env.GEMINI_API_KEY) {
    return { provider: "gemini", apiKey: process.env.GEMINI_API_KEY };
  }
  return { provider: "anthropic", apiKey: null };
}

function getMissingKeyError(provider: AIProvider): string {
  const providerNames = {
    anthropic: "ANTHROPIC_API_KEY",
    openai: "OPENAI_API_KEY",
    gemini: "GEMINI_API_KEY",
  };
  return `${providerNames[provider]} is not configured. Please add it to your .env.local file and restart the server.`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, files, provider: requestedProvider } = await request.json();
    
    // Determine which provider to use
    const { provider, apiKey } = getActiveProvider();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: getMissingKeyError(provider) },
        { status: 500 }
      );
    }

    // Build context from files
    const contextMessages = buildContextMessages(messages, files);

    let response;

    if (provider === "anthropic") {
      response = await callAnthropic(apiKey, contextMessages);
    } else if (provider === "openai") {
      response = await callOpenAI(apiKey, contextMessages);
    } else if (provider === "gemini") {
      response = await callGemini(apiKey, contextMessages);
    }

    return NextResponse.json({ response, provider });
  } catch (error: any) {
    console.error("AI API Error:", error);
    
    let errorMessage = error.message || "Failed to process request";
    if (error.message?.includes("authentication") || error.message?.includes("401")) {
      errorMessage = "Authentication failed. Please verify your API key is correct.";
    } else if (error.message?.includes("rate_limit") || error.message?.includes("429")) {
      errorMessage = "Rate limit exceeded. Please try again in a moment.";
    } else if (error.message?.includes("timeout")) {
      errorMessage = "Request timed out. Please try again.";
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    );
  }
}

async function callAnthropic(apiKey: string, messages: any[]) {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const anthropic = new Anthropic({ apiKey });
  
  return anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages,
    tools: TOOLS,
  });
}

async function callOpenAI(apiKey: string, messages: any[]) {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({ apiKey });
  
  return openai.chat.completions.create({
    model: "gpt-4-turbo",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages,
  });
}

async function callGemini(apiKey: string, messages: any[]) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  return model.generateContent({
    contents: messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    systemInstruction: SYSTEM_PROMPT,
  });
}

function buildContextMessages(messages: any[], files: Record<string, string>) {
  const contextMessage = {
    role: "user" as const,
    content: `Current project files:\n${Object.entries(files)
      .map(([path, content]) => `\n--- ${path} ---\n${content}`)
      .join("\n\n")}`,
  };

  return [contextMessage, ...messages];
}
