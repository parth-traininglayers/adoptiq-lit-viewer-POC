import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'AdoptIQApp',
      fileName: (format) => `adoptiq-app.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [], // Ensure no packages are excluded (Lit will be bundled)
      plugins: [
        copy({
          targets: [
            { src: 'index.html', dest: 'dist' }
          ],
        }),
      ],
    },
  },
});