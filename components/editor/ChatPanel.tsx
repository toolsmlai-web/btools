"use client";

import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/lib/store/editor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";

export function ChatPanel() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, addMessage, setLoading, files, updateFile } = useEditorStore();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage({ role: "user", content: userMessage });
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          files: Object.fromEntries(
            Object.entries(files).map(([path, file]) => [path, file.content])
          ),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Process Claude's response
      const assistantMessage = data.response.content.find(
        (c: any) => c.type === "text"
      )?.text || "I processed your request.";
      
      addMessage({ role: "assistant", content: assistantMessage });

      // Handle tool calls (file edits)
      const toolCalls = data.response.content.filter((c: any) => c.type === "tool_use");
      for (const tool of toolCalls) {
        if (tool.name === "edit_file") {
          updateFile(tool.input.path, tool.input.content);
        }
      }
    } catch (error: any) {
      addMessage({
        role: "assistant",
        content: `Error: ${error.message}. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background border-r">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Lovable Clone AI</h1>
        <p className="text-sm text-muted-foreground">Your AI coding assistant</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-lg font-semibold mb-2">Welcome! 👋</p>
              <p className="text-sm">Ask me to build or modify your React app.</p>
              <p className="text-xs mt-4">Examples:</p>
              <ul className="text-xs space-y-1 mt-2">
                <li>• Create a todo list app</li>
                <li>• Add a dark mode toggle</li>
                <li>• Make the button larger</li>
              </ul>
            </div>
          )}
          
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to build something..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
