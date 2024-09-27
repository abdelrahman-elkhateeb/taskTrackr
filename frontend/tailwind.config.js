import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: '#0a0b0f',
          bg: '#f2f4f8',
          primary: '#526ab7',
          secondary: '#97a7dd',
          accent: '#5b78d7',
        },
        dark: {
          text: '#f0f1f5',
          bg: '#07090d',
          primary: '#4860ad',
          secondary: '#223268',
          accent: '#2845a4',
        },
      },
    },
  },
  darkMode: 'class', // Enable dark mode with the 'dark' class
  plugins: [daisyui],
  daisyui: {
    themes: ["nord", "sunset"], // Use the nord and sunset themes from daisyUI
  },
};

export default config;
