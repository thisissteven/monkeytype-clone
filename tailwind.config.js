/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        b: '0 4px 0',
      },
      screens: {
        xs: '400px',
        ns: '850px',
      },
      fontFamily: {
        primary: ['var(--font-family)', ...fontFamily.sans],
      },
      colors: {
        bg: 'rgb(var(--bg-color) / <alpha-value>)',
        font: 'rgb(var(--font-color) / <alpha-value>)',
        hl: 'rgb(var(--hl-color) / <alpha-value>)',
        fg: 'rgb(var(--fg-color) / <alpha-value>)',
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
          },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        blink: 'blink 1.5s infinite 1s',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
