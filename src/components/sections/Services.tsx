import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2 } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { services } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 48px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  height: 100%;
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 20px;
  padding: 32px 30px;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;

  &:hover {
    transform: translateY(-5px);
    border-color: ${p => p.theme.primary};
    box-shadow: ${p => p.theme.cardShadow};
  }

  .ic {
    font-size: 1.6rem;
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: ${p => p.theme.keywordBg};
    display: grid;
    place-items: center;
    margin-bottom: 20px;
  }
  h3 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.32rem;
    margin-bottom: 10px;
  }
  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.6;
    font-size: 0.98rem;
  }
`

export function Services() {
  return (
    <Section as="section" id="servicos">
      <Container>
        <Reveal>
          <Kicker>Como eu te ajudo</Kicker>
          <H2>
            Tudo para você ser <em>encontrado</em> e <em>escolhido</em>.
          </H2>
        </Reveal>
        <Grid>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <Card>
                <div className="ic" aria-hidden>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
