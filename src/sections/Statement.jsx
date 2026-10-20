import Reveal from '../components/Reveal'

export default function Statement() {
  return (
    <section className="py-32 px-margin-mobile max-w-max-width mx-auto">
      <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 md:col-start-3">
          <span className="font-label-sm text-label-sm text-secondary block mb-8 uppercase tracking-widest">Enrique Norten</span>
          <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface mb-12">
            TEN Arquitectos cuenta con 40 años de práctica profesional y en ese tiempo hemos construido algo que muy pocos despachos latinoamericanos han logrado: una presencia internacional real. Fuimos el primero en abrir una oficina formal en Estados Unidos, y seguimos siendo el despacho latinoamericano con más obra construida en ese mercado.
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="font-body-lg text-body-lg text-secondary">
              Nuestro interés principal y lo que ha guiado al despacho desde el principio, es el compromiso con la buena arquitectura y el diseño de calidad. Trabajamos en todas las escalas y tipologías —desde residencial, comercial y hotelero hasta infraestructura y planes maestros— y cada proyecto se trata individualmente, como una oportunidad de explorar y proponer algo que realmente responda al lugar y al cliente.
            </p>
            <p className="font-body-lg text-body-lg text-secondary">
              Lo que nos distingue es que tenemos la experiencia y la capacidad de los despachos grandes, pero la relación con el cliente es directa y personal. Yo dirijo y superviso cada proyecto, respaldado por un equipo directivo con más de dos décadas en el despacho.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
