import { useState } from 'react'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { heroSlides } from '../data/content'

export default function Hero() {
  const [current, setCurrent] = useState(null)
  const total = heroSlides.length
  const go = (step) => setCurrent((c) => ((c ?? 0) + step + total) % total)

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Reveal
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        id="hero-slider"
        style={current === null ? undefined : { transform: `translateX(-${current * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.title} className="min-w-full h-full relative">
            <img className="absolute inset-0 w-full h-full object-cover opacity-80" alt={slide.title} src={slide.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-32 left-margin-mobile right-margin-mobile">
              <p className="font-label-sm text-label-sm text-white/70 mb-2 uppercase tracking-widest">Selected Works</p>
              <h2 className="font-headline-lg text-headline-lg-mobile text-white mb-4">{slide.title}</h2>
              <div className="h-[1px] w-12 bg-white mb-4"></div>
              <p className="font-body-md text-white/80 max-w-sm">{slide.location}</p>
            </div>
          </div>
        ))}
      </Reveal>
      <Reveal className="absolute bottom-12 left-margin-mobile flex gap-4">
        <button className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-colors" onClick={() => go(-1)} aria-label="Previous slide">
          <Icon name="arrow_back" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-colors" onClick={() => go(1)} aria-label="Next slide">
          <Icon name="arrow_forward" />
        </button>
      </Reveal>
    </section>
  )
}
