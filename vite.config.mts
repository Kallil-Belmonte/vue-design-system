import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';
import viteSvgLoader from 'vite-svg-loader';

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [oxlintPlugin({ path: 'src' }), viteSvgLoader(), vue()],
});
