/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'background': '#0D1117',
        'surface': '#161B22',
        'border': '#30363d',
        'text-primary': '#c9d1d9',
        'text-secondary': '#8b949e',
      },
    },
  },
  plugins: [],
};