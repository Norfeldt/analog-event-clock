import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/analog-event-clock/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
