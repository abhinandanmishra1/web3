import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': './src',
      '@app/components': './src/components',
      '@app/utils': './src/utils',
      '@app/assets': './src/assets',
    },
  },
})
