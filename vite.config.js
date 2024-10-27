import react from '@vitejs/plugin-react';
import path from "path";

export default {
    plugins: [react()],
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}