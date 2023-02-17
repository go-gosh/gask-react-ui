const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.sky[300],
          light: colors.sky[100],
          dark: colors.sky[600],
        },
        secondary: {
          DEFAULT: colors.slate[500],
          light: colors.slate[100],
          dark: colors.slate[600],
        },
        danger: colors.red[500],
      },
    },
  },
  plugins: [],
};
