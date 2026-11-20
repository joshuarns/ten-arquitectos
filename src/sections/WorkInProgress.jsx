import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { ImageBox } from '../components/project/Gallery'
import useWorkInProgress from '../hooks/useWorkInProgress'

const GAP = 20
const ARROW = 'w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors'

// Carousel of the "Work in Progress" posts. Cards match the projects grid: four
// across on desktop, the next one peeking on mobile.
//
// Endless loop: when the cards overflow, they are rendered three times and the
// scroller starts on the middle copy. Once scrolling settles in an outer copy it
// jumps, instantly, to the same card in the middle one, so it never runs out.
export default function WorkInProgress() {
  const items = useWorkInProgress()
  const scroller = useRef(null)
  const [loop, setLoop] = useState(false)

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    // Width of one copy of the cards, gap included.
    const setWidth = () => {
      const cards = el.children
      return loop ? cards[items.length].offsetLeft - cards[0].offsetLeft : el.scrollWidth + GAP
    }
    const jump = (left) => el.scrollTo({ left, behavior: 'instant' })

    const measure = () => {
      const overflows = setWidth() - GAP > el.clientWidth + 1
      if (overflows !== loop) setLoop(overflows)
      else if (loop) jump(setWidth())
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)

    let settle
    const onScroll = () => {
      if (!loop) return
      clearTimeout(settle)
      settle = setTimeout(() => {
        const width = setWidth()
        if (el.scrollLeft < width * 0.5) jump(el.scrollLeft + width)
        else if (el.scrollLeft >= width * 1.5) jump(el.scrollLeft - width)
      }, 150)
    }
    el.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', onScroll)
      clearTimeout(settle)
    }
  }, [items.length, loop])

  if (!items.length) return null

  const go = (step) => {
    const el = scroller.current
    const card = el.firstElementChild.offsetWidth + GAP
    // Move to the same card in the middle copy first, so an arrow click never
    // reaches the end of the rendered cards.
    if (loop) {
      const width = card * items.length
      const left = Math.round(el.scrollLeft / card) * card
      if (left < width) el.scrollTo({ left: left + width, behavior: 'instant' })
      else if (left >= width * 2) el.scrollTo({ left: left - width, behavior: 'instant' })
    }
    el.scrollBy({ left: step * card, behavior: 'smooth' })
  }

  const copies = loop ? [0, 1, 2] : [1]

  return (
    <section className="pb-32 px-margin-mobile" aria-label="Work in Progress">
      <Reveal className="max-w-max-width mx-auto">
        <div className="mb-16 flex justify-between items-center gap-4">
          <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Work in Progress</h3>
          {loop && (
            <div className="flex gap-4">
              <button className={ARROW} onClick={() => go(-1)} aria-label="Previous project">
                <Icon name="arrow_back" />
              </button>
              <button className={ARROW} onClick={() => go(1)} aria-label="Next project">
                <Icon name="arrow_forward" />
              </button>
            </div>
          )}
        </div>
        <ul ref={scroller} className="flex overflow-x-auto no-scrollbar snap-x" style={{ gap: GAP }}>
          {copies.flatMap((copy) =>
            items.map((item) => (
              <li key={`${copy}-${item.id}`} aria-hidden={copy !== 1 || undefined} className="snap-start shrink-0 w-[80%] md:w-[calc((100%-60px)/4)]">
                <ImageBox image={item.image && { src: item.image, alt: item.imageAlt || item.title }} className="w-full aspect-[309/232]" />
                <h4 className="jsa-text text-brand font-semibold uppercase leading-[20px] mt-[14px]">{item.title}</h4>
              </li>
            )),
          )}
        </ul>
      </Reveal>
    </section>
  )
}
