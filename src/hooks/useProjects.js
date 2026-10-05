import { useEffect, useState } from 'react'
import { getProjects } from '../lib/wp'

export default function useProjects() {
  const [state, setState] = useState({ projects: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    getProjects()
      .then((projects) => !cancelled && setState({ projects, loading: false, error: null }))
      .catch((error) => {
        console.error(error)
        if (!cancelled) setState({ projects: [], loading: false, error })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
