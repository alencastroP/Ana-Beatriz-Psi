import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, Mark } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { Doodle } from '../ui/Doodle'
import { FloatingDoodle } from '../ui/Decor'
import { ease } from '../../styles/animations'
import { testimonials } from '../../data/content'
import type { AccentName } from '../../styles/theme'

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px 24px;
  margin-top: 56px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 30px;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }
`

/**
 * Depoimento como post-it colado no mural: fundo na cor do acento, fita
 * crepe no topo e um angulo proprio. No hover ele se endireita e sobe --
 * o mesmo gesto de quem descola o papel para ler melhor.
 */
const Note = styled.blockquote<{ $accent: AccentName; $tilt: number }>`
  position: relative;
  height: 100%;
  background: ${p => p.theme.accentSoft[p.$accent]};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 4px 18px 8px 14px;
  padding: 34px 26px 26px;
  box-shadow: 6px 8px 0 ${p => p.theme.shade};
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.4s ${ease.spring}, box-shadow 0.4s ${ease.spring};

  /* A fitinha. */
  &::before {
    content: '';
    position: absolute;
    top: -13px;
    left: 50%;
    width: 74px;
    height: 26px;
    margin-left: -37px;
    background: ${p => p.theme.tape};
    border-left: 1px dashed rgba(255, 255, 255, 0.4);
    border-right: 1px dashed rgba(255, 255, 255, 0.4);
    transform: rotate(${p => -p.$tilt * 1.6}deg);
  }

  &:hover {
    transform: rotate(0deg) translateY(-7px);
    box-shadow: 11px 14px 0 ${p => p.theme.shade};
    z-index: 3;
  }

  .marks {
    display: flex;
    gap: 4px;
    margin-bottom: 14px;
  }

  p {
    font-family: var(--font-display);
    font-variation-settings: 'SOFT' 80, 'WONK' 1;
    font-style: italic;
    font-size: 1.12rem;
    line-height: 1.48;
    color: ${p => p.theme.text};
    margin-bottom: 20px;
  }

  footer {
    font-family: var(--font-hand);
    font-size: 1.18rem;
    color: ${p => p.theme.accentInk[p.$accent]};
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  footer b {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    color: ${p => p.theme.text};
    font-weight: 700;
    font-style: normal;
    font-size: 1.05rem;
  }
`

const Quote = styled.div`
  position: absolute;
  top: 14px;
  right: 16px;
  opacity: 0.5;
`

export function Testimonials() {
  return (
    <Section as="section" $alt>
      <FloatingDoodle
        $seconds={9}
        $rotate={-14}
        style={{ top: 80, left: '6%' }}
      >
        <Doodle name="heart" size={24} color="rose" />
      </FloatingDoodle>

      <Container>
        <Reveal>
          <Kicker accent="ochre">resultados</Kicker>
          <H2>
            Quem foi <Mark>chamado</Mark> depois.
          </H2>
        </Reveal>

        <Grid>
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.12} variant="tape">
              <Note $accent={item.accent} $tilt={item.tilt}>
                <Quote>
                  <Doodle
                    name="chat"
                    size={26}
                    color={item.accent}
                    strokeWidth={2.4}
                    delay={i * 0.12 + 0.3}
                  />
                </Quote>
                <div className="marks" aria-label="5 de 5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Doodle
                      key={s}
                      name="sparkle"
                      size={13}
                      color={item.accent}
                      delay={i * 0.12 + s * 0.07}
                    />
                  ))}
                </div>
                <p>“{item.quote}”</p>
                <footer>
                  <b>{item.name}</b>
                  {item.detail}
                </footer>
              </Note>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
