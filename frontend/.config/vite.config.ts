import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
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
