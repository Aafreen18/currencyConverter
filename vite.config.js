import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Inject all env variables into the frontend
const envVars = {};
for (const [key, value] of Object.entries(process.env)) {
  envVars[key] = JSON.stringify(value);
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': envVars
  }

})
