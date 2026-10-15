import { parseProject } from './project'
import { parseNews } from './news'

const API = (import.meta.env.VITE_WP_API_URL || '/wp-json').replace(/\/$/, '')
const USE_PROXY = !import.meta.env.VITE_WP_API_URL
const NEWS_CATEGORY = import.meta.env.VITE_WP_NEWS_CATEGORY || 'news'
const PROJECTS_CATEGORY = import.meta.env.VITE_WP_PROJECTS_CATEGORY || 'projects'

const categoryIds = new Map()

async function request(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`WordPress ${res.status}: ${path}`)
  return {
    data: await res.json(),
    totalPages: Number(res.headers.get('X-WP-TotalPages') || 1),
  }
}

// With the proxy, the CMS's own media is served through /wp-content too, so its
// absolute URLs become relative (the CMS has no valid SSL certificate). Media
// hosted elsewhere (e.g. images embedded from another site) is left alone.
/* global __WP_HOST__ */
const WP_MEDIA = new RegExp(`https?://${__WP_HOST__.replace(/[.]/g, '\\.')}(?=/wp-content/)`, 'g')

export function mediaUrl(url) {
  return USE_PROXY && url ? url.replace(WP_MEDIA, '') : url
}

function rewriteMedia(html) {
  return USE_PROXY ? html.replace(WP_MEDIA, '') : html
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

function normalizeNews(post) {
  const base = normalize(post)
  const news = parseNews(base.content)
  return {
    ...base,
    // The article's own date ("octubre 7, 2026") wins over the publish date.
    date: news.dateText ? news.dateText.toUpperCase() : base.date,
    excerpt: news.excerpt || base.excerpt,
    content: news.body,
    lede: news.lede,
    credits: news.credits,
    // No featured image → use the first image in the article for cards.
    image: base.image || news.firstImage,
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

// News = posts in the VITE_WP_NEWS_CATEGORY category ("news" by default).
// No such category yet → no posts, so the design's placeholders are shown.
export async function getPosts({ perPage = 3, page = 1 } = {}) {
  const category = await categoryId(NEWS_CATEGORY)
  if (NEWS_CATEGORY && !category) return { posts: [], totalPages: 1 }
  const params = new URLSearchParams({ _embed: 'wp:featuredmedia', per_page: perPage, page })
  if (category) params.set('categories', category)
  const { data, totalPages } = await request(`/wp/v2/posts?${params}`)
  return { posts: data.map(normalizeNews), totalPages }
}

export async function getPostBySlug(slug) {
  const { data } = await request(`/wp/v2/posts?_embed=wp:featuredmedia&slug=${encodeURIComponent(slug)}`)
  return data[0] ? normalizeNews(data[0]) : null
}

// Projects = posts in VITE_WP_PROJECTS_CATEGORY ("projects" by default); if that
// category does not exist, every post that is not News.
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
