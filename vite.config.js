import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'; // определяем, прод или нет

  return {
    plugins: [react()],
    // В dev — '/', в продакшене (GitHub Pages) — '/dragon-monitor-survival/'
    base: isProd ? '/dragon-monitor-survival/' : '/',
  };
});
