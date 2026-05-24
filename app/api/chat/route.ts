import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";
import { TOOLS } from "@/lib/prompts/tools";

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log("[v0] API Route - Checking ANTHROPIC_API_KEY");
    console.log("[v0] API Key present:", !!apiKey);
    console.log("[v0] API Key length:", apiKey?.length || 0);
    console.log("[v0] All env keys:", Object.keys(process.env).filter(k => k.includes("ANTHROPIC")).join(", "));
    
    if (!apiKey) {
      console.error("[v0] ANTHROPIC_API_KEY not found in environment");
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY environment variable is not set. Please configure your API key in the project settings." },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const { messages, files } = await request.json();

    // Build context from files
    const contextMessages = buildContextMessages(messages, files);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: contextMessages,
      tools: TOOLS,
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Claude API Error:", error);
    
    // Provide more helpful error messages
    let errorMessage = error.message || "Failed to process request";
    if (error.message?.includes("authentication")) {
      errorMessage = "Authentication failed. Please check your ANTHROPIC_API_KEY.";
    } else if (error.message?.includes("rate_limit")) {
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

function buildContextMessages(messages: any[], files: Record<string, string>) {
  const contextMessage = {
    role: "user" as const,
    content: `Current project files:\n${Object.entries(files)
      .map(([path, content]) => `\n--- ${path} ---\n${content}`)
      .join("\n\n")}`,
  };

  return [contextMessage, ...messages];
}
