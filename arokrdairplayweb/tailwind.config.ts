import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F7FF",
          100: "#E0EFFF",
          200: "#B9DDFF",
          300: "#7CC0FF",
          400: "#389DFF",
          500: "#007AFF",
          600: "#005BD4",
          700: "#0047AB",
          800: "#083B8A",
          900: "#0B2B66",
          950: "#061A40",
        },
        navy: {
          900: "#0B192C",
          800: "#1E2A38",
          700: "#2C3E50",
        }
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(0, 122, 255, 0.35)",
        "glow-lg": "0 0 60px -10px rgba(0, 122, 255, 0.4)",
        card: "0 10px 30px -5px rgba(11, 43, 102, 0.08), 0 4px 6px -2px rgba(11, 43, 102, 0.03)",
        elevated: "0 20px 40px -15px rgba(0, 122, 255, 0.18)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
