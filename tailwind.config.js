/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#00a6df",
        backdrop: "#f2f2f2",
        almostblack: "#282828",
        white: "#ffffff",
        darkblue: "#00a6df33",
        grayed: "#f2f2f2",
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          500: "#d4d7dc",
          400: "#e3e5e8",
          300: "#e6e6e6",
          200: "#f2f3f5",
        },
      },
    },
  },
  plugins: [],
};
