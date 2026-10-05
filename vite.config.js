import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// In dev/preview, /wp-json and /wp-content (media) are proxied to WordPress. This avoids CORS and the
// CMS's invalid SSL certificate (secure: false) while developing locally.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.WP_PROXY_TARGET || 'https://cms.alejandroa184.sg-host.com'
  const proxy = {
    '/wp-json': { target, changeOrigin: true, secure: false },
    '/wp-content': { target, changeOrigin: true, secure: false },
  }

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})
