/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2C3E50',    // Deep blue-gray
        'brand-secondary': '#3498DB',   // Ice blue
        'warm-gray': '#ECF0F1',        // Snow white
        'accent-1': '#34495E',         // Slate
        'accent-2': '#95A5A6',         // Cool gray
        'winter-white': '#F7F9F9',     // Frost white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};
