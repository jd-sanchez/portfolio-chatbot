/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arcade: ['"Press Start 2P"', "monospace"],
      },
      colors: {
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
        neon: {
          cyan: "#22d3ee",
          pink: "#f472b6",
          green: "#4ade80",
          yellow: "#facc15",
        },
        muted: "#64748b",
        subtle: "rgb(var(--s4) / <alpha-value>)",
      },
      animation: {
        "fade-up": "fadeUp 0.25s ease-out",
        blink: "blink 1s step-end infinite",
        "slide-in": "slideIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-neon": "pulseNeon 2.5s ease-in-out infinite",
        glitch: "glitch 5s infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(99,102,241,0.5), 0 0 30px rgba(99,102,241,0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(99,102,241,0.8), 0 0 60px rgba(99,102,241,0.4), 0 0 80px rgba(139,92,246,0.2)" },
        },
        glitch: {
          "0%, 85%, 100%": { transform: "translate(0)", filter: "none" },
          "87%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(90deg)" },
          "89%": { transform: "translate(2px, -1px)", filter: "hue-rotate(-90deg)" },
          "91%": { transform: "translate(-1px, 2px)", filter: "none" },
          "93%": { transform: "translate(1px, -1px)", filter: "hue-rotate(45deg)" },
        },
      },
    },
  },
  plugins: [],
};
