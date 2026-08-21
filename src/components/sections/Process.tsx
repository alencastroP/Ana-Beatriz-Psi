import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, Mark } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { Doodle } from '../ui/Doodle'
import { FloatingDoodle } from '../ui/Decor'
import { ease } from '../../styles/animations'
import { steps, notes } from '../../data/content'
import type { AccentName } from '../../styles/theme'

const Flow = styled.div`
  position: relative;
  margin-top: 60px;
`

/**
 * O caminho tracejado que liga os tres passos.
 *
 * Fica atras dos cards e passa por tras deles, ligando uma bolinha
 * numerada a outra. Revela-se da esquerda para a direita quando a secao
 * entra na tela: o gesto explica "isto e um percurso" antes das palavras.
 */
const Connector = styled.svg<{ $visible: boolean }>`
  position: absolute;
  top: -18px;
  left: 4%;
  width: 92%;
  height: 62px;
  z-index: 0;
  overflow: visible;

  /* O traco ja nasce tracejado; quem revela e o clip andando para a
     direita. Animar o dashoffset de uma linha tracejada faria as marcas
     desfilarem no lugar de desenhar. */
  clip-path: inset(0 ${p => (p.$visible ? '-4%' : '100%')} 0 0);
  transition: clip-path 1.9s ${ease.soft} 0.25s;

  path {
    fill: none;
    stroke: ${p => p.theme.accents.sage};
    stroke-width: 3;
    opacity: 0.55;
    stroke-linecap: round;
    stroke-dasharray: 9 11;
  }

  @media (max-width: 880px) {
    display: none;
  }
`

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`

const Card = styled.div<{ $accent: AccentName; $tilt: number }>`
  height: 100%;
  position: relative;
  padding: 46px 26px 30px;
  border-radius: 20px 16px 22px 18px;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  box-shadow: 6px 7px 0 ${p => p.theme.shade};
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.4s ${ease.spring}, box-shadow 0.4s ${ease.spring};

  &:hover {
    transform: rotate(0deg) translateY(-6px);
    box-shadow: 10px 13px 0 ${p => p.theme.shade};
  }

  /* Bolinha numerada, encaixada no caminho tracejado. */
  .num {
    position: absolute;
    top: -22px;
    left: 24px;
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border-radius: 52% 48% 46% 54% / 50% 52% 48% 50%;
    background: ${p => p.theme.accents[p.$accent]};
    border: 2px solid ${p => p.theme.ink};
    color: ${p => p.theme.onAccent};
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-weight: 700;
    font-size: 1.3rem;
    transition: transform 0.4s ${ease.spring};
  }

  &:hover .num {
    transform: rotate(-10deg) scale(1.08);
  }

  .phase {
    font-family: var(--font-hand);
    font-size: 1.25rem;
    color: ${p => p.theme.accentInk[p.$accent]};
    margin-bottom: 2px;
  }

  h3 {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-size: 1.36rem;
    font-weight: 600;
    margin: 4px 0 10px;
  }

  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.65;
    font-size: 0.99rem;
  }
`

const EndNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 52px;
  font-family: var(--font-hand);
  font-size: 1.45rem;
  color: ${p => p.theme.accentInk.sage};
  transform: rotate(-1.5deg);
`

const TILTS = [-1.3, 0.9, -0.6]

export function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <Section as="section" id="processo" $alt>
      <FloatingDoodle
        $seconds={11}
        $rotate={8}
        style={{ bottom: 70, right: '6%' }}
      >
        <Doodle name="leaf" size={52} color="sage" strokeWidth={3} />
      </FloatingDoodle>

      <Container>
        <Reveal>
          <Kicker accent="sage">o caminho</Kicker>
          <H2>
            Três passos, do diagnóstico à <Mark>vaga certa</Mark>.
          </H2>
        </Reveal>

        <Flow ref={ref}>
          <Connector
            $visible={inView}
            viewBox="0 0 1000 70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              /* Os picos caem exatamente nas frestas entre os cards
                 (x=315 e x=685 do viewBox); os vales passam por tras
                 deles. E o que faz a linha parecer costurar os passos. */
              d="M 30 40 C 120 40, 230 6, 315 2 C 400 -2, 440 40, 500 42 C 560 44, 610 6, 685 2 C 760 -2, 880 26, 965 34"
            />
          </Connector>

          <Grid>
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={0.15 + i * 0.14} variant="pop">
                <Card $accent={step.accent} $tilt={TILTS[i % TILTS.length]}>
                  <span className="num">{step.num}</span>
                  <div className="phase">{step.phase}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Card>
              </Reveal>
            ))}
          </Grid>
        </Flow>

        <EndNote>
          <Doodle name="check" size={26} color="sage" strokeWidth={4} />
          {notes.process}
        </EndNote>
      </Container>
    </Section>
  )
}
