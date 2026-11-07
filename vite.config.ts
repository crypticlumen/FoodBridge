import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Lucide is ESM and tree-shakeable. Avoid pre-bundling its full icon catalog
  // during the dev server's cold start; only the imported icons are served.
  optimizeDeps: { exclude: ['lucide-react'] },
});
