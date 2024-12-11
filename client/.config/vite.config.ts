import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@tanstack/react-query': '/node_modules/@tanstack/react-query',
            '@radix-ui/react-icons': '/node_modules/@radix-ui/react-icons',
            '@radix-ui/themes': '/node_modules/@radix-ui/themes',
        },
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        origin: 'http://0.0.0.0:3000',
    },
    plugins: [react()],
})
