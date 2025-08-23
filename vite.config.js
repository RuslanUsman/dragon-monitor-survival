import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'dragon-monitor-survival';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${repoName}/` : '/',
}));
