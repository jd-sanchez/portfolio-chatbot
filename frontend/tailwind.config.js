import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    // Full override, not extend — brutalism is zero-radius everywhere,
    // including any rounded-full/rounded-2xl left over from old markup.
    borderRadius: {
      none: "0px",
      DEFAULT: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px",
    },
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', "sans-serif"],
        mono: ['"Fragment Mono"', "monospace"],
      },
      fontSize: {
        "3xs": ["10px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "2xs": ["11.5px", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      colors: {
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          alt: "rgb(var(--paper-alt) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",
        },
        accent: {
          // Black text on this red hits ~5.9:1 contrast; white text only
          // ~3.6:1 — fails AA. Always pair the fill with accent-ink text.
          DEFAULT: "#FF3B2F",
          ink: "#0A0A0A",
        },
        signal: {
          green: "#16A34A",
        },
      },
      borderWidth: {
        3: "3px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
