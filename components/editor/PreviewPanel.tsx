"use client";

import { useEditorStore } from "@/lib/store/editor-store";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor, RefreshCw } from "lucide-react";

export function PreviewPanel() {
  const { previewCode, files } = useEditorStore();

  const sandpackFiles = Object.fromEntries(
    Object.entries(files).map(([path, file]) => [
      `/${path}`,
      { code: file.content },
    ])
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border/60 bg-card/40 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Monitor aria-hidden="true" className="text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">Live preview</span>
          <Badge variant="outline" className="text-[10px] text-muted-foreground">React / TypeScript</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Refresh preview" onClick={() => window.location.reload()}><RefreshCw aria-hidden="true" /></Button>
          <Button variant="ghost" size="icon" aria-label="Open workspace in new tab" onClick={() => window.open(window.location.href, "_blank", "noopener,noreferrer")}><ExternalLink aria-hidden="true" /></Button>
        </div>
      </div>
      <div className="min-h-0 flex-1">
      <Sandpack
        template="react-ts"
        theme="dark"
        files={sandpackFiles}
        options={{
          showNavigator: true,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: "100%",
          editorWidthPercentage: 0,
        }}
        customSetup={{
          dependencies: {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
          },
        }        }
      />
      </div>
    </div>
  );
}
