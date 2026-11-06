// SiteGround's anti-bot answers some requests with an HTML challenge instead of
// the file, so a CMS image can fail even though it exists. Retry those from the
// browser. A capture listener also covers images inside WordPress HTML content.

const ATTEMPTS = 12
const attempts = new WeakMap()

function retry(img) {
  const url = new URL(img.currentSrc || img.src, window.location.href)
  const isCmsMedia = url.origin === window.location.origin && url.pathname.startsWith('/wp-content/')
  if (!isCmsMedia) return

  const attempt = (attempts.get(img) || 0) + 1
  attempts.set(img, attempt)
  if (attempt > ATTEMPTS) {
    img.style.visibility = ''
    return
  }

  // Hide the broken-image icon and alt text while retrying.
  img.style.visibility = 'hidden'
  img.addEventListener('load', () => (img.style.visibility = ''), { once: true })

  // A new query string forces a new request; WordPress ignores it for files.
  url.searchParams.set('retry', attempt)
  setTimeout(() => (img.src = url.href), Math.min(250 * attempt, 2000))
}

export function retryCmsImages() {
  document.addEventListener(
    'error',
    (event) => {
      if (event.target instanceof HTMLImageElement) retry(event.target)
    },
    true,
  )
}
