import { useEffect, useState } from 'react'

/**
 * Progresso de leitura da pagina (0 a 1), para a barrinha da navbar.
 * Atualiza dentro de rAF e so quando o valor muda de verdade.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.body.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.min(1, window.scrollY / max) : 0
      setProgress(prev => (Math.abs(prev - next) > 0.001 ? next : prev))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/**
 * Diz qual secao esta sendo lida, para marcar o link ativo no menu.
 * Usa a faixa central da tela como "linha de leitura".
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    targets.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** `true` depois que a pagina rolou alem de `offset` px. */
export function useScrolledPast(offset = 24): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return past
}
