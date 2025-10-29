import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-chocolate": "#1F180D",
        "gold-beige": "#9E8C70",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-zapf-humanist)", "serif"],
        "display-bold": ["var(--font-zapf-humanist-bold)", "serif"],
        "display-semi": ["var(--font-zapf-humanist-semi)", "serif"],
        "display-ultra": ["var(--font-zapf-humanist-ultra)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
