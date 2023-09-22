/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2AC8D5',
        'purple': '#6F6CE5' // Use any name you prefer
      },
    },
  },
  fontFamily: {
    sans: ['Helvetica', 'Arial', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Menlo', 'monospace'],
    // Add your custom font families here
  },
  plugins: [],
}
