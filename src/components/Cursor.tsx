import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMouseMove)

    const interactables = document.querySelectorAll('a, button')
    const onEnter = () => {
      if (dotRef.current) { dotRef.current.style.width = '18px'; dotRef.current.style.height = '18px' }
      if (ringRef.current) ringRef.current.style.opacity = '.8'
    }
    const onLeave = () => {
      if (dotRef.current) { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) ringRef.current.style.opacity = '.5'
    }
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
