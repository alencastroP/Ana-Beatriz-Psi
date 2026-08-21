import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, Mark } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { Doodle, type DoodleName } from '../ui/Doodle'
import { Blob, FloatingDoodle } from '../ui/Decor'
import { ease, wiggle } from '../../styles/animations'
import { services, type ServiceIcon } from '../../data/content'
import type { AccentName } from '../../styles/theme'

const ICONS: Record<ServiceIcon, DoodleName> = {
  doc: 'iconDoc',
  badge: 'iconBadge',
  target: 'iconTarget',
  mic: 'iconMic',
}

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 26px;
  margin-top: 54px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
`

const Card = styled.div<{ $accent: AccentName; $tilt: number }>`
  position: relative;
  height: 100%;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 18px 22px 16px 24px;
  padding: 34px 30px 30px;
  box-shadow: 6px 7px 0 ${p => p.theme.shade};
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.4s ${ease.spring}, box-shadow 0.4s ${ease.spring},
    background 0.4s ${ease.inOut};

  /* Marcador de cor na lateral, como aba de fichario. */
  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 34px;
    width: 8px;
    height: 62px;
    border: 2px solid ${p => p.theme.ink};
    border-left: none;
    border-radius: 0 8px 8px 0;
    background: ${p => p.theme.accents[p.$accent]};
    transition: height 0.4s ${ease.spring};
  }

  &:hover {
    transform: rotate(0deg) translateY(-6px);
    box-shadow: 10px 13px 0 ${p => p.theme.shade};
    background: ${p => p.theme.accentSoft[p.$accent]};

    &::before {
      height: 110px;
    }

    .ic svg {
      animation: ${wiggle} 0.6s ease-in-out;
    }

    .note {
      opacity: 1;
      transform: rotate(6deg) translateY(0);
    }
  }

  .ic {
    width: 66px;
    height: 66px;
    display: grid;
    place-items: center;
    margin-bottom: 20px;
    border-radius: 58% 42% 46% 54% / 48% 56% 44% 52%;
    background: ${p => p.theme.accentSoft[p.$accent]};
    transition: background 0.4s ${ease.inOut};
  }

  h3 {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-weight: 600;
    font-size: 1.36rem;
    line-height: 1.15;
    margin-bottom: 12px;
  }

  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.65;
    font-size: 1rem;
  }

  /* Etiqueta manuscrita presa no canto de cima. */
  .note {
    position: absolute;
    top: -16px;
    right: 18px;
    font-family: var(--font-hand);
    font-size: 1.18rem;
    line-height: 1;
    padding: 7px 13px 5px;
    color: ${p => p.theme.accentInk[p.$accent]};
    background: ${p => p.theme.accentSoft[p.$accent]};
    border: 2px solid ${p => p.theme.ink};
    border-radius: 999px;
    opacity: 0;
    transform: rotate(6deg) translateY(6px);
    transition: opacity 0.3s ease, transform 0.4s ${ease.spring};
    pointer-events: none;
  }
`

const TILTS = [-1.4, 1.1, 1.3, -1]

export function Services() {
  return (
    <Section as="section" id="servicos">
      <Blob
        $accent="lilac"
        $size={320}
        $seconds={28}
        $opacity={0.1}
        style={{ top: 120, left: -140 }}
      />
      <FloatingDoodle
        $seconds={9}
        $rotate={-10}
        style={{ top: 90, right: '4%' }}
      >
        <Doodle name="sparkle" size={30} color="lilac" />
      </FloatingDoodle>

      <Container>
        <Reveal>
          <Kicker accent="lilac">como eu te ajudo</Kicker>
          <H2>
            Tudo para você ser <Mark>encontrado</Mark> e{' '}
            <Mark>escolhido</Mark>.
          </H2>
        </Reveal>

        <Grid>
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.09}
              variant="tape"
            >
              <Card $accent={service.accent} $tilt={TILTS[i % TILTS.length]}>
                <div className="ic">
                  <Doodle
                    name={ICONS[service.icon]}
                    size={38}
                    color={service.accent}
                    strokeWidth={2.6}
                    delay={i * 0.09 + 0.2}
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="note" aria-hidden="true">
                  {service.note}
                </span>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
