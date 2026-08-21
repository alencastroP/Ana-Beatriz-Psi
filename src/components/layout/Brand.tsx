import styled from 'styled-components'
import { ease } from '../../styles/animations'
import { BreathingDot } from '../ui/Decor'

const Wrap = styled.a`
  font-family: var(--font-display);
  font-variation-settings: var(--wonk);
  font-weight: 600;
  font-size: 1.34rem;
  letter-spacing: -0.02em;
  color: ${p => p.theme.text};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 11px;
  transition: transform 0.35s ${ease.spring};

  .dot {
    transition: transform 0.4s ${ease.spring};
  }

  /* O nome e o ponto vivem no mesmo item do flex: senao o gap do
     container abriria um vao entre "Beatriz" e o ponto final. */
  .name {
    display: inline-block;
  }

  .end {
    color: ${p => p.theme.primary};
  }

  &:hover {
    transform: rotate(-1.5deg);

    .dot {
      transform: scale(1.35) translateY(-1px);
    }
  }
`

/** Marca "Ana Beatriz." reutilizada no nav e no rodape. */
export function Brand({ href = '#topo' }: { href?: string }) {
  return (
    <Wrap href={href}>
      <BreathingDot className="dot" $size={10} />
      <span className="name">
        Ana Beatriz<span className="end">.</span>
      </span>
    </Wrap>
  )
}
