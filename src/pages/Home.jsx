import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import FeaturedProjects from '../sections/FeaturedProjects'
import WorkInProgress from '../sections/WorkInProgress'
import Timeline from '../sections/Timeline'
import Studio from '../sections/Studio'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedProjects />
      <WorkInProgress />
      <Timeline />
      <Studio />
    </>
  )
}
