import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  server: {
    port: 3000,
    strictPort: true,
    https: false,
    open: false,
    hmr: { port: 3001 }
  },
  preview: { port: 3000 }
});
