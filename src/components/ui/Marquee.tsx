import type { ReactNode } from 'react'
import styled from 'styled-components'
import { marquee } from '../../styles/animations'
import { Doodle } from './Doodle'

const Viewport = styled.div<{ $tilt: number }>`
  overflow: hidden;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 14px 0;
  background: ${p => p.theme.primary};
  border-top: 2px solid ${p => p.theme.ink};
  border-bottom: 2px solid ${p => p.theme.ink};
  transform: rotate(${p => p.$tilt}deg);
  user-select: none;
`

const Track = styled.div<{ $seconds: number }>`
  display: flex;
  width: max-content;
  animation: ${marquee} ${p => p.$seconds}s linear infinite;

  /* Deixa a faixa quieta enquanto o mouse esta em cima -- da para ler. */
  ${Viewport}:hover & {
    animation-play-state: paused;
  }
`

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  padding-right: 26px;
  flex-shrink: 0;

  span {
    font-family: var(--font-display);
    font-variation-settings: 'SOFT' 100, 'WONK' 1;
    font-style: italic;
    font-size: 1.32rem;
    white-space: nowrap;
    color: ${p => p.theme.onAccent};
  }
`

interface MarqueeProps {
  items: readonly string[]
  /** Duracao de uma volta completa, em segundos. */
  seconds?: number
  /** Inclinacao da faixa (o charme esta em nao ser reta). */
  tilt?: number
}

/**
 * Faixa infinita entre secoes.
 *
 * O conteudo e duplicado e o keyframe anda exatamente -50%: quando a
 * primeira copia sai, a segunda ja esta no lugar dela e o loop e invisivel.
 */
export function Marquee({ items, seconds = 34, tilt = -1.2 }: MarqueeProps) {
  const group: ReactNode = (
    <Group aria-hidden="true">
      {items.map((item, i) => (
        <span key={`${item}-${i}`}>
          {item}
          <Star />
        </span>
      ))}
    </Group>
  )

  return (
    <Viewport $tilt={tilt}>
      <Track $seconds={seconds}>
        {group}
        {group}
      </Track>
    </Viewport>
  )
}

const StarSlot = styled.span`
  display: inline-flex;
  vertical-align: middle;
  margin-left: 26px;
`

function Star() {
  return (
    <StarSlot>
      <Doodle name="sparkle" size={15} color="currentColor" eager />
    </StarSlot>
  )
}
