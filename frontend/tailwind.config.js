import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: "#070c03",
          bg: "#f8fcf3",
          primary: "#85ce3b",
          pHover: "#97ee3fa8",
          secondary: "#96dfe4",
          accent: "#5c8bd6",
        },
        dark: {
          text: "#f7fcf3",
          bg: "#080c03",
          primary: "#7ac431",
          pHover: "#97ee3fa8",
          secondary: "#1b656a",
          accent: "#2958a3",
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode with the 'dark' class
  plugins: [daisyui],
  daisyui: {
    themes: ["nord", "sunset"], // Use the nord and sunset themes from daisyUI
  },
};

export default config;
