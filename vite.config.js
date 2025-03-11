import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/resume_builder/",  // Add this line
  plugins: [react()],
});
