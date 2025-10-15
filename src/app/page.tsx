"use client";

import { useState } from "react";
import { ResizablePanels } from "@/components/ResizablePanels";
import { JsonInput } from "@/components/JsonInput";
import { JsonTable } from "@/components/JsonTable";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Home() {
  const [jsonData, setJsonData] = useState<Record<string, unknown>[]>([]);

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight">JSON to Table Converter</h1>
            <p className="text-sm text-muted-foreground">
              Paste JSON array on the left, view as interactive table on the right
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-1 overflow-hidden bg-muted/40">
        <ResizablePanels
          leftPanel={<JsonInput onJsonChange={setJsonData} />}
          rightPanel={<JsonTable data={jsonData} />}
        />
      </main>
    </div>
  );
}
