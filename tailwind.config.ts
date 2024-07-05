/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "744px",
        xs: "80%",
        sm: "650px",
        md: "744px",
        lg: "744px",
        xl: "744px",
      },
    },
    extend: {
      screens: {
        'tall': { 'raw': '((min-width: 744px) and (max-height: 800px))' },
        'xxs': { 'raw': '(max-width: 400px)' }

      },
      colors: {
        border: "hsl(var(--border))",
        lightblue: "var(--light-blue)",
        input: "hsl(var(--input))",
        lightgray: "var(--light-gray)",
        lightwhite: "var(--light-white)",
        customblack: "var(--customblack)",
        customwhite: "var(--customwhite)",
        background: "hsl(var(--background))",
        darkgolden: "var(--dark-golden)",
        foreground: "hsl(var(--foreground))",
        customgray: "var(--custom-gray)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        rotate: "rotateAnimation 3s linear infinite",
        "text-reveal": "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
      },
      backgroundImage: {
        "btn-gradient":
          " linear-gradient(135deg, var(--light-black) 20%, var(--customblack) 100%, var(--customblack) 20%, var(--customblack) 100% ) padding-box,linear-gradient(90deg, var(--dark-golden) 50%, var(--light-golden) 100%) border-box;",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bg: "/bg.svg",
        "custom-gradient-left": "var(--custom-gradient-left)",
        "custom-gradient-dark":
          " linear-gradient(to left, var(--custom-dark), var(--dark-golden))",
        "custom-gradient-right": "var(--custom-gradient-right)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-poppins)", ...fontFamily.serif],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")({
      className: "editorTypographyStyling",
    }),
  ],
};

export default config;
