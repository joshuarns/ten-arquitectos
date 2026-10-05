// Image layouts measured from jsa.com.mx/proyectos/conjunto-juan-de-la-barrera
// at 1440px wide: content box starts at x=72 and is 1296px wide.
// [x, y, width, height] in px of that reference; rendered in % / vw so the
// layout scales exactly like the original.
export const REF = { left: 72, width: 1296, viewport: 1440 }

export const galleryLayouts = [
  {
    height: 558,
    slots: [
      [72, 0, 432, 558],
      [612, 0, 756, 558],
    ],
  },
  {
    height: 937,
    slots: [
      [72, 0, 432, 558],
      [612, 0, 756, 558],
      [72, 606, 432, 331],
      [612, 606, 432, 331],
      [1098, 606, 270, 331],
    ],
  },
  {
    height: 824,
    slots: [
      [72, 0, 432, 331],
      [72, 379, 432, 444],
      [612, 0, 756, 444],
      [612, 493, 270, 331],
      [936, 493, 432, 331],
    ],
  },
  {
    height: 482,
    slots: [
      [72, 0, 432, 482],
      [612, 0, 756, 482],
    ],
  },
  {
    height: 1012,
    slots: [
      [72, 0, 432, 482],
      [612, 0, 378, 482],
      [1044, 0, 324, 482],
      [72, 530, 432, 482],
      [612, 530, 756, 482],
    ],
  },
]
