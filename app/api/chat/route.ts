import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";
import { TOOLS } from "@/lib/prompts/tools";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
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
