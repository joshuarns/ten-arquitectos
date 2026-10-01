import Reveal from '../components/Reveal'
import Icon from '../components/Icon'

export default function Contact() {
  return (
    <section className="border-t border-outline-variant/30 py-32 px-margin-mobile">
      <Reveal className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h3 className="font-headline-md text-headline-md mb-8">Work with us</h3>
          <p className="font-body-md text-secondary mb-12">We are always looking for exceptional talent to join our studios in Mexico City, New York, and Miami.</p>
          <a className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" href="#">
            Current Openings <Icon name="trending_flat" className="text-sm" />
          </a>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md mb-8">Stay updated</h3>
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <label className="font-label-sm text-label-sm text-secondary block mb-2 uppercase tracking-widest" htmlFor="newsletter-email">Email Address</label>
              <input id="newsletter-email" className="w-full bg-transparent border-b border-primary py-4 px-0 focus:outline-none focus:border-muted-silver transition-colors font-body-md" placeholder="hello@architecture.com" type="email" />
            </div>
            <button className="self-start px-8 py-4 border border-primary text-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
