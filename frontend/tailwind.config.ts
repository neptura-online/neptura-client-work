import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-emarketing": "#ffaa17",
      },
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
} satisfies Config;
