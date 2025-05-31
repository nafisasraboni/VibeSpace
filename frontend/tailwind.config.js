import tailwindScrollbarHide from "tailwind-scrollbar-hide";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  
    "./public/index.html",         
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
};
