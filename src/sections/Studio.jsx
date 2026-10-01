import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function Studio() {
  return (
    <section className="py-40 bg-surface px-margin-mobile">
      <Reveal className="max-w-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left Column: Leadership Portrait */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-high">
              <img alt="Enrique Norten" className="w-full h-full object-cover" src="/images/lozano-house.png" />
            </div>
            <div className="mt-8 lg:absolute lg:bottom-0 lg:-right-12 lg:bg-background lg:p-8 lg:shadow-sm max-w-sm">
              <h4 className="font-headline-md text-primary mb-2">Enrique Norten</h4>
              <p className="font-label-sm text-secondary uppercase tracking-widest mb-4">Founder &amp; Principal</p>
              <p className="font-body-md text-secondary italic">"Our work is a continuous investigation of the intersection between human culture and the physical environment."</p>
            </div>
          </div>
          {/* Right Column: Philosophy & Studio */}
          <div className="flex flex-col order-1 lg:order-2">
            <span className="font-label-sm text-label-sm text-secondary block mb-6 uppercase tracking-[0.3em]">The Practice</span>
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary mb-12 leading-tight">
              Architecture as a cultural act that articulates space and time.
            </h2>
            <div className="aspect-[16/9] overflow-hidden mb-12 bg-surface-container">
              <img alt="Studio Atmosphere" className="w-full h-full object-cover grayscale" src="/images/nasa-glenn-center.png" />
            </div>
            <p className="font-body-lg text-secondary mb-8">
              With studios in Mexico City, New York, and Miami, TEN Arquitectos maintains a transdisciplinary approach that transcends scale and geography. We believe in the power of architecture to transform public life and foster sustainable urban evolution.
            </p>
            <a className="inline-flex items-center gap-4 font-label-sm text-label-sm text-primary uppercase tracking-widest hover:gap-6 transition-all duration-300" href="#">
              Read Our Story <Icon name="arrow_forward" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
