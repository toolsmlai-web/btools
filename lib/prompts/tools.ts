import Anthropic from "@anthropic-ai/sdk";

export const TOOLS: Anthropic.Tool[] = [
  {
    name: "edit_file",
    description: "Edit or create a file in the project. Use this when you need to modify code.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "File path relative to project root (e.g., 'src/App.tsx')",
        },
        content: {
          type: "string",
          description: "The complete new content for the file",
        },
        operation: {
          type: "string",
          enum: ["create", "update", "delete"],
          description: "Type of file operation",
        },
      },
      required: ["path", "content", "operation"],
    },
  },
  {
    name: "read_file",
    description: "Read the contents of a file to understand the current code before making changes.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "File path relative to project root",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "list_files",
    description: "List all files in the project or a specific directory.",
    input_schema: {
      type: "object" as const,
      properties: {
        directory: {
          type: "string",
          description: "Directory path to list (default: root)",
        },
      },
    },
  },
  {
    name: "run_command",
    description: "Execute a shell command (npm install, npm run build, etc.)",
    input_schema: {
      type: "object" as const,
      properties: {
        command: {
          type: "string",
          description: "The command to execute",
        },
      },
      required: ["command"],
    },
  },
] as const;
