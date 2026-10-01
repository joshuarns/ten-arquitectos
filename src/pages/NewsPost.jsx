import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getPostBySlug } from '../lib/wp'

export default function NewsPost() {
  const { slug } = useParams()
  const [state, setState] = useState({ post: null, loading: true })

  useEffect(() => {
    let cancelled = false
    setState({ post: null, loading: true })
    getPostBySlug(slug)
      .then((post) => !cancelled && setState({ post, loading: false }))
      .catch(() => !cancelled && setState({ post: null, loading: false }))
    return () => {
      cancelled = true
    }
  }, [slug])

  const { post, loading } = state

  return (
    <article className="pt-40 pb-32 px-margin-mobile md:px-margin-desktop min-h-screen">
      <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 md:col-start-3">
          <Link className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary uppercase tracking-widest hover:gap-4 transition-all duration-300 mb-16" to="/news">
            <Icon name="arrow_back" className="text-sm" /> All News
          </Link>

          {loading && <p className="font-label-sm text-label-sm text-muted-silver uppercase tracking-widest">Loading…</p>}

          {!loading && !post && (
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Post not found.</h2>
          )}

          {post && (
            <>
              <time className="font-label-sm text-label-sm text-secondary block mb-6 uppercase tracking-widest">{post.date}</time>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-12">{post.title}</h2>
              {post.image && (
                <div className="aspect-[16/9] overflow-hidden mb-16 bg-surface-container">
                  <img className="w-full h-full object-cover" src={post.image} alt={post.imageAlt || post.title} />
                </div>
              )}
              <div className="wp-content font-body-lg text-body-lg text-secondary" dangerouslySetInnerHTML={{ __html: post.content }} />
            </>
          )}
        </div>
      </div>
    </article>
  )
}
