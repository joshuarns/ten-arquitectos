import { useState } from 'react'
import Reveal from '../components/Reveal'
import NewsCard from '../components/NewsCard'
import usePosts from '../hooks/usePosts'

const PER_PAGE = 9

export default function NewsIndex() {
  const [page, setPage] = useState(1)
  const { posts, totalPages, loading } = usePosts({ perPage: PER_PAGE, page })

  return (
    <section className="pt-40 pb-32 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest min-h-screen">
      <Reveal className="max-w-max-width mx-auto">
        <span className="font-label-sm text-label-sm text-secondary block mb-6 uppercase tracking-[0.3em]">TEN Arquitectos</span>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-24">News</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 gap-y-24 transition-opacity ${loading ? 'opacity-40' : ''}`}>
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-24 pt-8 border-t border-outline-variant flex justify-between items-center">
            <button className="font-label-sm text-label-sm text-primary uppercase tracking-widest disabled:text-muted-silver" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
            <span className="font-label-sm text-label-sm text-muted-silver">{page} / {totalPages}</span>
            <button className="font-label-sm text-label-sm text-primary uppercase tracking-widest disabled:text-muted-silver" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        )}
      </Reveal>
    </section>
  )
}
