"use client";

import { ChatPanel } from "./ChatPanel";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function EditorLayout() {
  return (
    <div className="h-full w-full bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatPanel />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={60} minSize={40}>
          <PreviewPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
