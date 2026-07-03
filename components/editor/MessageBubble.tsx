"use client";

import { Message } from "@/lib/store/editor-store";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 group animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed transition-all duration-400",
          isUser
            ? "glass-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-1 border border-primary/40"
            : "glass border border-secondary/30 hover:border-secondary/60 hover:shadow-lg hover:-translate-y-0.5"
        )}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
          backgroundImage: isUser 
            ? "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(200, 100, 255, 0.05) 0%, rgba(100, 200, 255, 0.03) 100%)"
        }}
      >
        {isUser ? (
          <p className="text-sm font-medium">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-code:glass prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-accent prose-a:text-secondary prose-a:font-semibold hover:prose-a:text-secondary/80 prose-headings:text-foreground prose-headings:font-bold">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
