import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Accordion from './Accordion'

// Decade groups labelled with the years actually present: "2020 – 2024".
function byDecade(projects) {
  const groups = new Map()
  for (const p of [...projects].sort((a, b) => b.year - a.year)) {
    const decade = Math.floor(p.year / 10) * 10
    if (!groups.has(decade)) groups.set(decade, [])
    groups.get(decade).push(p)
  }
  return [...groups.entries()].map(([decade, items]) => {
    const years = items.map((p) => p.year)
    const from = Math.max(decade, Math.min(...years))
    const to = Math.min(decade + 9, Math.max(...years))
    const byYear = new Map()
    for (const p of items) {
      if (!byYear.has(p.year)) byYear.set(p.year, [])
      byYear.get(p.year).push(p)
    }
    return { label: from === to ? `${from}` : `${from} – ${to}`, years: [...byYear.entries()] }
  })
}

// Chronological list of projects, grouped by decade in an accordion.
export default function ProjectList({ projects }) {
  return (
    <>
      <div className="flex justify-between items-start mb-[23px] md:mb-[40px]">
        <p className="jsa-text font-semibold uppercase">Listado de proyectos</p>
        <p className="jsa-text">(Selección cronológica)</p>
      </div>
      <Accordion
        items={byDecade(projects).map((group) => ({
          label: group.label,
          content: group.years.map(([year, items], i) => (
            <Fragment key={year}>
              {i > 0 && <p className="mb-[16px]">&nbsp;</p>}
              <p className="mb-[16px] font-semibold">{year}</p>
              {items.map((p) => (
                <p key={p.id} className="mb-[16px] last:mb-0 whitespace-pre-wrap">
                  <Link className="hover:underline" to={`/proyectos/${p.slug}`}>
                    {p.title}
                    {p.tipologia && ` (${p.tipologia.toLowerCase()})`}
                  </Link>
                  {p.location && `  |  ${p.location}`}
                </p>
              ))}
            </Fragment>
          )),
        }))}
      />
    </>
  )
}
