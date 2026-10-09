import { useEffect } from 'react'
import ProjectGrid from '../components/project/ProjectGrid'
import ProjectList from '../components/project/ProjectList'
import Timeline from '../sections/Timeline'
import useProjects from '../hooks/useProjects'

// The chronological list is hidden for now; the timeline takes its place.
const SHOW_PROJECT_LIST = false

export default function ProjectsIndex() {
  const { projects, loading } = useProjects()

  useEffect(() => {
    document.title = 'Projects | TEN Arquitectos'
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Grid */}
      <section className="px-[6vw] md:px-[5vw] pt-[97px] md:pt-[160px] pb-[54px]">
        <ProjectGrid projects={projects} loading={loading} />
      </section>

      {/* Chronological list */}
      {SHOW_PROJECT_LIST && projects.length > 0 && (
        <section className="px-[6vw] md:px-[5vw] pt-[48px] pb-[64px] md:pb-[133px]">
          <ProjectList projects={projects} />
        </section>
      )}

      <Timeline />
    </div>
  )
}
