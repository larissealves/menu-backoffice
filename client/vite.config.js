import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const urlAPI =  mode  === 'development' ? env.VITE_API_URL : env.VITE_API_URL_PROD;
 
  return {
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      '/api': {
        target: urlAPI,
        changeOrigin: true,
        secure: true,
      }
    }
  }}

})
