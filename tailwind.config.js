/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#00bfff', // Electric blue
          600: '#0099cc', // Darker blue
          700: '#0077aa', // Even darker blue
        },
        purple: {
          500: '#7f00ff', // Accent purple
          600: '#6600cc', // Darker purple
        },
        dark: {
          900: '#0a0a0a', // Background black
          800: '#121212', // Surface black
          700: '#1a1a1a', // Lighter black
        }
      },
      fontFamily: {
        exo: ['Exo 2', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        'aincrad': "url('https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 191, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.8)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'glow': 'glow 2s infinite',
      },
    },
  },
  plugins: [],
};