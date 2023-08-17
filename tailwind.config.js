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
    typography: () => ({
      DEFAULT: {
        css: {
          '--tw-prose-body': 'inherit',
          '--tw-prose-headings': 'inherit',
          '--tw-prose-links': 'inherit',
          '--tw-prose-bold': 'inherit',
          '--tw-prose-counters': 'inherit',
          '--tw-prose-bullets': 'inherit',
          '--tw-prose-quotes': 'inherit',
          color: '#F3EDE2',
          'h1, h2, h3, h4, h5': {
            fontWeight: '400',
            color: '#F3EDE2',
            '&:first-child': {
              marginTop: 0,
            },
          },
          p: {
            '&:first-child': {
              marginTop: 0,
            },
            '&:last-child': {
              marginBottom: 0,
            },
          },
          blockquote: {
            display: 'flex',
            gap: '0.8em',
            padding: 0,
            border: 0,
            fontSize: '1.1em',
            fontStyle: 'normal',
            '&::before': {
              content: '"“"',
              fontSize: '3em',
              lineHeight: 1.25,
            },
          },
          '> ol > li > ol': {
            listStyle: 'lower-alpha',
          },
        },
      },
    }),
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
