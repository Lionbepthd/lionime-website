import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // ubah root ke public
  build: {
    outDir: '../dist', // pastikan output tetap di luar public
  }
});
