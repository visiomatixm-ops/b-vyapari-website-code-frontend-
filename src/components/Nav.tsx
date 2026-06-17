import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useNavStuck } from '../hooks/useNavStuck'
import styles from './Nav.module.css'

export default function Nav() {
  const stuck = useNavStuck()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKey)
      // focus first link for accessibility
      setTimeout(() => firstLinkRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav id="mainNav" className={`${styles.nav} ${stuck ? styles.stuck : ''} ${open ? styles.menuOpen : ''}`}>
      <Link to="/" className={styles.navLogo}>
        <div className={styles.logoMark}>
          <svg viewBox="0 0 120 120" fill="none">
            <rect width="120" height="120" rx="16" fill="#7A1E2C"/>
            <polygon points="22.6,21.8 52.4,21.8 37.5,51.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
            <polygon points="67.6,21.8 97.4,21.8 82.5,51.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
            <polygon points="45.1,61.8 74.9,61.8 60,91.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
          </svg>
        </div>
        <span className={styles.logoText}>B-<span>Vyapari</span></span>
      </Link>

      <button
        className={styles.hamburger}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.hambox} />
      </button>

      <ul className={styles.navMenu}>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? styles.active : ''}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                window.history.pushState({}, '', '/')
                window.dispatchEvent(new PopStateEvent('popstate'))
                window.scrollTo(0, 0)
              }
              setOpen(false)
            }}
            ref={firstLinkRef}
          >
            Home
          </Link>
        </li>
        <li><Link to="/features" className={location.pathname === '/features' ? styles.active : ''} onClick={() => setOpen(false)}>Features</Link></li>
        <li><Link to="/how-it-works" className={location.pathname === '/how-it-works' ? styles.active : ''} onClick={() => setOpen(false)}>How It Works</Link></li>
        <li><Link to="/pricing" className={location.pathname === '/pricing' ? styles.active : ''} onClick={() => setOpen(false)}>Pricing</Link></li>
        <li><Link to="/reviews" className={location.pathname === '/reviews' ? styles.active : ''} onClick={() => setOpen(false)}>Reviews</Link></li>
      </ul>

      <div className={styles.navRight}>
        <Link to="/login" className={styles.btnGhost}>Log In</Link>
        <Link to="/start-free" className={styles.btnFill}>Start Free</Link>
      </div>
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </nav>
  )
}
