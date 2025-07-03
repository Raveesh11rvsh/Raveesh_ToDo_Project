import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Raveesh_ToDo_Project/', // <-- use your GitHub repo name here
  plugins: [react()],
})
