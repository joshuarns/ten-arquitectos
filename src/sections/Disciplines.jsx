import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { disciplines } from '../data/content'

export default function Disciplines() {
  return (
    <section className="py-24 bg-surface px-margin-mobile border-y border-outline-variant/30">
      <Reveal className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-3">
          <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest pt-4">Disciplines</h3>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-col">
            {disciplines.map((name) => (
              <a key={name} className="group flex items-center justify-between py-10 border-b border-outline-variant hover:bg-surface-container-low transition-colors px-4 -mx-4" href="#">
                <span className="font-display-lg text-[40px] md:text-[64px] text-primary group-hover:translate-x-4 transition-transform duration-500">{name}</span>
                <Icon name="arrow_forward" className="text-muted-silver opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
