import { Link } from 'react-router-dom'
import { ImageBox } from './Gallery'

export default function ProjectGrid({ projects, loading }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-y-[30px] md:gap-x-[20px] md:gap-y-[29px] transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
      {projects.map((p) => (
        <Link key={p.id} to={`/proyectos/${p.slug}`} className="group block">
          <ImageBox
            image={p.image && { src: p.image, alt: p.imageAlt || p.title }}
            className="w-full aspect-[309/232] [&>img]:transition-opacity [&>img]:duration-300 group-hover:[&>img]:opacity-80"
          />
          <h3 className="jsa-text font-semibold uppercase leading-[20px] mt-[14px]">{p.title}</h3>
        </Link>
      ))}
    </div>
  )
}
