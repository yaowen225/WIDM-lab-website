import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [
                postcssNesting(),
                tailwindcss(),
                autoprefixer(),
            ],
        },
    },
    server: {
        host: '0.0.0.0',
    },
});
