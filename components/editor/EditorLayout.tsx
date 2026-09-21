"use client";

import { ChatPanel } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Cloud, Rocket, Settings2 } from "lucide-react";

export function EditorLayout() {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-background via-background to-background/95 overflow-hidden relative">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-card/70 px-4 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">L</div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-foreground">Untitled project</span>
              <Badge variant="secondary" className="hidden sm:inline-flex gap-1 text-[10px] font-medium"><Cloud aria-hidden="true" /> Synced</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">Build workspace <span className="px-1">/</span> Draft</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 text-[11px] text-muted-foreground md:flex"><Check aria-hidden="true" /> Changes saved</div>
          <Button variant="ghost" size="icon" aria-label="Open project settings"><Settings2 aria-hidden="true" /></Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground shadow-sm"><Rocket aria-hidden="true" /> <span className="hidden sm:inline">Deploy</span></Button>
        </div>
      </header>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: "4s" }} />
      </div>

      <ResizablePanelGroup direction="horizontal" style={{ perspective: "2500px" }} className="relative z-10 min-h-0 flex-1">
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
