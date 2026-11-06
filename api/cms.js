// Read-only proxy from the site to the WordPress CMS (see rewrites in vercel.json).
//
// SiteGround's anti-bot answers many requests with an HTML challenge (202,
// /.well-known/sgcaptcha) instead of the content, and <img> tags cannot retry.
// So this function retries challenged requests and lets Vercel's CDN cache only
// the good responses: once a file has loaded, it no longer reaches SiteGround.

const CMS_ORIGIN = process.env.CMS_ORIGIN || 'http://cms.alejandroa184.sg-host.com'
const ATTEMPTS = 6

// Media files don't change once uploaded; API data refreshes in the background.
const CACHE = {
  '/wp-content/': 'public, max-age=86400, s-maxage=31536000',
  '/wp-json/': 'public, max-age=0, s-maxage=60, stale-while-revalidate=86400',
}
const FORWARDED_HEADERS = ['content-type', 'content-length', 'last-modified', 'x-wp-total', 'x-wp-totalpages']

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function errorResponse(status, message) {
  return new Response(message, { status, headers: { 'cache-control': 'no-store', 'content-type': 'text/plain' } })
}

const isChallenge = (res) => res.status === 202 || res.url.includes('sgcaptcha')

export async function GET(request) {
  const params = new URL(request.url).searchParams
  const path = params.get('cmsPath') || ''
  // Vercel also passes the rewrite's own :rest param; neither goes to WordPress.
  params.delete('cmsPath')
  params.delete('rest')

  const prefix = Object.keys(CACHE).find((p) => path.startsWith(p))
  if (!prefix || path.includes('..')) return errorResponse(404, 'Not found')

  const query = params.toString()
  const target = `${CMS_ORIGIN}${path}${query ? `?${query}` : ''}`

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    let upstream
    try {
      upstream = await fetch(target, { headers: { 'user-agent': 'TEN-Arquitectos-Site/1.0' } })
    } catch (error) {
      console.error(`CMS fetch failed (attempt ${attempt}): ${path}`, error)
    }

    if (upstream && !isChallenge(upstream)) {
      const headers = new Headers({ 'cache-control': upstream.ok ? CACHE[prefix] : 'no-store' })
      for (const name of FORWARDED_HEADERS) {
        const value = upstream.headers.get(name)
        if (value) headers.set(name, value)
      }
      return new Response(upstream.body, { status: upstream.status, headers })
    }

    await upstream?.body?.cancel()
    if (attempt < ATTEMPTS) await sleep(150 * attempt)
  }

  return errorResponse(503, 'CMS unavailable')
}
