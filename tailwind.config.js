/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitter: {
          // define new colors: twitter-blue twitter-navy twitter-white
          blue: "#1d9bf0",
          navy: "#1a8cd8",
          white: "#d9d9d9",
        },
      },
    },
  },
  plugins: [],
};
