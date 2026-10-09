import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ProjectGrid from '../components/project/ProjectGrid'
import ProjectList from '../components/project/ProjectList'
import useProjects from '../hooks/useProjects'

// The chronological list is hidden for now; the timeline takes its place.
const SHOW_PROJECT_LIST = false

export default function FeaturedProjects() {
  const { projects, loading } = useProjects()

  return (
    <section className="py-32 px-margin-mobile">
      <Reveal className="max-w-max-width mx-auto">
        <div className="mb-16 flex justify-between items-end">
          <h3 className="font-headline-lg text-headline-lg-mobile text-primary">Featured Projects</h3>
          <Link className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" to="/proyectos">View Archive</Link>
        </div>
        <ProjectGrid projects={projects} loading={loading} />
        {SHOW_PROJECT_LIST && projects.length > 0 && (
          <div className="mt-[96px]">
            <ProjectList projects={projects} />
          </div>
        )}
      </Reveal>
    </section>
  )
}
