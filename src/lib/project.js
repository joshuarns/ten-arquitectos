import { galleryLayouts } from '../data/projectLayouts'

// Turns a WordPress post into the structure of a project page
// (modelled on jsa.com.mx/proyectos/conjunto-juan-de-la-barrera):
//
//   meta line   → first paragraph if it is all <em>/<strong>, e.g.
//                 "Morelia, Michoacán, Mexico — Program: Private Residence — 4,000 m²"
//   intro       → next 1–2 paragraphs, beside the info accordion
//   body        → paragraphs and images in content order. Each run of images
//                 becomes a gallery (layouts cycle as in the reference); a lone
//                 image becomes a full-width image.
//
// While a post has no images yet, the body is split into the reference
// rhythm with empty image boxes: L1, text, L2, text, L3, text, L4, text, L5, full.
//
// ACF fields (if created and exposed in REST) override the parsed meta:
// ubicacion, tipologia, fecha, area, fotografias, creditos.

const EMPHASIS = new Set(['EM', 'STRONG', 'B', 'I', 'BR'])

function isMetaParagraph(el) {
  if (el.tagName !== 'P' || !el.textContent.trim()) return false
  const nodes = [...el.childNodes].filter((n) => n.nodeType !== 3 || n.textContent.trim())
  return nodes.length > 0 && nodes.every((n) => n.nodeType === 1 && EMPHASIS.has(n.tagName))
}

function parseMetaLine(el) {
  const html = el.innerHTML.replace(/<br\s*\/?>/gi, '\n')
  const text = new DOMParser().parseFromString(html, 'text/html').body.textContent
  const segments = text
    .split(/\n|\s+—\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const meta = {}
  for (const seg of segments) {
    const labelled = seg.match(/^([^:]{2,30}):\s*(.+)$/)
    if (labelled && /program|programa|tipolog/i.test(labelled[1])) meta.tipologia = labelled[2]
    else if (labelled && /fecha|date|year|año/i.test(labelled[1])) meta.fecha = labelled[2]
    else if (labelled && /foto|photo/i.test(labelled[1])) meta.fotografias = labelled[2]
    else if (/\d\s*(m²|m2|sq\.? ?ft|ft²)/i.test(seg)) meta.area = seg
    else if (seg.includes('/') || /arquitect|architect/i.test(seg)) meta.creditos = seg
    else if (!meta.ubicacion) meta.ubicacion = seg
  }
  return meta
}

function imagesIn(el) {
  return [...el.querySelectorAll('img')].map((img) => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt') || '',
  }))
}

function tokenize(html) {
  const body = new DOMParser().parseFromString(html, 'text/html').body
  const tokens = []
  for (const el of body.children) {
    const images = imagesIn(el)
    if (images.length && !el.textContent.trim()) {
      images.forEach((image) => tokens.push({ type: 'image', image }))
    } else if (el.textContent.trim()) {
      tokens.push({ type: 'text', el })
    }
  }
  return tokens
}

function chunkGalleries(images, startLayout) {
  const sections = []
  let layout = startLayout
  let rest = images
  if (rest.length === 1) return { sections: [{ type: 'full', image: rest[0] }], layout }
  while (rest.length) {
    const { slots } = galleryLayouts[layout % galleryLayouts.length]
    sections.push({ type: 'gallery', layout: layout % galleryLayouts.length, images: rest.slice(0, slots.length) })
    rest = rest.slice(slots.length)
    layout++
  }
  return { sections, layout }
}

function placeholderSections(textBlocks) {
  const groups = Math.min(4, textBlocks.length)
  const size = Math.ceil(textBlocks.length / Math.max(groups, 1))
  const sections = []
  for (let g = 0; g < groups; g++) {
    sections.push({ type: 'gallery', layout: g, images: [] })
    sections.push({ type: 'text', blocks: textBlocks.slice(g * size, (g + 1) * size) })
  }
  sections.push({ type: 'gallery', layout: groups % galleryLayouts.length, images: [] })
  sections.push({ type: 'full', image: null })
  return sections.filter((s) => s.type !== 'text' || s.blocks.length)
}

function acfValue(acf, ...keys) {
  if (!acf || Array.isArray(acf)) return undefined
  for (const key of keys) if (acf[key]) return String(acf[key])
  return undefined
}

export function parseProject(html, acf, date) {
  let tokens = tokenize(html)

  let meta = {}
  if (tokens[0]?.type === 'text' && isMetaParagraph(tokens[0].el)) {
    meta = parseMetaLine(tokens[0].el)
    tokens = tokens.slice(1)
  }
  meta = {
    ubicacion: acfValue(acf, 'ubicacion', 'location') ?? meta.ubicacion,
    tipologia: acfValue(acf, 'tipologia') ?? meta.tipologia,
    fecha: acfValue(acf, 'fecha', 'anio', 'year') ?? meta.fecha,
    area: acfValue(acf, 'area', 'area_del_proyecto') ?? meta.area,
    fotografias: acfValue(acf, 'fotografias', 'fotografo') ?? meta.fotografias,
    creditos: acfValue(acf, 'creditos') ?? meta.creditos,
  }

  const intro = []
  while (intro.length < 2 && tokens[0]?.type === 'text') intro.push(tokens.shift().el.outerHTML)

  const hasImages = tokens.some((t) => t.type === 'image')
  let sections
  if (!hasImages) {
    sections = placeholderSections(tokens.map((t) => t.el.outerHTML))
  } else {
    sections = []
    let layout = 0
    for (let i = 0; i < tokens.length; ) {
      const type = tokens[i].type
      const run = []
      while (i < tokens.length && tokens[i].type === type) run.push(tokens[i++])
      if (type === 'text') {
        sections.push({ type: 'text', blocks: run.map((t) => t.el.outerHTML) })
      } else {
        const chunk = chunkGalleries(run.map((t) => t.image), layout)
        sections.push(...chunk.sections)
        layout = chunk.layout
      }
    }
  }

  const yearMatch = (meta.fecha || '').match(/(19|20)\d{2}(?!.*(19|20)\d{2})/)
  const year = yearMatch ? Number(yearMatch[0]) : new Date(date).getFullYear()

  const info = [
    { label: 'Tipología', value: meta.tipologia },
    { label: 'Fecha', value: meta.fecha },
    { label: 'Área del proyecto', value: meta.area },
    { label: 'Fotografías', value: meta.fotografias },
  ]
  if (meta.creditos) info.push({ label: 'Créditos', value: meta.creditos })

  return { location: meta.ubicacion || '', tipologia: meta.tipologia || '', info, year, intro, sections }
}
