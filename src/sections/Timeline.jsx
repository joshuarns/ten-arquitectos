import Reveal from '../components/Reveal'
import { timelineDecades, timelineRange, timelineTitle } from '../data/timeline'

const BLUE = '#4b5ea8'

// Vertical position of a year along the ruler, as a percentage.
const at = (year) => `${((year - timelineRange.from) / (timelineRange.to - timelineRange.from)) * 100}%`

function Arrow({ color }) {
  return (
    <svg width="68" height="6" viewBox="0 0 68 6" className="block" aria-hidden="true">
      <line x1="1" y1="3" x2="68" y2="3" stroke={color} strokeWidth="1" />
      <polyline points="4,1 1,3 4,5" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  )
}

// Year ruler: a tick per year, an arrow and label per decade, and a dot on the founding year.
function Ruler() {
  const { from, to, founded } = timelineRange
  const years = Array.from({ length: to - from + 1 }, (_, i) => from + i)

  return (
    <div className="relative w-[300px] shrink-0 hidden md:block" aria-hidden="true">
      <div className="absolute top-[10px] bottom-[50px] left-0 right-0">
        <div className="absolute top-0 bottom-0 left-[222px] w-px bg-black/[0.06]" />
        {years.map((year) => {
          const decade = year % 10 === 0
          return (
            <div key={year} className="absolute left-0 right-0 -translate-y-1/2" style={{ top: at(year) }}>
              {decade ? (
                <div className="flex items-center ml-[188px]">
                  <Arrow color={year === to ? '#555' : BLUE} />
                  {year !== to && (
                    <span className="ml-[8px] text-[13px] font-semibold" style={{ color: BLUE }}>{year}</span>
                  )}
                </div>
              ) : (
                <div className="ml-[143px] w-[115px] h-px bg-black/[0.08]" />
              )}
            </div>
          )
        })}
        <div className="absolute left-0 right-0 -translate-y-1/2 flex items-center" style={{ top: at(founded) }}>
          <span className="w-[140px] pr-[4px] text-right text-[13px] font-semibold" style={{ color: BLUE }}>TEN Arquitectos</span>
          <div className="w-[75px] h-px bg-black/[0.1]" />
          <div className="w-[15px] h-[15px] rounded-full -ml-[0.5px]" style={{ background: BLUE }} />
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section className="bg-white text-black px-[6vw] md:px-[5vw] py-[64px] md:py-[120px]">
      <Reveal className="flex justify-center gap-[46px]">
        <Ruler />
        <div className="jsa-text max-w-[560px]">
          <h3 className="font-bold mb-[16px]">{timelineTitle}</h3>
          {timelineDecades.map((decade) => (
            <article key={decade.title} className="mb-[48px] last:mb-0">
              <h4 className="font-bold mb-[16px]">{decade.title}</h4>
              <p className="mb-[16px]">{decade.en}</p>
              <p className="mb-[16px] italic" style={{ color: BLUE }}>{decade.es}</p>
              <p className="italic">{decade.works.join(' · ')}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
