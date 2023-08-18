/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screen: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      listStyleType: {
        roman: 'upper-roman',
        alpha: 'lower-alpha',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        merr: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#bd2990',
        primaryDark: '#912370',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        100: 'repeat(2, minmax(0, 25rem))',
        200: 'repeat(2, minmax(0, 20rem))',
      },
      gridTemplateRows: {
        300: 'repeat(2, minmax(0, 80rem))',
      },
      aspectRatio: {
        '4/5': '4 / 5',
      },
    },
  },
  plugins: [],
}
