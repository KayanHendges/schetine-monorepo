/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "className",
    "hoverStyles"
  ],
  theme: {
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
      maxWidth: {
        "1/3": "33.33%",
        "2/3": "66.66%",
        "1/2": "50%",
        16: "16rem",
      },
      flex: {
        0: "2 0 0%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
