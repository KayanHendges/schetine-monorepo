/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#F5F5F5",
      black: "##171717",
      container: {
        black: "#171717",
      },
      gray: {
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        800: "#262626",
      },
      indigo: {
        300: "#A5B4FC",
        400: "#818CF8",
        500: "#6366F1",
      },
    },
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      "2xl": 32,
    },
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
    },
  },
  plugins: [],
};
