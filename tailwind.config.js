/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    tailwindScrollbar,
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thumb": {
          "background-color": "#4A5568",
          "border-radius": "0.25rem",
          border: "3px solid #2D3748",
        },
        ".scrollbar-track": {
          "background-color": "#2D3748",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
