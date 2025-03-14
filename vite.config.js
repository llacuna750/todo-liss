import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPages = process.env.GITHUB_PAGES === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: /todo-liss/,
})
