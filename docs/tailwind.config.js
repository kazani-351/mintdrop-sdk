const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1.1rem", { lineHeight: "2rem" }],
      lg: ["1.2rem", { lineHeight: "1.75rem" }],
      xl: ["1.35rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.5rem" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "3rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }]
    },

    extend: {
      colors: {
        blue: {
          DEFAULT: "#1D50FA",
          50: "#D1DBFE",
          100: "#BDCCFE",
          200: "#95ADFD",
          300: "#6D8EFC",
          400: "#456FFB",
          500: "#1D50FA",
          600: "#0536DA",
          700: "#0428A3",
          800: "#021B6C",
          900: "#010D35"
        },
        green: {
          DEFAULT: "#53DDB4",
          50: "#ECFBF7",
          100: "#DBF8EF",
          200: "#B9F1E1",
          300: "#97EAD2",
          400: "#75E4C3",
          500: "#53DDB4",
          600: "#29CF9E",
          700: "#20A07A",
          800: "#167156",
          900: "#0D4233"
        },
        purple: {
          DEFAULT: "#8348E6",
          50: "#F0EAFC",
          100: "#E4D8FA",
          200: "#CCB4F5",
          300: "#B490F0",
          400: "#9B6CEB",
          500: "#8348E6",
          600: "#631ED8",
          700: "#4D17A7",
          800: "#361076",
          900: "#1F0944"
        },
        yellow: {
          DEFAULT: "#FEBC09",
          50: "#FFEEC0",
          100: "#FFE8AC",
          200: "#FEDD83",
          300: "#FED25A",
          400: "#FEC732",
          500: "#FEBC09",
          600: "#CE9701",
          700: "#966E01",
          800: "#5E4500",
          900: "#261C00"
        },
        red: {
          DEFAULT: "#E05353",
          50: "#FCEFEF",
          100: "#F9DDDD",
          200: "#F3BBBB",
          300: "#EC9898",
          400: "#E67676",
          500: "#E05353",
          600: "#D42727",
          700: "#A51E1E",
          800: "#751515",
          900: "#460D0D"
        },
        black: {
          DEFAULT: "#1A1B2F",
          50: "#56529A",
          100: "#4F4A8D",
          200: "#403C72",
          300: "#312E57",
          400: "#22203D",
          500: "#131222",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        sans: ["DM Sans", "ui-sans-serif"],
        serif: ["Space Grotesk", "ui-serif"],
        mono: ["Space Mono", "monospace"]
      },
      maxWidth: {
        "8xl": "88rem"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
