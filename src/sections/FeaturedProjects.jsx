import Reveal from '../components/Reveal'
import { featuredProjects } from '../data/content'

export default function FeaturedProjects() {
  return (
    <section className="py-32 px-margin-mobile">
      <Reveal className="max-w-max-width mx-auto">
        <div className="mb-16 flex justify-between items-end">
          <h3 className="font-headline-lg text-headline-lg-mobile text-primary">Featured Projects</h3>
          <a className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" href="#">View Archive</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-16">
          {featuredProjects.map((project) => (
            <div key={project.title} className="group">
              <div className="overflow-hidden mb-6 aspect-[4/3] bg-surface-container">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={project.title} src={project.image} />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-widest">{project.category}</p>
                  <h4 className="font-headline-md text-body-lg font-bold text-primary">{project.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
