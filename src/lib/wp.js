import { parseProject } from './project'

const API = (import.meta.env.VITE_WP_API_URL || '/wp-json').replace(/\/$/, '')
const USE_PROXY = !import.meta.env.VITE_WP_API_URL
const NEWS_CATEGORY = import.meta.env.VITE_WP_NEWS_CATEGORY ?? 'noticias'
const PROJECTS_CATEGORY = import.meta.env.VITE_WP_PROJECTS_CATEGORY || ''

const categoryIds = new Map()

async function request(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`WordPress ${res.status}: ${path}`)
  return {
    data: await res.json(),
    totalPages: Number(res.headers.get('X-WP-TotalPages') || 1),
  }
}

// With the dev proxy, media is served through /wp-content too, so absolute
// CMS URLs become relative (the CMS SSL certificate is not valid yet).
export function mediaUrl(url) {
  return USE_PROXY && url ? url.replace(/^https?:\/\/[^/]+(?=\/wp-content\/)/, '') : url
}

function rewriteMedia(html) {
  return USE_PROXY ? html.replace(/https?:\/\/[^/"'\s]+(?=\/wp-content\/)/g, '') : html
}

export function decode(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').trim()
}

// "18 JUNE 2026", as in the design.
export function formatDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase()
}

function featured(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return { image: mediaUrl(media?.source_url) || null, imageAlt: media?.alt_text || '' }
}

function normalize(post) {
  return {
    id: post.id,
    slug: post.slug,
    date: formatDate(post.date),
    title: decode(post.title?.rendered),
    excerpt: decode(post.excerpt?.rendered).replace(/\s*\[(…|&hellip;|\.\.\.)\]\s*$/, '...'),
    content: rewriteMedia(post.content?.rendered || ''),
    ...featured(post),
  }
}

function normalizeProject(post) {
  const base = normalize(post)
  return {
    ...base,
    // "Casa P — TEN Arquitectos" → "Casa P"
    title: base.title.replace(/\s+[—–-]\s+TEN Arquitectos\s*$/i, ''),
    ...parseProject(base.content, post.acf, post.date),
  }
}

function categoryId(slug) {
  if (!slug) return Promise.resolve(null)
  if (!categoryIds.has(slug)) {
    categoryIds.set(
      slug,
      request(`/wp/v2/categories?slug=${encodeURIComponent(slug)}`)
        .then(({ data }) => data[0]?.id ?? null)
        // A failed lookup must not take down projects/news: treat as "no category".
        .catch((error) => {
          console.error(error)
          categoryIds.delete(slug)
          return null
        }),
    )
  }
  return categoryIds.get(slug)
}

// News = posts in the VITE_WP_NEWS_CATEGORY category ("noticias" by default).
// No such category yet → no posts, so the design's placeholders are shown.
export async function getPosts({ perPage = 3, page = 1 } = {}) {
  const category = await categoryId(NEWS_CATEGORY)
  if (NEWS_CATEGORY && !category) return { posts: [], totalPages: 1 }
  const params = new URLSearchParams({ _embed: 'wp:featuredmedia', per_page: perPage, page })
  if (category) params.set('categories', category)
  const { data, totalPages } = await request(`/wp/v2/posts?${params}`)
  return { posts: data.map(normalize), totalPages }
}

export async function getPostBySlug(slug) {
  const { data } = await request(`/wp/v2/posts?_embed=wp:featuredmedia&slug=${encodeURIComponent(slug)}`)
  return data[0] ? normalize(data[0]) : null
}

// Projects = posts in VITE_WP_PROJECTS_CATEGORY, or every post that is not News.
let projectsPromise

export function getProjects() {
  projectsPromise ??= (async () => {
    const [projectsCat, newsCat] = await Promise.all([categoryId(PROJECTS_CATEGORY), categoryId(NEWS_CATEGORY)])
    const params = new URLSearchParams({ _embed: 'wp:featuredmedia', per_page: 100 })
    if (projectsCat) params.set('categories', projectsCat)
    else if (newsCat) params.set('categories_exclude', newsCat)
    const { data } = await request(`/wp/v2/posts?${params}`)
    return data.map(normalizeProject)
  })().catch((error) => {
    projectsPromise = null
    throw error
  })
  return projectsPromise
}
