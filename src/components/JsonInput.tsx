"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface JsonInputProps {
  onJsonChange: (data: Record<string, unknown>[]) => void;
}

export function JsonInput({ onJsonChange }: JsonInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inputValue.trim()) {
      setError(null);
      onJsonChange([]);
      return;
    }

    try {
      // Try to parse as-is
      let parsed = JSON.parse(inputValue);

      // Auto-correct: if it's not an array, wrap it in an array
      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      setError(null);
      onJsonChange(parsed);
    } catch (e) {
      // Attempt auto-correction for common JSON errors
      try {
        // Fix trailing commas
        let corrected = inputValue.replace(/,(\s*[}\]])/g, "$1");

        // Try to fix missing quotes on keys
        corrected = corrected.replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

        let parsed = JSON.parse(corrected);

        if (!Array.isArray(parsed)) {
          parsed = [parsed];
        }

        setError("Auto-corrected JSON format");
        onJsonChange(parsed);
      } catch {
        setError(`Invalid JSON: ${e instanceof Error ? e.message : "Unknown error"}`);
        onJsonChange([]);
      }
    }
  }, [inputValue, onJsonChange]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="rounded-lg border bg-card shadow-sm flex flex-col h-full">
        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold">JSON Input</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Paste your JSON array here (auto-correction enabled)
          </p>
        </div>

        <div className="px-6">
          {error && (
            <div className={`mb-3 p-3 rounded-md text-sm border ${
              error.includes("Auto-corrected")
                ? "bg-yellow-50 text-yellow-900 border-yellow-200"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}>
              {error}
            </div>
          )}
        </div>

        <div className="flex-1 px-6 pb-6">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]`}
            className="h-full font-mono text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}
