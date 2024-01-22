import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'canvas-gtk',
            fileName: 'canvas-gtk',
        },
    },
    plugins: [eslint(), dts()],
});
