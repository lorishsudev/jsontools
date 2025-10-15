"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

const themes = [
  { value: "light", label: "Default", color: "bg-white" },
  { value: "brutalist", label: "Brutalist", color: "bg-yellow-400" },
  { value: "soft-pop", label: "Soft Pop", color: "bg-pink-300" },
  { value: "tangerine", label: "Tangerine", color: "bg-orange-400" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Palette className="h-4 w-4" />
        Theme
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-md border bg-card p-2 shadow-lg">
            <div className="text-sm font-medium mb-2 px-2">Choose Theme</div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                    theme === t.value
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border ${t.color}`} />
                  {t.label}
                  {theme === t.value && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
