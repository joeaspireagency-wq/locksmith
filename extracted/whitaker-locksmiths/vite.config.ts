import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind CSS v4 is wired in through its official Vite plugin (no tailwind.config.js needed).
// Theme tokens live in src/index.css under @theme.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
