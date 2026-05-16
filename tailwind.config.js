/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff7a18',
          50: '#fff3e6',
          100: '#ffe1bf',
          500: '#ff7a18',
          600: '#ff5a00',
          900: '#3d1a00',
        },
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'orbit': 'orbit calc(var(--duration)*1s) linear infinite',
        'shimmer': 'shimmer 8s linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
        orbit: {
          '0%': { transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))' },
          '100%': { transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))' },
        },
        shimmer: {
          '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shimmer-width)) 0' },
          '30%, 60%': { 'background-position': 'calc(100% + var(--shimmer-width)) 0' },
        },
      },
    },
  },
  plugins: [],
};
