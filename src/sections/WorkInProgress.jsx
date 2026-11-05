import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { ImageBox } from '../components/project/Gallery'
import useWorkInProgress from '../hooks/useWorkInProgress'

const GAP = 20
const ARROW = 'w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none'

// Carousel of the "Work in Progress" posts. Cards match the projects grid: four
// across on desktop, the next one peeking on mobile.
export default function WorkInProgress() {
  const items = useWorkInProgress()
  const scroller = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 1,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [items.length])

  if (!items.length) return null

  const go = (step) => {
    const el = scroller.current
    el.scrollBy({ left: step * (el.firstElementChild.offsetWidth + GAP), behavior: 'smooth' })
  }

  return (
    <section className="pb-32 px-margin-mobile" aria-label="Work in Progress">
      <Reveal className="max-w-max-width mx-auto">
        <div className="mb-16 flex justify-between items-center gap-4">
          <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Work in Progress</h3>
          {!(edges.start && edges.end) && (
            <div className="flex gap-4">
              <button className={ARROW} onClick={() => go(-1)} disabled={edges.start} aria-label="Previous project">
                <Icon name="arrow_back" />
              </button>
              <button className={ARROW} onClick={() => go(1)} disabled={edges.end} aria-label="Next project">
                <Icon name="arrow_forward" />
              </button>
            </div>
          )}
        </div>
        <ul ref={scroller} className="flex overflow-x-auto no-scrollbar snap-x" style={{ gap: GAP }}>
          {items.map((item) => (
            <li key={item.id} className="snap-start shrink-0 w-[80%] md:w-[calc((100%-60px)/4)]">
              <ImageBox image={item.image && { src: item.image, alt: item.imageAlt || item.title }} className="w-full aspect-[309/232]" />
              <h4 className="jsa-text text-brand font-semibold uppercase leading-[20px] mt-[14px]">{item.title}</h4>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
