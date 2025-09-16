/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#0d6efd",
          purple: "#6610f2",
          green: "#198754",
          orange: "#fd7e14"
        }
      }
    },
  },
  plugins: [],
};
