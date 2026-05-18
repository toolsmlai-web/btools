import { create } from "zustand";

const DEFAULT_APP_CODE = `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Lovable Clone 🚀
        </h1>
        <p className="text-gray-600 mb-6">
          Built for Bangladesh market with ❤️
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            -
          </button>
          <span className="text-2xl font-bold">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;`;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface FileItem {
  path: string;
  content: string;
  language: string;
}

interface EditorStore {
  // Chat state
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;

  // File state
  files: Record<string, FileItem>;
  activeFile: string | null;
  setActiveFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  addFile: (file: FileItem) => void;
  deleteFile: (path: string) => void;
  
  // Preview state
  previewCode: string;
  setPreviewCode: (code: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Chat state
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        },
      ],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),

  // File state
  files: {
    "src/App.tsx": {
      path: "src/App.tsx",
      content: DEFAULT_APP_CODE,
      language: "typescript",
    },
  },
  activeFile: "src/App.tsx",
  setActiveFile: (path) => set({ activeFile: path }),
  updateFile: (path, content) =>
    set((state) => ({
      files: {
        ...state.files,
        [path]: { ...state.files[path], content },
      },
      previewCode: path === "src/App.tsx" ? content : state.previewCode,
    })),
  addFile: (file) =>
    set((state) => ({
      files: { ...state.files, [file.path]: file },
    })),
  deleteFile: (path) =>
    set((state) => {
      const newFiles = { ...state.files };
      delete newFiles[path];
      return { files: newFiles };
    }),

  // Preview state
  previewCode: DEFAULT_APP_CODE,
  setPreviewCode: (code) => set({ previewCode: code }),
}));
