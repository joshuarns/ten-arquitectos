import { useEffect, useState } from 'react'
import { getPosts } from '../lib/wp'
import { placeholderNews } from '../data/content'

// Loads News posts from WordPress. Falls back to the design's placeholder
// news while WordPress has no posts (or is unreachable).
export default function usePosts({ perPage = 3, page = 1 } = {}) {
  const [state, setState] = useState({ posts: [], totalPages: 1, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true }))
    getPosts({ perPage, page })
      .then(({ posts, totalPages }) => {
        if (cancelled) return
        const empty = posts.length === 0 && page === 1
        setState({ posts: empty ? placeholderNews : posts, totalPages, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        console.error(error)
        setState({ posts: placeholderNews, totalPages: 1, loading: false, error })
      })
    return () => {
      cancelled = true
    }
  }, [perPage, page])

  return state
}
