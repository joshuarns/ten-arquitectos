import { galleryLayouts, REF } from '../../data/projectLayouts'

const pct = (n) => `${(n / REF.width) * 100}%`
const vw = (n) => `${(n / REF.viewport) * 100}vw`

export function ImageBox({ image, className = '', style }) {
  return (
    <div className={`overflow-hidden bg-surface-container-high ${className}`} style={style}>
      {image && <img className="w-full h-full object-cover" src={image.src} alt={image.alt} loading="lazy" />}
    </div>
  )
}

// Desktop: boxes absolutely placed exactly as in the reference.
// Mobile: stacked full width, keeping each box's proportions.
export default function Gallery({ layout, images }) {
  const { height, slots } = galleryLayouts[layout]
  const used = images.length ? slots.slice(0, images.length) : slots
  const usedHeight = Math.max(...used.map(([, y, , h]) => y + h))

  return (
    <div className="flex flex-col gap-[44px] md:block md:relative md:h-[var(--gallery-h)]" style={{ '--gallery-h': vw(images.length ? usedHeight : height) }}>
      {used.map(([x, y, w, h], i) => (
        <ImageBox
          key={i}
          image={images[i]}
          className="w-full aspect-[var(--ar)] md:aspect-auto md:absolute md:left-[var(--l)] md:top-[var(--t)] md:w-[var(--w)] md:h-[var(--h)]"
          style={{ '--ar': `${w} / ${h}`, '--l': pct(x - REF.left), '--t': vw(y), '--w': pct(w), '--h': vw(h) }}
        />
      ))}
    </div>
  )
}
