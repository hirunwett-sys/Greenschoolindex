import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007a6d',
        secondary: '#039a8a',
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-merriweather)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;