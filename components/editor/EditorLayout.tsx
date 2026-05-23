"use client";

import { ChatPanel } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function EditorLayout() {
  return (
    <div className="h-full w-full bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={25}>
          <ChatPanel />
        </ResizablePanel>
        
        <ResizableHandle withHandle className="bg-border/50 hover:bg-border transition-colors" />
        
        <ResizablePanel defaultSize={65} minSize={35}>
          <div className="h-full w-full bg-card/30">
            <PreviewPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
