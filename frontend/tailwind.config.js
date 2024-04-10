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
          primary: '#4E6C50',
          secondary: '#AA8B56',
          accent: '#F0EBCE',
          neutral: '#111827',
          'base-100': '#395144',
          info: '#0080ff',
          success: '#a3e635',
          warning: '#ffbe00',
          error: '#da0042',
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
