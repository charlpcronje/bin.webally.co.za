/* frontend/src/components/ui/input.jsx */
/**
 * @file frontend/src/components/ui/input.jsx
 * A ShadCN-like input with Tailwind classes and dark mode.
 */
import React from "react";
import { cn } from "../../lib/utils";

/**
 * ShadCN-like Input component.
 * @param {Object} props
 * @param {string} props.className
 */
export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm " +
        "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-100 " +
        "dark:border-gray-700 dark:placeholder-gray-600 dark:focus:ring-gray-600",
        className
      )}
      {...props}
    />
  );
}
