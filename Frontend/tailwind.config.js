/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // 🚫 Disable dark mode globally
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#7e22ce",
        "brand-indigo": "#4f46e5",
        "brand-violet": "#8b5cf6",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
