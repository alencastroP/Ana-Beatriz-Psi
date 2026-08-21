import type { ElementType, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import {
  ease,
  popIn,
  riseIn,
  riseLeft,
  riseRight,
  tapeIn,
} from '../../styles/animations'

export type RevealVariant = 'rise' | 'left' | 'right' | 'pop' | 'tape'

const VARIANTS = {
  rise: { frames: riseIn, duration: 0.75, easing: ease.out },
  left: { frames: riseLeft, duration: 0.8, easing: ease.out },
  right: { frames: riseRight, duration: 0.8, easing: ease.out },
  pop: { frames: popIn, duration: 0.62, easing: ease.spring },
  tape: { frames: tapeIn, duration: 0.85, easing: ease.spring },
} as const

const Animated = styled.div<{
  $visible: boolean
  $delay: number
  $variant: RevealVariant
  $tilt: number
}>`
  will-change: opacity, transform;
  --rest-tilt: ${p => p.$tilt}deg;

  ${p => {
    const v = VARIANTS[p.$variant]
    return p.$visible
      ? css`
          animation: ${v.frames} ${v.duration}s ${v.easing} both;
          animation-delay: ${p.$delay}s;
        `
      : css`
          opacity: 0;
        `
  }}
`

interface RevealProps {
  children: ReactNode
  /** Atraso da animacao em segundos. */
  delay?: number
  /** Gesto de entrada. Varie entre secoes -- tudo igual entrega o template. */
  variant?: RevealVariant
  /** Inclinacao em que o elemento repousa (usado por `variant="tape"`). */
  tilt?: number
  /** Elemento HTML/styled a renderizar (padrao: div). */
  as?: ElementType
  className?: string
}

/**
 * Revela o conteudo quando ele entra na viewport.
 *
 * Diferente do fade-up unico de antes, aqui cada secao escolhe um gesto:
 * o olho percebe repeticao de movimento antes de perceber repeticao de
 * layout, e movimento identico em tudo e o que mais entrega pagina gerada.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'rise',
  tilt = 0,
  as,
  className,
}: RevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <Animated
      ref={ref}
      as={as}
      className={className}
      $visible={inView}
      $delay={delay}
      $variant={variant}
      $tilt={tilt}
    >
      {children}
    </Animated>
  )
}
