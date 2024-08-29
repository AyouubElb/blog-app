/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgreen: "#b9e7e7",
        333: "#333",
        555: "#555",
        orangeColor: "#e43c13",
        orangeLighter: "#ef5a2c",
        linen: "#ece9e2",
      },
      width: {
        1024: "1024px",
        792: "792px",
        420: "420px",
      },
      height: {
        200: "200px",
        600: "600px",
        450: "450px",
      },
      maxHeight: {
        400: "400px",
      },
      lineClamp: {
        2: "2",
      },
    },
  },
  plugins: [],
};
