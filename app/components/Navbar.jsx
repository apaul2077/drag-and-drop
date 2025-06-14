import { useTheme } from "../hooks/useTheme.js";
import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md dark:bg-zinc-900 bg-white">
      <Link to="/" className="text-xl font-bold dark:text-white">FormBuilder</Link>
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <Link to="/builder">Builder</Link>
          <Link to="/preview">Preview</Link>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-md bg-gray-200 px-3 py-1 text-sm dark:bg-zinc-700 dark:text-white"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
