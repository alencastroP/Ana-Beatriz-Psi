import type { ElementType, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { fadeUp } from '../../styles/animations'

const Animated = styled.div<{ $visible: boolean; $delay: number }>`
  will-change: opacity, transform;

  ${p =>
    p.$visible
      ? css`
          animation: ${fadeUp} 0.7s ease both;
          animation-delay: ${p.$delay}s;
        `
      : css`
          opacity: 0;
          transform: translateY(24px);
        `}
`

interface RevealProps {
  children: ReactNode
  /** Atraso da animacao em segundos. */
  delay?: number
  /** Elemento HTML/styled a renderizar (padrao: div). */
  as?: ElementType
  className?: string
}

/**
 * Revela o conteudo com um fade-up quando entra na viewport.
 * Usa IntersectionObserver via `react-intersection-observer`.
 */
export function Reveal({ children, delay = 0, as, className }: RevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <Animated
      ref={ref}
      as={as}
      className={className}
      $visible={inView}
      $delay={delay}
    >
      {children}
    </Animated>
  )
}
