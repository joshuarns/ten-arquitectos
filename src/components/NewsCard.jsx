import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function NewsCard({ post }) {
  // Placeholder news (no slug) keeps the design's dead "#" link.
  const LinkTag = post.slug ? Link : 'a'
  const linkProps = post.slug ? { to: `/news/${post.slug}` } : { href: '#' }

  return (
    <article className="flex flex-col">
      <time className="font-label-sm text-label-sm text-secondary mb-4 uppercase tracking-widest">{post.date}</time>
      <h4 className="font-headline-md text-headline-md text-primary mb-6 leading-tight">{post.title}</h4>
      <p className="font-body-md text-secondary mb-6 line-clamp-3">{post.excerpt}</p>
      <LinkTag className="mt-auto inline-flex items-center gap-2 font-label-sm text-label-sm text-primary hover:gap-4 transition-all duration-300" {...linkProps}>
        READ MORE <Icon name="arrow_forward" className="text-sm" />
      </LinkTag>
    </article>
  )
}
