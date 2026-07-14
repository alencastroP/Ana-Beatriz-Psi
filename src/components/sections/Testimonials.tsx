import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2 } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { testimonials } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.blockquote`
  height: 100%;
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 18px;
  padding: 28px 26px;

  .stars {
    color: ${p => p.theme.primary};
    letter-spacing: 2px;
    margin-bottom: 14px;
    font-size: 0.9rem;
  }
  p {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-size: 1.08rem;
    line-height: 1.5;
    margin-bottom: 18px;
  }
  footer {
    font-size: 0.88rem;
    color: ${p => p.theme.textSoft};
  }
  footer b {
    color: ${p => p.theme.text};
    font-weight: 600;
    font-style: normal;
    display: block;
    font-family: 'Inter', sans-serif;
  }
`

export function Testimonials() {
  return (
    <Section as="section" $alt>
      <Container>
        <Reveal>
          <Kicker>Resultados</Kicker>
          <H2>
            Quem foi <em>chamado</em> depois.
          </H2>
        </Reveal>
        <Grid>
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.1} as={Card}>
              <div className="stars" aria-label="5 de 5 estrelas">
                ★★★★★
              </div>
              <p>“{item.quote}”</p>
              <footer>
                <b>{item.name}</b>
                {item.detail}
              </footer>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
