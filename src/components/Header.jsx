import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { navItems } from '../data/content'

export default function Header() {
  const { pathname } = useLocation()
  const overHero = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solid = scrolled || !overHero

  return (
    <>
      {/* TopAppBar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 transition-all duration-500 ${solid ? 'scrolled text-primary' : 'text-white'}`}
        id="top-app-bar"
      >
        <button className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-300" onClick={() => setOpen(true)} aria-label="Open menu">
          <Icon name="menu" />
        </button>
        <h1 className="font-headline-md text-headline-md tracking-tight">
          <Link to="/">TEN Arquitectos</Link>
        </h1>
        <button className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-300" aria-label="Search">
          <Icon name="search" />
        </button>
      </header>

      {/* Navigation Drawer */}
      <nav
        className={`fixed inset-0 z-[100] flex flex-col p-margin-mobile md:p-margin-desktop bg-surface transition-drawer ${open ? '' : 'translate-x-full'}`}
        id="nav-drawer"
        aria-hidden={!open}
      >
        <div className="flex justify-between items-center mb-16">
          <h2 className="font-headline-md text-headline-md text-primary">Index</h2>
          <button className="hover:opacity-70 transition-opacity duration-300" onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <div className="flex flex-col gap-8 flex-grow">
          {navItems.map((item, i) => (
            <Link key={item.label} className="group flex items-center justify-between border-b border-outline-variant py-4" to={item.to} onClick={() => setOpen(false)}>
              {i === 0 ? (
                <span className="font-headline-lg text-headline-lg-mobile text-primary group-hover:translate-x-4 transition-transform duration-300">{item.label}</span>
              ) : (
                <span className="font-headline-lg text-headline-lg-mobile text-muted-silver hover:text-primary transition-colors duration-300">{item.label}</span>
              )}
              <Icon name={item.icon} className="text-muted-silver" />
            </Link>
          ))}
        </div>
        <div className="mt-auto py-8 text-center md:text-left">
          <p className="font-label-sm text-label-sm text-secondary">© 2024 TEN ARQUITECTOS</p>
        </div>
      </nav>
    </>
  )
}
