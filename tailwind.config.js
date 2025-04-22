/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'paris-blue': {
          50: '#f0f4f9',
          100: '#dce3ef',
          200: '#bccee2',
          300: '#8eaece',
          400: '#5c87b3',
          500: '#3a6a9a',
          600: '#2c5584',
          700: '#25446c',
          800: '#223b5b',
          900: '#0F172A',
        },
        'paris-gold': {
          50: '#fefbe8',
          100: '#fef5c2',
          200: '#feea87',
          300: '#fdd947',
          400: '#fbcb1b',
          500: '#EAB308',
          600: '#cb8707',
          700: '#a3680a',
          800: '#865110',
          900: '#724214',
        },
        'paris-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#EF4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
};