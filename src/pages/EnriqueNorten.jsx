import { useEffect } from 'react'
import Icon from '../components/Icon'

// Markup ported from the Stitch export "stitch_ten_arquitectos_website_redesign (2)/code.html".

const education = [
  { degree: 'Master of Architecture', school: 'Cornell University', place: 'Ithaca, New York' },
  { degree: 'Bachelor of Architecture', school: 'Universidad Iberoamericana', place: 'Mexico City' },
]

const chairs = [
  { title: 'Miller Chair', school: 'University of Pennsylvania (Weitzman School)' },
  { title: 'Eero Saarinen Visiting Professor', school: 'Yale University School of Architecture' },
  { title: 'Visiting Critic', school: 'Harvard Graduate School of Design (GSD)' },
  { title: 'Visiting Professor', school: 'Columbia University GSAPP' },
]

const honors = [
  { title: 'Honorary Fellow (Hon. FAIA)', org: 'American Institute of Architects', region: 'USA' },
  { title: 'Premio Nacional de Artes y Literatura', org: 'National Council for Culture & Arts', region: 'MEX' },
  { title: 'Leonardo da Vinci World Award of Arts', org: 'World Cultural Council', region: 'INT' },
  { title: 'Medal of Merit in Arts and Culture', org: 'Congress of Mexico City', region: 'MEX' },
]

const works = [
  { year: '2015', place: 'Puebla, MEX', title: 'Museo Amparo Modernization', text: 'Vestibule restoration and glass roof pavilion framing the colonial rooftop panorama.' },
  { year: '2011', place: 'New York, USA', title: 'Mercedes House', text: 'Stepped terraced residential megastructure spanning an entire Midtown Manhattan city block.' },
  { year: '2018', place: 'Brooklyn, USA', title: 'BAM Cultural District Library', text: 'Civic and cultural volume integrated into the Downtown Brooklyn arts core.' },
  { year: '1994', place: 'Mexico City, MEX', title: 'Escuela Nacional de Teatro', text: 'National Arts Center (CNA); an iconic curved tensile steel canopy housing theatrical space.' },
  { year: '2005', place: 'Guadalajara, MEX', title: 'Guggenheim Hermitage Museum', text: 'Competition-winning proposal elevated over the Barranca de Huentitán gorge.' },
]

export default function EnriqueNorten() {
  useEffect(() => {
    document.title = 'Enrique Norten | TEN Arquitectos'
  }, [])

  return (
    // pt-16 clears the fixed header, which the design overlays on the content.
    <div className="flex flex-col w-full text-on-surface pt-16">
      <div className="px-margin-mobile md:px-margin-desktop pt-8 pb-16 border-b border-outline-variant/30 mb-20">
        <div className="flex items-center justify-between pb-8">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Leadership &amp; Practice</span>
          <span className="font-label-sm text-label-sm text-muted-silver">01 / PERS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col">
            <div className="relative w-full bg-surface-container overflow-hidden">
              <img alt="Portrait of Enrique Norten" className="w-full h-auto aspect-[3/4] object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700 ease-out" src="/images/enrique-norten-lounge.jpg" />
              <div className="p-3 bg-surface-container-lowest/90 backdrop-blur-sm flex justify-between items-center">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Mexico City / New York</span>
                <span className="font-label-sm text-label-sm text-muted-silver">Ph. Sarah Gore-Reeves</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3 pb-8 border-b border-outline-variant/30">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="font-headline-lg text-headline-lg-mobile text-primary tracking-tight">Enrique Norten</h1>
                <span className="font-label-sm text-label-sm uppercase text-secondary">Hon. FAIA</span>
              </div>
              <p className="font-body-md text-secondary tracking-normal">Founder &amp; Design Principal — TEN Arquitectos</p>
            </div>
            <div className="bg-surface-container-low p-8 mt-8">
              <span className="font-label-sm text-label-sm text-muted-silver uppercase tracking-widest mb-4 block">01 — Position</span>
              <blockquote className="font-headline-lg text-headline-lg-mobile text-primary leading-tight font-light mb-6">“Architecture is the discipline that connects the intimacy of human existence with the scale of the collective city.”</blockquote>
              <div className="w-12 h-[2px] bg-primary mb-6"></div>
              <p className="font-body-md text-secondary leading-relaxed">Founded in 1986 in Mexico City and extended to New York in 2000 and Miami in 2021, TEN Arquitectos operates as an open-ended laboratory. Norten’s inquiry interrogates structural transparency, democratic ground, and the atmospheric resonance of tectonic lightness.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-margin-mobile mb-20 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-2">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Biography</span>
          <span className="font-label-sm text-label-sm text-muted-silver">TEN / 1986—PRESENT</span>
        </div>
        <div className="bg-surface-container-lowest p-6 flex flex-col gap-4">
          <p className="font-body-md text-on-surface leading-relaxed">
            Enrique Norten initiated TEN Arquitectos (Taller de Enrique Norten) as a critical counterpoint to monolithic regionalism. His career spans over four decades of rigorous formal experimentation, positioning civic transparency as a political and spatial obligation.
          </p>
          <p className="font-body-md text-secondary leading-relaxed">
            The practice continuously negotiates scale—from hyper-dense urban master plans to porous cultural institutions—affirming that every architectural intervention participates directly in social ecology and the collective memory of the metropolis.
          </p>
        </div>
      </div>

      <div className="px-margin-mobile mb-20">
        <div className="flex items-center justify-between pb-3">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Academic Legacy</span>
          <span className="font-label-sm text-label-sm text-muted-silver">RESEARCH &amp; CHAIRS</span>
        </div>
        <div className="flex flex-col gap-3">
          {education.map((e) => (
            <div key={e.school} className="bg-surface-container-lowest p-5 flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-muted-silver uppercase">{e.degree}</span>
              <h4 className="font-headline-md text-body-lg text-primary">{e.school}</h4>
              <p className="font-body-md text-secondary text-sm">{e.place}</p>
            </div>
          ))}
          <div className="bg-surface-container-low p-5 flex flex-col gap-3 mt-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">Endowed Chairs &amp; Professorships</span>
            <ul className="flex flex-col gap-3 font-body-md text-secondary">
              {chairs.map((c) => (
                <li key={c.title} className="flex items-start gap-3">
                  <Icon name="north_east" className="text-primary text-sm mt-1" />
                  <span>
                    <strong className="text-primary font-medium">{c.title}</strong> — {c.school}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-margin-mobile mb-20">
        <div className="flex items-center justify-between pb-3">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Selected Honors</span>
          <span className="font-label-sm text-label-sm text-muted-silver">RECOGNITION</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-primary text-on-primary p-6 flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim">Inaugural Recipient — 1998</span>
            <h3 className="font-headline-md text-headline-md text-on-primary font-normal">Mies van der Rohe Prize</h3>
            <p className="font-body-md text-primary-fixed-dim text-sm">Latin American Architecture Prize for Televisa Mixed-Use Facility</p>
          </div>
          {honors.map((h) => (
            <div key={h.title} className="bg-surface-container-lowest p-5 flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h4 className="font-headline-md text-body-lg text-primary">{h.title}</h4>
                <p className="font-body-md text-secondary text-sm">{h.org}</p>
              </div>
              <span className="font-label-sm text-label-sm text-muted-silver">{h.region}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-margin-mobile mb-20">
        <div className="flex items-center justify-between pb-4">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Monoliths &amp; Works</span>
          <span className="font-label-sm text-label-sm text-muted-silver">CHRONOLOGY</span>
        </div>
        <div className="flex flex-col gap-3">
          {works.map((w) => (
            <div key={w.title} className="bg-surface-container-lowest p-5 flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="font-label-sm text-label-sm text-muted-silver">{w.year}</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{w.place}</span>
              </div>
              <h4 className="font-headline-md text-body-lg text-primary">{w.title}</h4>
              <p className="font-body-md text-secondary text-sm">{w.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-margin-mobile pb-16 flex flex-col gap-4">
        <div className="bg-surface-container p-6 flex flex-col gap-4">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Office Inquiries</span>
          <p className="font-body-md text-primary">Lectures, academic symposia, and monograph inquiries are coordinated via studio directors.</p>
          <div className="flex flex-col gap-2 pt-2">
            <a className="w-full bg-primary text-on-primary py-4 text-center font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-surface-variant transition-colors" href="mailto:press@ten-arquitectos.com">
              Contact Monograph Office
            </a>
            <a className="w-full bg-surface-container-highest text-primary py-4 text-center font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-dim transition-colors" href="#">
              View Complete Monograph (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
