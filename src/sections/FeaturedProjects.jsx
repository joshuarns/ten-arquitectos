import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ProjectGrid from '../components/project/ProjectGrid'
import ProjectList from '../components/project/ProjectList'
import useProjects from '../hooks/useProjects'

// The chronological list is hidden for now; the timeline takes its place.
const SHOW_PROJECT_LIST = false
// The home grid shows only the first projects; the rest live on /proyectos.
const HOME_PROJECT_LIMIT = 12

export default function FeaturedProjects() {
  const { projects, loading } = useProjects()

  return (
    <section className="py-32 px-margin-mobile">
      <Reveal className="max-w-max-width mx-auto">
        <div className="mb-16 flex justify-end items-end">
          <Link className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-widest" to="/proyectos">All Projects</Link>
        </div>
        <ProjectGrid projects={projects.slice(0, HOME_PROJECT_LIMIT)} loading={loading} />
        {SHOW_PROJECT_LIST && projects.length > 0 && (
          <div className="mt-[96px]">
            <ProjectList projects={projects} />
          </div>
        )}
      </Reveal>
    </section>
  )
}
