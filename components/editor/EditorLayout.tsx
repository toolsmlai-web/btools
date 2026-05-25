"use client";

import { ChatPanel } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function EditorLayout() {
  return (
    <div className="h-full w-full bg-background overflow-hidden">
      <ResizablePanelGroup direction="horizontal" style={{ perspective: "2000px" }}>
        <ResizablePanel 
          defaultSize={35} 
          minSize={25}
          className="transition-all duration-300 hover:shadow-xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <ChatPanel />
        </ResizablePanel>
        
        <ResizableHandle 
          withHandle 
          className="bg-gradient-to-r from-border/30 via-border/50 to-border/30 hover:bg-gradient-to-r hover:from-primary/20 hover:via-primary/30 hover:to-primary/20 transition-all duration-300 hover:shadow-lg"
          style={{
            transformStyle: "preserve-3d",
          }}
        />
        
        <ResizablePanel 
          defaultSize={65} 
          minSize={35}
          className="transition-all duration-300 hover:shadow-xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="h-full w-full bg-card/30 backdrop-blur-sm transition-all duration-300">
            <PreviewPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
