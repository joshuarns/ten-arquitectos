import { useEffect, useRef, useState } from 'react'

// Port of the design's IntersectionObserver: every `section > div` fades and
// slides up the first time it enters the viewport.
export default function Reveal({ className = '', style, id, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className={`${className} transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  )
}
