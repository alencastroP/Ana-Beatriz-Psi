import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2 } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { steps } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`

const Card = styled.div`
  height: 100%;
  position: relative;
  padding: 30px 26px;
  border-radius: 18px;
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};

  .num {
    font-family: 'Space Mono', monospace;
    font-size: 0.84rem;
    color: ${p => p.theme.primary};
    letter-spacing: 0.06em;
  }
  h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 12px 0 10px;
  }
  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.6;
    font-size: 0.96rem;
  }
`

export function Process() {
  return (
    <Section as="section" id="processo" $alt>
      <Container>
        <Reveal>
          <Kicker>O caminho</Kicker>
          <H2>
            Três passos, do diagnóstico à <em>vaga certa</em>.
          </H2>
        </Reveal>
        <Grid>
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <Card>
                <div className="num">
                  {step.num} — {step.phase}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
