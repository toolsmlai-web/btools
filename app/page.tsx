"use client";

import { EditorLayout } from "@/components/editor/EditorLayout";

// Skip static generation for this page since it uses client-only stores
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <EditorLayout />
    </main>
  );
}
