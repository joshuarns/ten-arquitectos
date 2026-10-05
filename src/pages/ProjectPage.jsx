import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from '../components/project/Accordion'
import Gallery, { ImageBox } from '../components/project/Gallery'
import useProjects from '../hooks/useProjects'

// "Colonia Condesa, Ciudad de México" → two lines, as in the reference.
function LocationLines({ text }) {
  const i = text.indexOf(', ')
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i + 1)}
      <br />
      {text.slice(i + 2)}
    </>
  )
}

function Html({ blocks }) {
  return <div className="jsa-prose" dangerouslySetInnerHTML={{ __html: blocks.join('') }} />
}

function Section({ section }) {
  if (section.type === 'text') {
    return (
      <section className="px-[6vw] md:px-[5vw] py-[30px] md:pt-[47px] md:pb-[48px]">
        <div className="md:ml-[41.6667%] md:w-[58.3333%]">
          <Html blocks={section.blocks} />
        </div>
      </section>
    )
  }
  if (section.type === 'gallery') {
    return (
      <section className="px-[6vw] md:px-[5vw] py-[30px] md:py-[47px]">
        <Gallery layout={section.layout} images={section.images} />
      </section>
    )
  }
  return (
    <section>
      <ImageBox image={section.image} className="w-full h-[320px] md:h-[630px]" />
    </section>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null

  useEffect(() => {
    if (project) document.title = `${project.title} | TEN Arquitectos`
  }, [project])

  if (loading) return <div className="bg-white min-h-screen" />

  if (!project) {
    return (
      <section className="bg-white min-h-screen px-[6vw] md:px-[5vw] pt-[128px] md:pt-[197px]">
        <h1 className="jsa-title">PROYECTO NO ENCONTRADO</h1>
        <Link className="jsa-text underline mt-6 inline-block" to="/proyectos">Ver proyectos</Link>
      </section>
    )
  }

  return (
    <article className="bg-white text-black">
      {/* Title + location */}
      <section className="px-[6vw] md:px-[5vw] pt-[128px] pb-[43px] md:h-[348px] md:pt-[197px] md:pb-0 md:flex md:items-start">
        <h1 className="jsa-title md:w-[41.6667%] md:pr-[24px]">{project.title}</h1>
        {project.location && (
          <p className="jsa-text mt-[10px] md:mt-0 md:w-[25%]">
            <LocationLines text={project.location} />
          </p>
        )}
      </section>

      {/* Hero */}
      <section>
        <ImageBox image={project.image && { src: project.image, alt: project.imageAlt || project.title }} className="w-full h-[720px]" />
      </section>

      {/* Info accordion + intro */}
      <section className="px-[6vw] md:px-[5vw] pt-[64px] pb-[30px] md:pt-[86px] md:pb-[75px] md:flex md:items-start">
        <Accordion
          className="md:w-[33.3333%] shrink-0"
          defaultOpen={[0]}
          items={project.info.map(({ label, value }) => ({
            label,
            content: <p className="whitespace-pre-line">{value || '—'}</p>,
          }))}
        />
        {project.intro.length > 0 && (
          <div className="mt-[62px] md:mt-0 md:ml-[8.3333%] md:w-[58.3333%]">
            <Html blocks={project.intro} />
          </div>
        )}
      </section>

      {project.sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}

      {/* Next project */}
      {next && (
        <section className="px-[6vw] md:px-[5vw] pt-[100px] pb-[60px] md:pt-[130px] flex justify-end">
          <Link to={`/proyectos/${next.slug}`} className="group inline-flex items-center gap-[24px]" aria-label={`Siguiente: ${next.title}`}>
            <span className="jsa-title leading-none">{next.title}</span>
            <svg className="w-[9px] h-[16px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 9 16" aria-hidden="true">
              <polyline fill="none" stroke="currentColor" strokeMiterlimit="10" points="1.6,1.2 6.5,7.9 1.6,14.7" />
            </svg>
          </Link>
        </section>
      )}
    </article>
  )
}
