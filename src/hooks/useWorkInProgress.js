import { useEffect, useState } from 'react'
import { getWorkInProgress } from '../lib/wp'

export default function useWorkInProgress() {
  const [items, setItems] = useState([])

  useEffect(() => {
    let cancelled = false
    getWorkInProgress()
      .then((posts) => !cancelled && setItems(posts))
      .catch((error) => console.error(error))
    return () => {
      cancelled = true
    }
  }, [])

  return items
}
