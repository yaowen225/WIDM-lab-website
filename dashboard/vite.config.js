import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'https://widm-back-end.nevercareu.space',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false // 如果你的目標是 HTTPS，且沒有正確的證書，可以設置為 false
            }
        }
    }
});
