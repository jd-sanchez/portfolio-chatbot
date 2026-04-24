/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Surface colors backed by CSS custom properties so they flip with the theme.
        // Must use RGB channel format (no commas) to support Tailwind opacity modifiers like /40.
        surface: {
          0: "rgb(var(--s0) / <alpha-value>)",
          1: "rgb(var(--s1) / <alpha-value>)",
          2: "rgb(var(--s2) / <alpha-value>)",
          3: "rgb(var(--s3) / <alpha-value>)",
          4: "rgb(var(--s4) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
          soft: "rgba(99,102,241,0.15)",
          glow: "rgba(99,102,241,0.4)",
        },
        muted: "#64748b",
        subtle: "rgb(var(--s4) / <alpha-value>)",
      },
      animation: {
        "fade-up": "fadeUp 0.25s ease-out",
        blink: "blink 1s step-end infinite",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
