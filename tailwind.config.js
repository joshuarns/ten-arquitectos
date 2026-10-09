import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
// Config copied verbatim from the Stitch export (_stitch/home.html).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary-container": "#1c1b1b",
        "background": "#f9f9f9",
        "on-secondary-fixed": "#1b1c1c",
        "error-container": "#ffdad6",
        "on-surface": "#1a1c1c",
        "on-tertiary-fixed-variant": "#484645",
        "on-tertiary-container": "#868382",
        "outline": "#747878",
        "on-background": "#1a1c1c",
        "tertiary-container": "#1c1b1a",
        "primary-fixed-dim": "#c8c6c5",
        "deep-obsidian": "#0A0A0A",
        "tertiary-fixed-dim": "#cac6c4",
        "on-surface-variant": "#444748",
        "primary": "#000000",
        "on-error": "#ffffff",
        "tertiary-fixed": "#e6e2df",
        "surface-dim": "#dadada",
        "secondary-fixed": "#e4e2e2",
        "surface-container-low": "#f4f3f3",
        "on-secondary-fixed-variant": "#474747",
        "warm-gray": "#F5F5F4",
        "outline-variant": "#c4c7c7",
        "on-secondary": "#ffffff",
        "inverse-primary": "#c8c6c5",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#858383",
        "surface-tint": "#5f5e5e",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#c8c6c6",
        "on-secondary-container": "#646464",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "secondary-container": "#e4e2e2",
        "surface-container": "#eeeeee",
        "on-primary-fixed-variant": "#474746",
        "tertiary": "#000000",
        "inverse-on-surface": "#f1f1f1",
        "surface-container-high": "#e8e8e8",
        "surface": "#f9f9f9",
        "muted-silver": "#999999",
        "on-error-container": "#93000a",
        "surface-bright": "#f9f9f9",
        "inverse-surface": "#2f3131",
        "surface-variant": "#e2e2e2",
        "secondary": "#5e5e5e",
        "on-primary-fixed": "#1c1b1b",
        "primary-fixed": "#e5e2e1",
        "surface-container-highest": "#e2e2e2",
        "on-tertiary-fixed": "#1c1b1a"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "margin-desktop": "64px",
        "unit": "8px",
        "margin-mobile": "20px",
        "gutter": "24px",
        "max-width": "1440px"
      },
      // All text uses Arial.
      "fontFamily": {
        "sans": ["Arial", "Helvetica", "sans-serif"],
        "serif": ["Arial", "Helvetica", "sans-serif"],
        "mono": ["Arial", "Helvetica", "sans-serif"],
        "headline-lg-mobile": ["Arial", "Helvetica", "sans-serif"],
        "body-lg": ["Arial", "Helvetica", "sans-serif"],
        "body-md": ["Arial", "Helvetica", "sans-serif"],
        "headline-md": ["Arial", "Helvetica", "sans-serif"],
        "label-sm": ["Arial", "Helvetica", "sans-serif"],
        "display-lg": ["Arial", "Helvetica", "sans-serif"],
        "headline-lg": ["Arial", "Helvetica", "sans-serif"]
      },
      "fontSize": {
        "headline-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "32px", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "400"}],
        "display-lg": ["72px", {"lineHeight": "80px", "letterSpacing": "-0.02em", "fontWeight": "300"}],
        "headline-lg": ["48px", {"lineHeight": "56px", "fontWeight": "400"}]
      }
    }
  },
  plugins: [forms, containerQueries],
}
