/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        des: '#64748b',
      },
      boxShadow: {
        active:
          'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
      },
    },
    animation: {
      clickAnimate: 'clickAnimate 0.2s ease-in-out',
      gotoShopCartMobile: 'gotoShopCartMobile 0.3s ease-in-out',
      scaleIn: 'scaleIn 0.3s ease-in-out',
      scaleOut: 'scaleOut 0.1s ease-in-out',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
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
      scaleIn: {
        '0%': { width: '0px', height: '0px' },
        '100%': { width: '100%', height: '100%' },
      },
      scaleOut: {
        '0%': { width: '100%', height: '100%' },
        '100%': { width: '0px', height: '0px' },
      },
      ping: {
        '75%': {
          transform: 'scale(2)',
          opacity: '0',
        },
        '100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
    },
  },
  plugins: [],
}
