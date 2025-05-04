/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          fury: ['Orbitron', 'sans-serif'],
        },
        colors: {
          furyYellow: '#FFB400',
        },
      },
    },
    plugins: [],
  }
  