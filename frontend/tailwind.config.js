/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        mint: "#2fbf9b",
        coral: "#f9735b",
        cloud: "#f6f8fb",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 32, 51, 0.12)",
      },
    },
  },
  plugins: [],
};

