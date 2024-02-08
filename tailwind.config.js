/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        180: "45rem",
      },
      colors: {
        "black-transparent-75": "#000000bf",
      },
    },
  },
  plugins: [],
};
