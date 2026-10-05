import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Accordion from '../components/project/Accordion'
import { ImageBox } from '../components/project/Gallery'
import useProjects from '../hooks/useProjects'

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

export default function ProjectsIndex() {
  const { projects, loading } = useProjects()

  useEffect(() => {
    document.title = 'Projects | TEN Arquitectos'
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Grid */}
      <section className="px-[6vw] md:px-[5vw] pt-[97px] md:pt-[160px] pb-[54px]">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-y-[30px] md:gap-x-[20px] md:gap-y-[29px] transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {projects.map((p) => (
            <Link key={p.id} to={`/proyectos/${p.slug}`} className="group block">
              <ImageBox
                image={p.image && { src: p.image, alt: p.imageAlt || p.title }}
                className="w-full aspect-[309/232] [&>img]:transition-opacity [&>img]:duration-300 group-hover:[&>img]:opacity-80"
              />
              <h3 className="jsa-text font-semibold uppercase leading-[20px] mt-[14px]">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Chronological list */}
      {projects.length > 0 && (
        <section className="px-[6vw] md:px-[5vw] pt-[48px] pb-[64px] md:pb-[133px]">
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
        </section>
      )}
    </div>
  )
}
