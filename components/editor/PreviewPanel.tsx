"use client";

import { useEditorStore } from "@/lib/store/editor-store";
import { Sandpack } from "@codesandbox/sandpack-react";

export function PreviewPanel() {
  const { previewCode, files } = useEditorStore();

  const sandpackFiles = Object.fromEntries(
    Object.entries(files).map(([path, file]) => [
      `/${path}`,
      { code: file.content },
    ])
  );

  return (
    <div className="h-full w-full">
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
        }}
      />
    </div>
  );
}
