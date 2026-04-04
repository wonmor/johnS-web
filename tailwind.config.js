/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        localeOfferFloat: {
          '0%, 100%': {
            transform: 'translateX(-50%) translateY(0)',
          },
          '50%': {
            transform: 'translateX(-50%) translateY(-6px)',
          },
        },
      },
      animation: {
        'locale-offer-float':
          'localeOfferFloat 4.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
