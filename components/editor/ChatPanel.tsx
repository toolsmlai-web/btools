"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useEditorStore } from "@/lib/store/editor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, AlertCircle, ChevronDown } from "lucide-react";
import { MessageBubble } from "./MessageBubble";

type AIProvider = "anthropic" | "openai" | "gemini";

const PROVIDER_CONFIG = {
  anthropic: { label: "Claude (Anthropic)", color: "bg-yellow-600 hover:bg-yellow-700" },
  openai: { label: "GPT-4 (OpenAI)", color: "bg-emerald-600 hover:bg-emerald-700" },
  gemini: { label: "Gemini (Google)", color: "bg-blue-600 hover:bg-blue-700" },
};

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>("anthropic");
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, addMessage, setLoading, files, updateFile } = useEditorStore();



  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
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
          provider: selectedProvider,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Parse response based on provider
      let assistantMessage = "";
      const usedProvider = data.provider || selectedProvider;

      if (usedProvider === "anthropic") {
        // Anthropic response format
        assistantMessage = data.response.content.find(
          (c: any) => c.type === "text"
        )?.text || "I processed your request.";
        
        // Handle Anthropic tool calls (file edits)
        const toolCalls = data.response.content.filter((c: any) => c.type === "tool_use");
        for (const tool of toolCalls) {
          if (tool.name === "edit_file") {
            updateFile(tool.input.path, tool.input.content);
          }
        }
      } else if (usedProvider === "openai") {
        // OpenAI response format
        assistantMessage = data.response.choices?.[0]?.message?.content || "I processed your request.";
      } else if (usedProvider === "gemini") {
        // Gemini response format
        assistantMessage = data.response.text?.() || data.response.candidates?.[0]?.content?.parts?.[0]?.text || "I processed your request.";
      }
      
      addMessage({ role: "assistant", content: assistantMessage });
    } catch (error: any) {
      const errorMsg = error.message || "An unknown error occurred";
      let userFriendlyMessage = errorMsg;
      
      if (errorMsg.includes("API_KEY") && errorMsg.includes("not configured")) {
        setApiKeyMissing(true);
        userFriendlyMessage = "API key not configured. Please add your AI provider key (.env.local) and restart.";
      } else if (errorMsg.includes("Authentication") || errorMsg.includes("401")) {
        userFriendlyMessage = "Authentication failed. Please verify your API key is correct.";
      } else if (errorMsg.includes("rate_limit") || errorMsg.includes("429")) {
        userFriendlyMessage = "Rate limit reached. Please wait a moment and try again.";
      } else if (errorMsg.includes("timeout")) {
        userFriendlyMessage = "Request timed out. Please try again.";
      } else if (errorMsg.includes("JSON")) {
        userFriendlyMessage = "Invalid response format from API. Please try again.";
      }
      
      addMessage({
        role: "assistant",
        content: `⚠️ ${userFriendlyMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background border-r border-border">
      {/* Header with glassmorphism */}
      <div className="px-6 py-5 border-b border-border/50 glass-dark relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-9 h-9 flex-shrink-0 animate-glow-pulse" style={{ transformStyle: "preserve-3d" }}>
              <Image
                src="/logo.jpg"
                alt="Lovavle Logo"
                width={36}
                height={36}
                className="rounded-lg shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                style={{ filter: "drop-shadow(0 0 12px rgba(168, 85, 247, 0.4))" }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight">
                Lovavle
              </h1>
            </div>
          </div>
          <p className="text-xs text-muted-foreground ml-12 tracking-wide">AI Coding Companion</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pr-4">
          {apiKeyMissing && (
            <div className="glass-dark border border-red-500/50 rounded-xl p-5 mb-4 animate-slide-up">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-sm font-bold text-red-300 mb-2">Configuration Required</p>
                  <p className="text-xs text-red-200/80 leading-relaxed">
                    Add your API key to <code className="glass px-2 py-1 rounded text-xs font-mono">.env.local</code>:
                    <br className="mt-1.5" />
                    <span className="text-red-300 font-semibold">Anthropic:</span> <code className="glass px-2 py-0.5 rounded text-xs font-mono">ANTHROPIC_API_KEY=sk-ant-...</code>
                    <br className="mt-1" />
                    <span className="text-green-400 font-semibold">OpenAI:</span> <code className="glass px-2 py-0.5 rounded text-xs font-mono">OPENAI_API_KEY=sk-...</code>
                    <br className="mt-1" />
                    <span className="text-blue-400 font-semibold">Gemini:</span> <code className="glass px-2 py-0.5 rounded text-xs font-mono">GEMINI_API_KEY=...</code>
                    <br className="mt-1.5" />
                    Restart dev server for changes to take effect.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <div className="mb-4 text-4xl opacity-50">✨</div>
              <p className="text-sm font-semibold mb-2">Ready to create</p>
              <p className="text-xs leading-relaxed mb-6 text-muted-foreground/80">
                {apiKeyMissing 
                  ? "Configure an AI API key to get started. Select a provider above." 
                  : "Describe what you want to build and I'll help you create it."}
              </p>
              {!apiKeyMissing && (
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
              )}
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

      {/* Input Footer */}
      <form onSubmit={handleSubmit} className="p-5 border-t border-border/30 glass-dark">
        <div className="flex gap-2 mb-3">
          <div className="relative group">
            <Button
              type="button"
              onClick={() => setShowProviderMenu(!showProviderMenu)}
              className={`${PROVIDER_CONFIG[selectedProvider].color} text-white text-xs px-3.5 py-2 h-9 flex items-center gap-1.5 transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-lg group-hover:shadow-xl`}
              style={{
                perspective: "1000px",
              }}
            >
              {PROVIDER_CONFIG[selectedProvider].label.split("(")[0].trim()}
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
            {showProviderMenu && (
              <div className="absolute bottom-full mb-2 left-0 glass rounded-lg shadow-2xl z-50 min-w-max overflow-hidden animate-slide-up">
                {(Object.keys(PROVIDER_CONFIG) as AIProvider[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setSelectedProvider(p);
                      setShowProviderMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 backdrop-blur-sm ${
                      selectedProvider === p ? "bg-primary/30 text-primary font-semibold" : "text-foreground hover:bg-white/10"
                    }`}
                  >
                    {PROVIDER_CONFIG[p].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2.5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={apiKeyMissing ? "Configure API key to start..." : "Describe what you want to build..."}
            disabled={isLoading || apiKeyMissing}
            className="flex-1 glass text-foreground placeholder:text-muted-foreground/60 text-sm h-11 transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-40"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim() || apiKeyMissing}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-300 disabled:opacity-40 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl h-11 px-4"
            title={apiKeyMissing ? "Configure API key to enable chat" : ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
