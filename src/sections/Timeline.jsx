import { useId, useState } from 'react'
import Reveal from '../components/Reveal'
import { timelineDecades, timelineRange, timelineTitle } from '../data/timeline'

const BLUE = '#4b5ea8'
// Height of a collapsed decade row; the decade arrow sits on its centre line.
const ROW = 48

function Arrow({ color }) {
  return (
    <svg width="68" height="6" viewBox="0 0 68 6" className="block" aria-hidden="true">
      <line x1="1" y1="3" x2="68" y2="3" stroke={color} strokeWidth="1" />
      <polyline points="4,1 1,3 4,5" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  )
}

function DecadeMark({ year, color = BLUE }) {
  return (
    <div className="absolute left-0 right-0 -translate-y-1/2 flex items-center ml-[188px]" style={{ top: ROW / 2 }}>
      <Arrow color={color} />
      {year && <span className="ml-[8px] text-[13px] font-semibold" style={{ color: BLUE }}>{year}</span>}
    </div>
  )
}

// Ruler segment beside one decade: the decade arrow on the title row and, when
// the decade is open, a tick per year spread over its text.
function Segment({ start, open, isLast }) {
  const { founded } = timelineRange
  const at = (year) => `calc(${ROW / 2}px + (100% - ${ROW / 2}px) * ${(year - start) / 10})`

  return (
    <div className="relative w-[300px] shrink-0 hidden md:block" aria-hidden="true">
      <div
        className="absolute left-[222px] w-px bg-black/[0.06]"
        style={{ top: start === timelineRange.from ? ROW / 2 : 0, bottom: isLast ? ROW / 2 : 0 }}
      />
      {isLast ? <DecadeMark color="#555" /> : <DecadeMark year={start} />}
      {open &&
        Array.from({ length: 9 }, (_, i) => start + i + 1).map((year) => (
          <div key={year} className="absolute left-0 right-0 -translate-y-1/2" style={{ top: at(year) }}>
            {year === founded ? (
              <div className="flex items-center">
                <span className="w-[140px] pr-[4px] text-right text-[13px] font-semibold" style={{ color: BLUE }}>TEN Arquitectos</span>
                <div className="w-[75px] h-px bg-black/[0.1]" />
                <div className="w-[15px] h-[15px] rounded-full -ml-[0.5px]" style={{ background: BLUE }} />
              </div>
            ) : (
              <div className="ml-[143px] w-[115px] h-px bg-black/[0.08]" />
            )}
          </div>
        ))}
    </div>
  )
}

export default function Timeline() {
  const [open, setOpen] = useState(() => new Set())
  const id = useId()

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section className="bg-white text-black px-[6vw] md:px-[5vw] py-[64px] md:py-[120px]">
      <Reveal className="flex flex-col items-center">
        <div className="flex w-full md:w-auto md:gap-[46px]">
          <div className="w-[300px] shrink-0 hidden md:block" />
          <h3 className="jsa-text font-bold mb-[16px] w-full md:w-[560px]">{timelineTitle}</h3>
        </div>
        {timelineDecades.map((decade, i) => {
          const isOpen = open.has(i)
          return (
            <div key={decade.title} className="flex w-full md:w-auto md:gap-[46px]">
              <Segment start={timelineRange.from + i * 10} open={isOpen} />
              <article className="jsa-text w-full md:w-[560px]">
                <h4>
                  <button
                    className="w-full flex items-center justify-between text-left font-bold"
                    style={{ height: ROW }}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="pr-[14px]">{decade.title}</span>
                    <span className="w-[14px] h-[14px] flex items-center justify-center" aria-hidden="true">
                      <span
                        className={`block w-[8px] h-[8px] border-r border-b border-black transition-transform duration-300 ${isOpen ? 'rotate-[225deg] translate-y-[2px]' : 'rotate-45 -translate-y-[2px]'}`}
                      ></span>
                    </span>
                  </button>
                </h4>
                {isOpen && (
                  <div id={`${id}-${i}`} role="region" className="pt-[8px] pb-[40px]">
                    <p className="mb-[16px]">{decade.en}</p>
                    <p className="mb-[16px] italic" style={{ color: BLUE }}>{decade.es}</p>
                    <p className="italic">{decade.works.join(' · ')}</p>
                  </div>
                )}
              </article>
            </div>
          )
        })}
        {/* Closing arrow for the decade still being written. */}
        <div className="hidden md:flex md:gap-[46px]" aria-hidden="true">
          <Segment start={timelineRange.to} isLast />
          <div className="w-[560px]" style={{ height: ROW }} />
        </div>
      </Reveal>
    </section>
  )
}
