import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Container } from '../ui/Container'
import { WavyRule } from '../ui/Section'
import { Doodle } from '../ui/Doodle'
import { ease } from '../../styles/animations'
import { useCountUp } from '../../hooks/useCountUp'
import { stats, type Stat } from '../../data/content'
import type { AccentName } from '../../styles/theme'

const Wrap = styled.div`
  padding: 18px 0 8px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding: 44px 0;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 18px;
    padding: 36px 0;
  }
`

const Item = styled.div<{ $tilt: number; $accent: AccentName }>`
  position: relative;
  text-align: center;
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.35s ${ease.spring};
  cursor: default;

  .n {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-size: clamp(2.1rem, 4.2vw, 2.9rem);
    font-weight: 600;
    color: ${p => p.theme.accents[p.$accent]};
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .l {
    font-size: 0.92rem;
    color: ${p => p.theme.textSoft};
    margin-top: 10px;
    line-height: 1.4;
  }

  /* Bilhetinho que so aparece quando alguem se aproxima. */
  .note {
    position: absolute;
    left: 50%;
    bottom: -30px;
    translate: -50% 0;
    white-space: nowrap;
    font-family: var(--font-hand);
    font-size: 1.15rem;
    color: ${p => p.theme.accentInk[p.$accent]};
    opacity: 0;
    transform: translateY(-8px) rotate(-3deg);
    transition: opacity 0.3s ease, transform 0.35s ${ease.spring};
    pointer-events: none;
  }

  &:hover {
    transform: rotate(0deg) translateY(-4px);

    .note {
      opacity: 1;
      transform: translateY(0) rotate(-3deg);
    }
  }
`

const Sparkle = styled.div`
  position: absolute;
  top: -14px;
  right: 14%;
  opacity: 0.75;

  @media (max-width: 720px) {
    display: none;
  }
`

/** Separa o numero das letras para animar so a parte que conta. */
function splitValue(value: string) {
  const match = value.match(/^(\D*)(\d+)([\s\S]*)$/)
  if (!match) return null
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] }
}

function StatValue({ value, start }: { value: string; start: boolean }) {
  const parts = splitValue(value)
  const current = useCountUp(parts?.target ?? 0, { start, duration: 1500 })

  if (!parts) return <>{value}</>
  return (
    <>
      {parts.prefix}
      {current}
      {parts.suffix}
    </>
  )
}

const TILTS = [-1.6, 1.2, -0.8, 1.8]

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <Item ref={ref} $tilt={TILTS[index % TILTS.length]} $accent={stat.accent}>
      {index === 1 && (
        <Sparkle>
          <Doodle name="sparkle" size={18} color={stat.accent} />
        </Sparkle>
      )}
      <div className="n">
        <StatValue value={stat.value} start={inView} />
      </div>
      <div className="l">{stat.label}</div>
      <div className="note" aria-hidden="true">
        {stat.note}
      </div>
    </Item>
  )
}

/**
 * Faixa de numeros. Cada um conta a partir do zero quando entra na tela e
 * repousa num angulo diferente -- alinhamento perfeito e o que fazia esta
 * faixa parecer uma tabela de dashboard.
 */
export function Stats() {
  return (
    <Container>
      <Wrap>
        <WavyRule />
        <Grid>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </Grid>
        <WavyRule />
      </Wrap>
    </Container>
  )
}
