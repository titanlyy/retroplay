/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0f',
          1: '#111118',
          2: '#18181f',
          3: '#1e1e28',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'sans-serif']
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px'
      },
      backgroundOpacity: {
        8: '0.08',
        12: '0.12'
      }
    }
  },
  plugins: []
}
