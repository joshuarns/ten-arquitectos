import Reveal from '../components/Reveal'

// "Mensajes clave — Elevator Pitch" block. Layout from the reference image;
// type scale matched to the Timeline (jsa-text); container matched to Projects.
export default function Statement() {
  return (
    <section className="bg-white text-black px-margin-mobile py-[64px] md:py-[120px]">
      <Reveal className="max-w-max-width mx-auto">
        <p className="jsa-text uppercase text-[#295158]">Mensajes clave</p>
        <h2 className="jsa-text font-bold">Elevator Pitch — Enrique Norten</h2>

        <p className="jsa-text text-[#75797c] mt-[40px] md:mt-[48px]">
          Una versión conversacional y oral del posicionamiento, lo suficientemente concisa como para exponerse entre 45 segundos y un minuto y lo suficientemente flexible como para adaptarse sobre la marcha. Debe ser impactante, ágil y capaz de persuadir rápidamente a quien la recibe. Puede utilizarse en eventos de networking, presentaciones ante clientes y entrevistas. Cualquier persona que interactúe con clientes potenciales debería ser capaz de exponer una versión de la misma de manera natural y coherente.
        </p>

        <div className="jsa-text mt-[32px] md:mt-[40px] flex flex-col gap-[16px]">
          <p>
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
