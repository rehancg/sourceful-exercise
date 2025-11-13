import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7F56D9',
        'background-light': '#F9FAFB',
        'background-dark': '#101828',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1D2939',
        'text-primary-light': '#101828',
        'text-primary-dark': '#FFFFFF',
        'text-secondary-light': '#667085',
        'text-secondary-dark': '#98A2B3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',  
        lg: '1.5rem',    
        xl: '2rem',       
      },
      spacing: {
        
      },
    },
  },
  plugins: [],
};

export default config;

