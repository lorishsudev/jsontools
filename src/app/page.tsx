"use client";

import { useState } from "react";
import { ResizablePanels } from "@/components/ResizablePanels";
import { JsonInput } from "@/components/JsonInput";
import { JsonTable } from "@/components/JsonTable";

export default function Home() {
  const [jsonData, setJsonData] = useState<Record<string, unknown>[]>([]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">JSON to Table Converter</h1>
        <p className="text-sm text-blue-100">
          Paste JSON array on the left, view as table on the right
        </p>
      </header>

      <main className="flex-1 overflow-hidden">
        <ResizablePanels
          leftPanel={<JsonInput onJsonChange={setJsonData} />}
          rightPanel={<JsonTable data={jsonData} />}
        />
      </main>
    </div>
  );
}
