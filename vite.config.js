import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
