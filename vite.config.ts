import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: '/',
    define: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY),
      'process.env': JSON.stringify(env)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'recharts', 'lucide-react', 'react-markdown'],
            charts: ['lightweight-charts'],
            ai: ['@google/genai']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'esbuild'
    },
    server: {
      port: 8080,
      host: true
    }
  };
});