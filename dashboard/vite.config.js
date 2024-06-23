import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api2': {
                target: 'https://widm-back-end.nevercareu.space',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api2/, ''),
                secure: false
            },
            '/api': {
                target: 'https://portal.ncu.edu.tw',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    }
});
