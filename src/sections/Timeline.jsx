import Reveal from '../components/Reveal'
import { timeline } from '../data/content'

export default function Timeline() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <Reveal className="max-w-max-width mx-auto px-margin-mobile mb-12">
        <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">Project Timeline</h3>
      </Reveal>
      <Reveal className="flex overflow-x-auto no-scrollbar snap-x gap-8 px-margin-mobile pb-8">
        {timeline.map((item) => (
          <div key={item.title} className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden mb-6 bg-surface-container">
              <img alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src={item.image} />
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-label-sm text-label-sm text-muted-silver">{item.year}</span>
              <h4 className="font-headline-md text-[20px] text-primary">{item.title}</h4>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
