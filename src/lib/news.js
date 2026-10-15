// Turns a News post into the pieces the news pages need.
//
//   credits → first paragraph if it is all <strong>/<em> lines, e.g.
//             "octubre 7, 2026 / Editora: Sarah Gore Reeves / Fotografía: … / Por: …"
//             A line without "Label:" is taken as the article's date.
//   lede    → the first heading right after it (the standfirst)
//   body    → everything else, unchanged
//   excerpt → lede (or first paragraph) as plain text, for the cards
//
// Posts without that credits paragraph are left as they are.

const EMPHASIS = new Set(['EM', 'STRONG', 'B', 'I', 'BR'])

function isCreditsParagraph(el) {
  if (el?.tagName !== 'P' || !el.textContent.trim()) return false
  const nodes = [...el.childNodes].filter((n) => n.nodeType !== 3 || n.textContent.trim())
  return nodes.length > 0 && nodes.every((n) => n.nodeType === 1 && EMPHASIS.has(n.tagName))
}

function text(el) {
  return (el?.textContent || '').replace(/\s+/g, ' ').trim()
}

function truncate(s, max = 220) {
  if (s.length <= max) return s
  return s.slice(0, s.lastIndexOf(' ', max)).replace(/[,.;:]$/, '') + '...'
}

export function parseNews(html) {
  const body = new DOMParser().parseFromString(html, 'text/html').body
  const first = body.firstElementChild

  let dateText = ''
  const credits = []
  if (isCreditsParagraph(first)) {
    const lines = first.innerHTML.split(/<br\s*\/?>/i).map((l) => text(new DOMParser().parseFromString(l, 'text/html').body)).filter(Boolean)
    for (const line of lines) {
      const m = line.match(/^([^:]{2,30}):\s*(.+)$/)
      if (m) credits.push({ label: m[1], value: m[2] })
      else if (!dateText) dateText = line
    }
    first.remove()
  }

  let lede = ''
  const next = body.firstElementChild
  if (credits.length && next && /^H[2-3]$/.test(next.tagName)) {
    lede = text(next)
    next.remove()
  }

  const firstParagraph = [...body.querySelectorAll('p')].map(text).find(Boolean) || ''
  const firstImage = body.querySelector('img')?.getAttribute('src') || null

  return {
    dateText,
    credits,
    lede,
    body: body.innerHTML,
    excerpt: truncate(lede || firstParagraph),
    firstImage,
  }
}
