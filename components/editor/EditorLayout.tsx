"use client";

import { ChatPanel } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function EditorLayout() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-background via-background to-background/95 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: "4s" }} />
      </div>

      <ResizablePanelGroup direction="horizontal" style={{ perspective: "2500px" }} className="relative z-10">
        <ResizablePanel 
          defaultSize={35} 
          minSize={25}
          className="transition-all duration-500 hover:shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <ChatPanel />
        </ResizablePanel>
        
        <ResizableHandle 
          withHandle 
          className="bg-gradient-to-b from-border/20 via-primary/10 to-border/20 hover:bg-gradient-to-b hover:from-primary/30 hover:via-primary/40 hover:to-primary/30 transition-all duration-500 hover:shadow-2xl group relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-12 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </ResizableHandle>
        
        <ResizablePanel 
          defaultSize={65} 
          minSize={35}
          className="transition-all duration-500 hover:shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="h-full w-full bg-gradient-to-br from-card/40 via-background/80 to-card/20 backdrop-blur-xl transition-all duration-500 border-l border-border/20">
            <PreviewPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
