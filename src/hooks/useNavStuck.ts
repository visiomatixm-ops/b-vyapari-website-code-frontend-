import { useEffect, useState } from 'react'

export function useNavStuck() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return stuck
}
