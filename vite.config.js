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
    // Host whose media URLs are rewritten to the /wp-content proxy (src/lib/wp.js).
    define: { __WP_HOST__: JSON.stringify(new URL(target).hostname) },
    server: { proxy },
    preview: { proxy },
  }
})
