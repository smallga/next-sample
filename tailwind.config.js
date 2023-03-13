/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        des: '#64748b',
      },
    },
    animation: {
      clickAnimate: 'clickAnimate 0.2s ease-in-out',
      gotoShopCartMobile: 'gotoShopCartMobile 0.3s ease-in-out',
    },
    keyframes: {
      clickAnimate: {
        '0%': { transform: 'scale(1)' },
        '25%': { transform: 'scale(0.85)' },
        '50%': { transform: 'scale(1)' },
        '75%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
      },
      gotoShopCartMobile: {
        '0%': {},
        '100%': { right: '48px', bottom: '48px' },
      },
      gotoShopCartDesk: {
        '0%': { transform: 'scale(1)' },
        '25%': { transform: 'scale(0.85)' },
        '50%': { transform: 'scale(1)' },
        '75%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
}
