import Hero from '../sections/Hero'
import Timeline from '../sections/Timeline'
import Statement from '../sections/Statement'
import FeaturedProjects from '../sections/FeaturedProjects'
import Studio from '../sections/Studio'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedProjects />
      <Timeline />
      <Studio />
    </>
  )
}
