/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F66B0E',
          secondary: '#EFEFEF',
          accent: '#0174BE',
          neutral: '#111827',
          'base-100': '#112B3C',
          info: '#0080ff',
          success: '#84cc16',
          warning: '#fbbf24',
          error: '#da0042',
        },
      },
      {
        mytheme2: {
          primary: '#F66B0E',
          secondary: '#112B3C',
          accent: '#0174BE',
          neutral: '#111827',
          'base-100': '#EFEFEF',
          info: '#0080ff',
          success: '#84cc16',
          warning: '#fbbf24',
          error: '#da0042',
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
