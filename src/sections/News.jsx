import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import NewsCard from '../components/NewsCard'
import usePosts from '../hooks/usePosts'

export default function News() {
  const { posts } = usePosts({ perPage: 3 })

  return (
    <section className="py-32 px-margin-mobile bg-surface-container-lowest border-t border-outline-variant/30">
      <Reveal className="max-w-max-width mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h3 className="font-headline-lg text-headline-lg-mobile text-primary">News</h3>
          <Link className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" to="/news">View All News</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
