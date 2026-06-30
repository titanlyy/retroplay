/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gb: {
          purple: '#8B7FD4',
          dark: '#1A1A2E',
          darker: '#0F0F1A',
          screen: '#9BBD0F',
          'screen-dark': '#0F380F'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
