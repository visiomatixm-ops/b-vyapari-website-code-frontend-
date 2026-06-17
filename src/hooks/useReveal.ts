import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const rvObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis')
            rvObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    function observeRvElements() {
      document.querySelectorAll<HTMLElement>('.rv').forEach((el) => {
        if (!el.classList.contains('vis')) {
          rvObs.observe(el)
        }
      })
    }

    function revealVisible() {
      observeRvElements()

      document.querySelectorAll('.rv:not(.vis)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('vis')
        }
      })

      document.querySelectorAll('.step-item:not(.vis)').forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(() => el.classList.add('vis'), i * 150)
        }
      })
    }

    function onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        revealVisible()
      }
    }

    const revealHandler = () => revealVisible()

    window.addEventListener('scroll', revealHandler)
    window.addEventListener('resize', revealHandler)
    window.addEventListener('focus', revealHandler)
    document.addEventListener('visibilitychange', onVisibilityChange)

    observeRvElements()
    revealVisible()

    return () => {
      rvObs.disconnect()
      window.removeEventListener('scroll', revealHandler)
      window.removeEventListener('resize', revealHandler)
      window.removeEventListener('focus', revealHandler)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])
}
