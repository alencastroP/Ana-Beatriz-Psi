import { useEffect, useState } from 'react'

/**
 * Anima um numero de 0 ate `target` com easing (ease-out cubic).
 * Usado no "match ATS" do hero e nas estatisticas.
 *
 * @param target  valor final
 * @param options.duration  duracao em ms (padrao 1600)
 * @param options.start  dispara a contagem quando vira `true` (padrao true)
 */
export function useCountUp(
  target: number,
  options: { duration?: number; start?: boolean } = {},
): number {
  const { duration = 1600, start = true } = options
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) {
      setValue(0)
      return
    }

    let raf = 0
    const t0 = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])

  return value
}
