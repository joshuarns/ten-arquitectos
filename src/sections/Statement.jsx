import Reveal from '../components/Reveal'

export default function Statement() {
  return (
    <section className="py-32 px-margin-mobile max-w-max-width mx-auto">
      <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 md:col-start-3">
          <span className="font-label-sm text-label-sm text-secondary block mb-8 uppercase tracking-widest">Enrique Norten</span>
          <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface mb-12">
            "Architecture is not just building; it is a cultural act that articulates space and time."
          </h2>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            Founded in 1986, TEN Arquitectos operates between Mexico City, New York, and Miami. We engage in a diverse range of projects—from single-family houses to large-scale infrastructure and urban master plans.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
