import { useState } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, Mark } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { Doodle } from '../ui/Doodle'
import { Blob, FloatingDoodle, WiggleOnHover } from '../ui/Decor'
import { ease } from '../../styles/animations'
import { useTilt } from '../../hooks/useParallax'
import { contact, notes } from '../../data/content'
import ProfilePhoto from '../../utils/ana-beatriz.jpg'

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 46px;
    text-align: center;
  }
`

const PolaroidWrap = styled.div`
  position: relative;
  max-width: 350px;
  margin: 0 auto;
  width: 100%;
  perspective: 900px;
`

/** Fita crepe segurando a foto na parede. */
const Tape = styled.span`
  position: absolute;
  z-index: 4;
  top: -16px;
  left: 50%;
  width: 108px;
  height: 32px;
  margin-left: -54px;
  background: ${p => p.theme.tape};
  border-left: 1px dashed rgba(255, 255, 255, 0.35);
  border-right: 1px dashed rgba(255, 255, 255, 0.35);
  transform: rotate(-4deg);
  pointer-events: none;
`

/**
 * Retrato em formato polaroid: moldura branca, base mais larga para a
 * legenda escrita a mao e um leve giro. No hover ela se endireita e
 * acompanha o ponteiro, como quem pega a foto para olhar de perto.
 */
const Polaroid = styled.div`
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 6px;
  padding: 14px 14px 0;
  box-shadow: 9px 11px 0 ${p => p.theme.shade};
  transform: rotate(-3deg);
  transform-style: preserve-3d;
  transition: transform 0.45s ${ease.spring}, box-shadow 0.45s ${ease.spring};

  &:hover {
    transform: rotate(0deg) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))
      scale(1.02);
    box-shadow: 13px 16px 0 ${p => p.theme.shade};
  }

  .frame {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: 3px;
    background: ${p => p.theme.accents.rose};
    display: grid;
    place-items: center;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.02) contrast(1.02);
  }

  .mono {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-size: 5rem;
    font-weight: 600;
    color: ${p => p.theme.onAccent};
  }

  .caption {
    padding: 14px 6px 18px;
    text-align: center;

    .name {
      font-family: var(--font-display);
      font-variation-settings: var(--wonk);
      font-weight: 600;
      font-size: 1.24rem;
    }
    .role {
      font-family: var(--font-hand);
      font-size: 1.2rem;
      color: ${p => p.theme.textSoft};
      margin-top: 2px;
    }
  }
`

/** Bilhete manuscrito preso na quina da foto. */
const PhotoNote = styled.div`
  position: absolute;
  left: -46px;
  bottom: 46px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-hand);
  font-size: 1.3rem;
  color: ${p => p.theme.accentInk.rose};
  transform: rotate(-9deg);

  @media (max-width: 1080px) {
    display: none;
  }
`

const Body = styled.div`
  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.78;
    font-size: 1.06rem;
    margin-bottom: 18px;
  }
  strong {
    color: ${p => p.theme.text};
    font-weight: 800;
  }
`

const Signature = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  font-family: var(--font-hand);
  font-size: 2.1rem;
  color: ${p => p.theme.primary};
  transform: rotate(-3deg);
`

export function About() {
  const [hasPhoto, setHasPhoto] = useState(true)
  const tiltRef = useTilt<HTMLDivElement>(7)

  return (
    <Section as="section" id="sobre">
      <Blob
        $accent="rose"
        $size={300}
        $seconds={24}
        $opacity={0.12}
        style={{ bottom: -60, left: '18%' }}
      />
      <FloatingDoodle $seconds={8} $rotate={12} style={{ top: 40, right: '8%' }}>
        <Doodle name="heart" size={28} color="rose" />
      </FloatingDoodle>

      <Container>
        <Grid>
          <Reveal variant="tape" tilt={0}>
            <PolaroidWrap>
              <Tape />
              <Polaroid ref={tiltRef}>
                <div className="frame">
                  {hasPhoto ? (
                    <img
                      src={ProfilePhoto}
                      alt="Ana Beatriz, recrutadora"
                      onError={() => setHasPhoto(false)}
                    />
                  ) : (
                    <span className="mono">AB</span>
                  )}
                </div>
                <div className="caption">
                  <div className="name">{contact.name}</div>
                  <div className="role">
                    {contact.role} · {contact.location}
                  </div>
                </div>
              </Polaroid>
              <PhotoNote>
                {notes.about}
                <Doodle name="arrow" size={26} color="rose" strokeWidth={2.6} />
              </PhotoNote>
            </PolaroidWrap>
          </Reveal>

          <Reveal variant="right" delay={0.12}>
            <Body>
              <Kicker accent="rose">quem está do seu lado</Kicker>
              <H2 style={{ marginBottom: 24 }}>
                Eu vivo o recrutamento <Mark>por dentro</Mark>.
              </H2>
              <p>
                Sou <strong>Ana Beatriz</strong>, profissional de Recrutamento
                &amp; Seleção e Atração de Talentos, graduanda em Psicologia. Já
                estruturei processos seletivos do zero, fechei{' '}
                <strong>de 40 a 50 vagas por mês</strong> e cheguei a contratar{' '}
                <strong>70 profissionais em apenas 3 semanas</strong>.
              </p>
              <p>
                Faço hunting, triagem e entrevistas por competências todos os
                dias — então sei o que faz um currículo ser descartado e o que
                faz um perfil ser chamado. É esse olhar de quem contrata que eu
                coloco a serviço de quem está em busca.
              </p>
              <p>
                Minha missão é simples:{' '}
                <strong>conectar pessoas a oportunidades</strong>, fazendo você
                ser o mais atrativo possível para os sistemas e para as pessoas
                por trás deles.
              </p>
              <Signature>
                Ana Beatriz
                <WiggleOnHover>
                  <Doodle name="sparkle" size={20} color="rose" />
                </WiggleOnHover>
              </Signature>
            </Body>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}
