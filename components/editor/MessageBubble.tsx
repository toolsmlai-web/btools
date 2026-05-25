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
        "flex w-full gap-2 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed transition-all duration-300",
          isUser
            ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1"
            : "bg-card border border-border/50 hover:border-border/80 hover:bg-card/80 hover:shadow-md hover:-translate-y-0.5"
        )}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-code:bg-background prose-code:text-accent prose-a:text-primary hover:prose-a:text-primary/80">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
