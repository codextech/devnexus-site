"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-300 cursor-pointer group ${
        theme === "light"
          ? "text-dark-400 hover:text-dark-100 hover:bg-black/5"
          : "text-dark-300 hover:text-white hover:bg-white/5"
      } ${className ?? ""}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="relative block w-4.5 h-4.5 overflow-hidden">
        {/* Sun icon — visible in dark mode (to switch to light) */}
        <Sun
          className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
        {/* Moon icon — visible in light mode (to switch back to dark) */}
        <Moon
          className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
      </span>
    </button>
  );
}
