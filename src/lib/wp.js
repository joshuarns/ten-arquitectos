const API = (import.meta.env.VITE_WP_API_URL || '/wp-json').replace(/\/$/, '')
const NEWS_CATEGORY = import.meta.env.VITE_WP_NEWS_CATEGORY || ''

let categoryIdPromise

async function request(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`WordPress ${res.status}: ${path}`)
  return {
    data: await res.json(),
    totalPages: Number(res.headers.get('X-WP-TotalPages') || 1),
  }
}

function decode(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').trim()
}

// "18 JUNE 2026", as in the design.
export function formatDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase()
}

function normalize(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: post.id,
    slug: post.slug,
    date: formatDate(post.date),
    title: decode(post.title?.rendered),
    excerpt: decode(post.excerpt?.rendered).replace(/\s*\[(…|&hellip;|\.\.\.)\]\s*$/, '...'),
    content: post.content?.rendered || '',
    image: media?.source_url || null,
    imageAlt: media?.alt_text || '',
  }
}

function newsCategoryId() {
  if (!NEWS_CATEGORY) return Promise.resolve(null)
  categoryIdPromise ??= request(`/wp/v2/categories?slug=${encodeURIComponent(NEWS_CATEGORY)}`).then(
    ({ data }) => data[0]?.id ?? null,
  )
  return categoryIdPromise
}

export async function getPosts({ perPage = 3, page = 1 } = {}) {
  const category = await newsCategoryId()
  const params = new URLSearchParams({ _embed: 'wp:featuredmedia', per_page: perPage, page })
  if (category) params.set('categories', category)
  const { data, totalPages } = await request(`/wp/v2/posts?${params}`)
  return { posts: data.map(normalize), totalPages }
}

export async function getPostBySlug(slug) {
  const { data } = await request(`/wp/v2/posts?_embed=wp:featuredmedia&slug=${encodeURIComponent(slug)}`)
  return data[0] ? normalize(data[0]) : null
}
