/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // все страницы и компоненты в src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00E5FF', // неоновый акцент
        dark: '#0B0F14',    // фон шапки/подвала
        surface: '#121821', // фон карточек/контейнеров
        accent: '#7CFFCB',  // дополнительный акцент
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,229,255,0.4), inset 0 0 10px rgba(0,229,255,0.2)',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { boxShadow: '0 0 14px rgba(0,229,255,0.35)' },
          '50%': { boxShadow: '0 0 28px rgba(0,229,255,0.6)' },
        },
        fadeSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeSlideOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-8px)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0 50%' },
        },
      },
      animation: {
        breathing: 'breathing 2.4s ease-in-out infinite',
        fadeIn: 'fadeSlideIn .35s ease forwards',
        fadeOut: 'fadeSlideOut .25s ease forwards',
        skeleton: 'skeleton 1.4s ease infinite',
      },
    },
  },
  plugins: [],
};
