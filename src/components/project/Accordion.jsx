import { useId, useState } from 'react'

// Accordion from jsa.com.mx: 1px black hairlines, 48px rows, chevron on the
// right, several items can be open at once.
export default function Accordion({ items, defaultOpen = [], className = '' }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen))
  const id = useId()

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <ul className={className}>
      {items.map((item, i) => {
        const isOpen = open.has(i)
        return (
          <li key={item.label}>
            {i === 0 && <div className="h-px bg-black" aria-hidden="true"></div>}
            <h4>
              <button
                className="w-full h-12 flex items-center justify-between text-left"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => toggle(i)}
              >
                <span className="jsa-text font-semibold pr-[14px]">{item.label}</span>
                <span className="w-[14px] h-[14px] flex items-center justify-center" aria-hidden="true">
                  <span
                    className={`block w-[10px] h-[10px] border-r border-b border-black transition-transform duration-300 ${isOpen ? 'rotate-[225deg] translate-y-[3px]' : 'rotate-45 -translate-y-[2.5px]'}`}
                  ></span>
                </span>
              </button>
            </h4>
            {isOpen && (
              <div id={`${id}-${i}`} role="region" className="jsa-text pb-[30px]">
                {item.content}
              </div>
            )}
            <div className="h-px bg-black" aria-hidden="true"></div>
          </li>
        )
      })}
    </ul>
  )
}
