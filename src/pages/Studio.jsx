import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'

// Markup ported from the Stitch export "stitch_ten_arquitectos_website_redesign (3)/code.html".

const disciplines = [
  { label: '01 / TIPOLOGÍA', icon: 'museum', title: 'Arquitectura Pública y Cultural', text: 'Museos, bibliotecas, centros universitarios e instalaciones escénicas articuladas para provocar el encuentro ciudadano y enriquecer la vida democrática comunitaria.' },
  { label: '02 / ESCALA', icon: 'map', title: 'Regeneración Urbana y Masterplans', text: 'Estrategias a gran escala para suturar cicatrices industriales, reactivar frentes marítimos y diseñar marcos regulatorios resilientes frente a la densificación.' },
  { label: '03 / METODOLOGÍA', icon: 'science', title: 'Investigación Tectónica y Sostenibilidad', text: 'Estudio riguroso de envolventes de bajo impacto, modelado paramétrico solar, materiales de huella neutra y fachadas autoventiladas integradas al clima local.' },
  { label: '04 / HÁBITAT', icon: 'location_city', title: 'Residencial e Infraestructura Cívica', text: 'Complejos de vivienda colectiva densa e infraestructura de transporte multimodal diseñados para maximizar la luz natural, la acústica serena y la dignidad del usuario.' },
]

const team = [
  {
    label: '01 / FUNDADOR',
    name: 'Enrique Norten',
    role: 'Founder & Principal Architect (Hon. FAIA)',
    image: '/images/enrique-norten-lounge.jpg',
    alt: 'Enrique Norten - Founder & Principal Architect at TEN Arquitectos',
    text: 'Fundador de TEN Arquitectos en 1986. Reconocido internacionalmente por posicionar la arquitectura contemporánea mexicana en el diálogo global y catedrático distinguido en UPenn, Harvard y Cornell.',
    to: '/enrique-norten',
  },
  {
    label: '02 / ASOCIADO',
    name: 'Carlos Coronado',
    role: 'Partner & Managing Director',
    image: '/images/carlos-coronado.jpg',
    alt: 'Carlos Coronado - Partner & Managing Director at TEN Arquitectos',
    text: 'Dirección de operaciones de proyecto en la oficina de Nueva York. Coordina concursos internacionales, consorcios de ingeniería y la gobernanza administrativa del estudio global.',
  },
  {
    label: '03 / INVESTIGACIÓN',
    name: 'Elena Palacios',
    role: 'Partner & Head of Architectural Research',
    image: '/images/elena-palacios.jpg',
    alt: 'Elena Palacios - Partner & Head of Architectural Research at TEN Arquitectos',
    text: 'Especialista en innovación en sistemas constructivos, vidrio estructural de alta eficiencia y diseño bioclimático sustentable aplicado a geometrías complejas.',
  },
  {
    label: '04 / DIRECCIÓN NY',
    name: 'Mateo Rivas',
    role: 'Partner & Studio Director NY',
    image: '/images/mateo-rivas.jpg',
    alt: 'Mateo Rivas - Partner & Studio Director NY at TEN Arquitectos',
    text: 'Lidera la sede de Nueva York con enfoque en intervenciones de uso mixto, rascacielos residenciales e infraestructuras cívicas a lo largo del corredor este de Norteamérica.',
  },
  {
    label: '05 / DIRECCIÓN MEX',
    name: 'Sofía Valdés',
    role: 'Partner & Practice Leader MEX',
    image: '/images/sofia-valdes.jpg',
    alt: 'Sofía Valdés - Partner & Practice Leader MEX at TEN Arquitectos',
    text: 'Encabeza el taller de Ciudad de México coordinando programas institucionales, proyectos de preservación patrimonial y desarrollo de vivienda colectiva contemporánea en América Latina.',
  },
]

function ProfileLink({ to }) {
  const className = 'inline-flex items-center gap-2 font-label-sm text-label-sm text-primary hover:text-secondary tracking-widest uppercase transition-colors'
  const content = (
    <>
      <span>Ver perfil completo</span>
      <Icon name="arrow_forward" className="text-sm" />
    </>
  )
  return to ? <Link className={className} to={to}>{content}</Link> : <a className={className} href="#">{content}</a>
}

// The design lifts the mailto buttons 2px on hover with a small script.
const lift = 'hover:-translate-y-[2px] transition-all duration-200'

export default function Studio() {
  useEffect(() => {
    document.title = 'Studio | TEN Arquitectos'
  }, [])

  return (
    // pt-16 clears the fixed header, which the design overlays on the content.
    <div className="flex flex-col w-full pt-16">
      {/* Studio Space & Transdisciplinary Text */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-8 md:py-16 bg-surface-container-low">
        <Reveal className="max-w-max-width mx-auto flex flex-col gap-8 md:gap-12">
          <div className="w-full overflow-hidden rounded-lg aspect-[16/9] bg-surface-container-high">
            <img alt="The interior of TEN Arquitectos modern studio, team working in a bright open architectural space" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" src="/images/studio-interior.png" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4">
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">PRÁCTICA TRANSDISCIPLINAR</p>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-2">Rigor tectónico y escala colectiva</h3>
            </div>
            <div className="md:col-span-8 flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md">
              <p>
                Desde nuestra fundación en 1986, TEN Arquitectos ha concebido la práctica proyectual como una intersección dinámica entre geografía, comunidad y tecnología constructiva. Con cuatro décadas de exploración formal ininterrumpida, abordamos la disciplina rechazando soluciones preconcebidas.
              </p>
              <p>
                Nuestra labor oscila libremente entre intervenciones museográficas intimistas y megainfraestructuras cívicas que redefinen la fisonomía metropolitana. Creemos en la porosidad estructural, la transparencia honesta y la dignidad espacial como vehículos fundamentales de equidad social y regeneración ecológica.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Disciplines & Approach */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-12 bg-deep-obsidian text-on-primary">
        <Reveal className="max-w-max-width mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim">ÁREAS DE ENFOQUE</span>
            <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tight">Disciplinas &amp; Campos de Acción</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disciplines.map((d) => (
              <div key={d.label} className="p-6 bg-primary-container rounded-lg flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim">{d.label}</span>
                  <Icon name={d.icon} className="text-primary-fixed-dim" />
                </div>
                <h4 className="font-headline-md text-headline-md text-surface-container-lowest">{d.title}</h4>
                <p className="font-body-md text-body-md text-on-primary-container">{d.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Team & Leadership Profiles */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        <Reveal className="max-w-max-width mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">EQUIPO DIRECTIVO &amp; SOCIOS</span>
            <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">Team &amp; Leadership</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Liderazgo, socios y equipo directivo que articulan cada proyecto desde el concepto conceptual hasta la ejecución constructiva en obra.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-surface-container-low rounded-lg p-5 flex flex-col justify-between group border border-outline-variant/40 hover:border-primary transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-28 sm:w-28 sm:h-32 flex-shrink-0 bg-surface-container-high rounded overflow-hidden">
                      <img alt={m.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" src={m.image} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">{m.label}</span>
                      <h4 className="font-headline-md text-headline-md text-on-surface leading-snug">{m.name}</h4>
                      <p className="font-label-sm text-label-sm text-primary font-medium mt-1">{m.role}</p>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{m.text}</p>
                </div>
                <div className="pt-4 border-t border-outline-variant/30 mt-4">
                  <ProfileLink to={m.to} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Careers, Talent & Press Inquiries */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        <Reveal className="max-w-max-width mx-auto flex flex-col gap-8">
          <div className="bg-surface-container p-8 md:p-12 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">TALENTO &amp; COMUNICACIÓN</span>
              <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">Join our team</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Buscamos constantemente arquitectos, investigadores y urbanistas apasionados por el rigor material y el pensamiento espacial transformador.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a className={`px-6 py-4 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider rounded text-center hover:bg-secondary ${lift}`} href="mailto:join@ten-arquitectos.com">
                join@ten-arquitectos.com
              </a>
              <a className={`px-6 py-4 bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-wider rounded text-center hover:bg-surface-dim ${lift}`} href="mailto:press@ten-arquitectos.com">
                press@ten-arquitectos.com
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface-container-low rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="work" className="text-secondary mt-1" />
              <div>
                <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Careers &amp; Internships</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Recepción permanente de portafolios (PDF menor a 15MB) para plazas en CDMX y Nueva York.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="menu_book" className="text-secondary mt-1" />
              <div>
                <p className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Press &amp; Monograph Requests</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Solicitud de kits de prensa, material fotográfico de alta resolución y consultas monográficas.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
