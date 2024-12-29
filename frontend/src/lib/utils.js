/* frontend/src/lib/utils.js */
/**
 * @file frontend/src/lib/utils.js
 * Common utilities, including the 'cn' function to merge class names.
 */

/**
 * Merge class names conditionally.
 * @param  {...string} inputs
 * @returns {string}
 */
export function cn(...inputs) {
    return inputs.filter(Boolean).join(" ");
  }
  