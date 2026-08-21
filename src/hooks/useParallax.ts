import { useEffect, useRef } from 'react'

/** Respeita quem pediu menos movimento no sistema. */
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Parallax de ponteiro.
 *
 * Escreve `--px` e `--py` (de -1 a 1) no elemento, para os filhos se
 * deslocarem em profundidades diferentes. Vai direto no style via rAF, sem
 * passar por estado do React -- movimento a 60fps nao pode re-renderizar
 * a arvore a cada pixel.
 */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0

    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        el.style.setProperty('--px', (px * 2).toFixed(3))
        el.style.setProperty('--py', (py * 2).toFixed(3))
      })
    }

    const onLeave = () => {
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}

/**
 * Inclina um cartao seguindo o mouse (efeito "cartao na mesa").
 * Escreve `--rx`/`--ry` em graus; o componente decide como usar.
 */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0

    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`)
      })
    }

    const reset = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [max])

  return ref
}
