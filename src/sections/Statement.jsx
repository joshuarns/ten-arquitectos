import Reveal from '../components/Reveal'

// Elevator pitch by Enrique Norten. Container matched to Projects; the opening
// paragraph is set in the brand purple.
export default function Statement() {
  return (
    <section className="bg-white text-black px-margin-mobile py-[64px] md:py-[120px]">
      <Reveal className="max-w-max-width mx-auto">
        <div className="font-body-md text-[17px] leading-[28px] flex flex-col gap-[24px] md:gap-[32px]">
          <p className="text-brand">
            TEN Arquitectos cuenta con 40 años de práctica profesional y en ese tiempo hemos construido algo que muy pocos despachos latinoamericanos han logrado: una presencia internacional real. Fuimos el primero en abrir una oficina formal en Estados Unidos, y seguimos siendo el despacho latinoamericano con más obra construida en ese mercado.
          </p>
          <p>
            Nuestro interés principal y lo que ha guiado al despacho desde el principio, es el compromiso con la buena arquitectura y el diseño de calidad. Trabajamos en todas las escalas y tipologías —desde residencial, comercial y hotelero hasta infraestructura y planes maestros— y cada proyecto se trata individualmente, como una oportunidad de explorar y proponer algo que realmente responda al lugar y al cliente.
          </p>
          <p>
            Lo que nos distingue es que tenemos la experiencia y la capacidad de los despachos grandes, pero la relación con el cliente es directa y personal. Yo dirijo y superviso cada proyecto, respaldado por un equipo directivo con más de dos décadas en el despacho.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
