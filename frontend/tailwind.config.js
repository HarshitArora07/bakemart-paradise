/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        royal: ["Playfair Display", "serif"],
        modern: ["Poppins", "sans-serif"],
      },

      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-60px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(60px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },

      animation: {
        "slide-in-left": "slideInLeft 0.9s ease-out both",
        "slide-in-right": "slideInRight 0.9s ease-out both",
        "fade-in": "fadeIn 0.8s ease-out both",
        "fade-in-delay": "fadeIn 0.8s ease-out 0.3s both",
      },
    },
  },

  plugins: [],
};
