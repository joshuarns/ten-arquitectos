import Hero from '../sections/Hero'
import Timeline from '../sections/Timeline'
import Statement from '../sections/Statement'
import Disciplines from '../sections/Disciplines'
import FeaturedProjects from '../sections/FeaturedProjects'
import Studio from '../sections/Studio'
import News from '../sections/News'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Timeline />
      <Statement />
      <Disciplines />
      <FeaturedProjects />
      <Studio />
      <News />
      <Contact />
    </>
  )
}
