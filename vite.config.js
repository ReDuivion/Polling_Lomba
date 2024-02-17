import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/src/App.css','resources/src/main.jsx'],
            refresh: true,
        }),
        // { enforce: 'pre', ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],
});
