/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#ff6b6b",
          600: "#ef4444"
        }
      },
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui"],
        display: ["Inter", "system-ui"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(2,6,23,0.4)"
      }
    }
  },
  plugins: []
};
