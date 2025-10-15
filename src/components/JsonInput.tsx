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
    <div className="flex flex-col h-full p-4 bg-gray-50">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-black">JSON Input</h2>
        <p className="text-sm text-gray-600">
          Paste your JSON array here (auto-correction enabled)
        </p>
      </div>

      {error && (
        <div className={`mb-2 p-2 rounded text-sm ${
          error.includes("Auto-corrected")
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {error}
        </div>
      )}

      <Textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]`}
        className="flex-1 font-mono text-sm resize-none text-black"
      />
    </div>
  );
}
