/* frontend/src/components/ui/button.jsx */
/**
 * @file frontend/src/components/ui/button.jsx
 * A ShadCN-like button with Tailwind classes and dark mode.
 */
import React from "react";
import { cn } from "../../lib/utils";

/**
 * ShadCN-like Button component.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {() => void} props.onClick
 */
export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        "bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 " +
        "transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
