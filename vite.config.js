import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Имя репозитория для GitHub Pages
const repoName = 'dragon-monitor-survival';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // В dev — '/', в продакшене (vite build) — '/dragon-monitor-survival/'
  base: command === 'build' ? `/${repoName}/` : '/',
}));
