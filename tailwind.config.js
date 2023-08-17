/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#18225D',
        lightPurple:'#6A6AE0',
        creamWhite:'#EFEEFC',
        sucess:'#198754',
        danger:'#dc3545',
      },
    },
  },
  plugins: [],
}

