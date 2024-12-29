/* frontend/tailwind.config.cjs */
/**
 * @file frontend/tailwind.config.cjs
 * Tailwind configuration for ShadCN + React with dark mode.
 */
module.exports = {
  darkMode: "class", // important for toggling dark theme
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
