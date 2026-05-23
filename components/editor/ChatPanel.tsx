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
    <div className="h-full flex flex-col bg-background border-r border-border/50">
      {/* Header */}
      <div className="px-5 py-6 border-b border-border/50 bg-card/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Lovable AI
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">Your intelligent coding companion</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pr-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <div className="mb-4 text-4xl opacity-50">✨</div>
              <p className="text-sm font-semibold mb-2">Ready to create</p>
              <p className="text-xs leading-relaxed mb-6 text-muted-foreground/80">
                Describe what you want to build and I'll help you create it.
              </p>
              <div className="bg-card/40 rounded-lg p-4 text-left border border-border/50">
                <p className="text-xs font-semibold mb-3 text-primary">Try asking:</p>
                <ul className="text-xs space-y-2 text-muted-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>"Create a todo list app"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>"Add dark mode toggle"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>"Make buttons larger"</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground py-4">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "0ms"}} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "150ms"}} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "300ms"}} />
              </div>
              <span className="text-xs">Generating code...</span>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-card/50 backdrop-blur">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what to build..."
            disabled={isLoading}
            className="flex-1 bg-input border-border/50 text-foreground placeholder:text-muted-foreground/50 text-sm"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
