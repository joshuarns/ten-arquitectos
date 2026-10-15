import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import NewsCard from '../components/NewsCard'
import Reveal from '../components/Reveal'
import { getPostBySlug, getPosts } from '../lib/wp'

function useNewsPost(slug) {
  const [state, setState] = useState({ post: null, more: [], loading: true, slug: null })

  useEffect(() => {
    let cancelled = false
    Promise.all([getPostBySlug(slug), getPosts({ perPage: 4 }).catch(() => ({ posts: [] }))])
      .then(([post, { posts }]) => {
        if (cancelled) return
        const more = posts.filter((p) => p.slug && p.slug !== slug).slice(0, 3)
        setState({ post, more, loading: false, slug })
      })
      .catch(() => !cancelled && setState({ post: null, more: [], loading: false, slug }))
    return () => {
      cancelled = true
    }
  }, [slug])

  // A new slug is loading until its own result arrives.
  return state.slug === slug ? state : { post: null, more: [], loading: true }
}

export default function NewsPost() {
  const { slug } = useParams()
  const { post, more, loading } = useNewsPost(slug)

  useEffect(() => {
    if (post) document.title = `${post.title} | TEN Arquitectos`
  }, [post])

  return (
    // pt-16 clears the fixed header.
    <div className="pt-16 bg-surface-container-lowest">
      <article className="px-margin-mobile md:px-margin-desktop pt-12 md:pt-20 pb-24 md:pb-32 min-h-screen">
        <div className="max-w-max-width mx-auto">
          <Link className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary uppercase tracking-widest hover:gap-4 transition-all duration-300 mb-12 md:mb-20" to="/news">
            <Icon name="arrow_back" className="text-sm" /> All News
          </Link>

          {loading && <p className="font-label-sm text-label-sm text-muted-silver uppercase tracking-widest">Loading…</p>}

          {!loading && !post && <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Post not found.</h2>}

          {post && (
            <>
              {/* Header */}
              <header className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-16 md:mb-24">
                <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-label-sm text-label-sm text-brand uppercase tracking-widest">News</span>
                    <time className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{post.date}</time>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight mb-8">{post.title}</h1>
                  {post.lede && <p className="font-body-lg text-body-lg md:text-[22px] md:leading-[34px] text-on-surface-variant">{post.lede}</p>}
                  {post.credits.length > 0 && (
                    <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-6 border-y border-outline-variant py-6">
                      {post.credits.map((c) => (
                        <div key={c.label} className="flex flex-col gap-1">
                          <dt className="font-label-sm text-label-sm text-muted-silver uppercase tracking-widest">{c.label}</dt>
                          <dd className="font-body-md text-body-md text-primary">{c.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </header>

              {/* Featured image, if the post has one */}
              {post.image && post.image !== post.content.match(/<img[^>]+src="([^"]+)"/)?.[1] && (
                <div className="aspect-[16/9] overflow-hidden mb-16 md:mb-24 bg-surface-container">
                  <img className="w-full h-full object-cover" src={post.image} alt={post.imageAlt || post.title} />
                </div>
              )}

              {/* Body */}
              <div className="news-body mx-auto max-w-[760px]" dangerouslySetInnerHTML={{ __html: post.content }} />
            </>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30">
          <Reveal className="max-w-max-width mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h3 className="font-headline-lg text-headline-lg-mobile text-primary">More News</h3>
              <Link className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" to="/news">View All News</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {more.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  )
}
