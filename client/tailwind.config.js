/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#2AC8D5",
        purple: "#6F6CE5",
      },
    },
    screens: {
      sm: "360px",
      // => @media (min-width: 389px) { ... }

      md: "735px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    corePlugins: {
      transform: true,
      translate: true,
    },
  },
  fontFamily: {
    sans: ["Helvetica", "Arial", "sans-serif"],
    serif: ["Georgia", "serif"],
    mono: ["Menlo", "monospace"],
    // Add your custom font families here
  },
  plugins: [],
};
