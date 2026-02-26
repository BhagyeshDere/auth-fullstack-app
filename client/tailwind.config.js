/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",  // Purple
        secondary: "#ec4899" // Pink
      },
    },
  },
  plugins: [],
};