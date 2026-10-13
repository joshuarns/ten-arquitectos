// TEN Arquitectos wordmark. Purple is the primary version; white is for dark
// backgrounds (e.g. the home hero), black for monochrome contexts.
export default function Logo({ variant = 'purple', className = '' }) {
  return <img src={`/images/logo-ten-arquitectos-${variant}.png`} alt="TEN Arquitectos" className={`block w-auto ${className}`} />
}
