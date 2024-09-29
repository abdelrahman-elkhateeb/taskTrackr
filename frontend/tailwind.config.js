import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: "#062223",
          bg: "#e1f5f9",
          primary: "#15636a",
          pHover: "#97ee3fa8",
          secondary: "#7b82e5",
          accent: "#4723b3",
        },
        dark: {
          text: "#def7f9",
          bg: "#06191c",
          primary: "#93e3ea",
          pHover: "#97ee3fa8",
          secondary: "#1a2285",
          accent: "#714cdc",
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode with the 'dark' class
  plugins: [daisyui],
  daisyui: {},
};

export default config;
