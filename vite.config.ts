import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    tsconfigPaths() as any,
    tailwindcss(),
    reactRouter(),
    visualizer({ emitFile: true, filename: 'stats.html' }) as any,
  ],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./src'],
      },
    },
  },
  publicDir: 'src/public',
});
