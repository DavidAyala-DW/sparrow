/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#F3EDE2',
        primary: '#F3EDE2',
        body: '#2A3441',
      },
      fontFamily: {
        havre: ['"Le Havre"', 'sans-serif'],
        brandom: ['"Brandon Grotesque"', 'sans-serif'],
      },
    },
    fontSize: {
      'heading-xl': [
        '50px',
        {
          lineHeight: '1.2em',
          fontWeight: '400',
        },
      ],
      'heading-lg': [
        '36px',
        {
          lineHeight: '1.2em',
          fontWeight: '400',
        },
      ],
      'heading-md': [
        '32px',
        {
          lineHeight: '1.2em',
          fontWeight: '400',
        },
      ],
      'heading-sm': [
        '24px',
        {
          lineHeight: '1.2em',
          fontWeight: '400',
        },
      ],
    },
    screens: {
      sm: '480px',
      sm2: '580px',
      sm3: '680px',
      md: '744px',
      md2: '980px',
      lg: '1024px',
      lg2: '1120px',
      xl: '1280px',
      xl2: '1465px',
      '2xl': '1536px',
      '3xl': '1920px',
      vw: '1921px',
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
