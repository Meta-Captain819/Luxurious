/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: '#D4AF37',
        darkGray: "#333",
        lightGray: "#f9f9f9",
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { transform: "translateX(0%)", opacity: "0.5" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateX(0%)", opacity: "0.5" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "50%": { transform: "translateX(0%)", opacity: "0.5" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 2.5s ease-in-out forwards",
        slideInTop: "slideInTop 2.5s ease-in-out forwards",
        slideInRight: "slideInRight 2.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
