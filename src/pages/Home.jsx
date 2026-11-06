import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import FeaturedProjects from '../sections/FeaturedProjects'
import WorkInProgress from '../sections/WorkInProgress'
import Studio from '../sections/Studio'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedProjects />
      <WorkInProgress />
      <Studio />
    </>
  )
}
