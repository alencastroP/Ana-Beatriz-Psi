import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Button, Ghost } from '../ui/Button'
import { Doodle } from '../ui/Doodle'
import { Blob, BreathingDot, FloatingDoodle } from '../ui/Decor'
import { Circled } from '../ui/Heading'
import { ease, nudgeDown, wordUp } from '../../styles/animations'
import { usePointerParallax } from '../../hooks/useParallax'
import { scrollToId } from '../../utils/scroll'
import { notes } from '../../data/content'
import { AtsScanner } from './AtsScanner'

const Wrap = styled.header`
  position: relative;
  overflow: hidden;
`

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
  padding: 76px 0 104px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 56px;
    padding: 48px 0 72px;
  }
`

const Col = styled.div`
  @media (max-width: 980px) {
    text-align: center;
  }
`

/** Bilhete manuscrito com a setinha apontando para o titulo. */
const HandNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-family: var(--font-hand);
  font-size: 1.45rem;
  color: ${p => p.theme.accentInk.lilac};
  transform: rotate(-3deg);
  margin-bottom: 4px;
  animation: ${wordUp} 0.9s ${ease.spring} both;
  animation-delay: 1.1s;

  svg {
    transform: rotate(12deg) scaleX(-1);
    margin-top: -2px;
  }

  @media (max-width: 980px) {
    justify-content: center;
  }
`

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  color: ${p => p.theme.textSoft};
  border: 2px dashed ${p => p.theme.border};
  background: ${p => p.theme.card};
  padding: 8px 18px 8px 14px;
  border-radius: 999px;
  margin-bottom: 22px;
  transform: rotate(-0.8deg);
  animation: ${wordUp} 0.7s ${ease.spring} both;
`

const Title = styled.h1`
  font-family: var(--font-display);
  font-variation-settings: var(--wonk);
  font-weight: 500;
  font-size: clamp(2.6rem, 5.6vw, 4.15rem);
  line-height: 1.02;
  margin-bottom: 26px;
`

const Word = styled.span<{ $i: number; $raw?: boolean }>`
  display: inline-block;
  overflow: ${p => (p.$raw ? 'visible' : 'hidden')};
  vertical-align: bottom;
  margin-right: 0.26em;
  /* O padding-bottom evita que descidas (g, y, q) sejam cortadas pela
     mascara -- e compensado pela margem negativa. */
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;

  > span {
    display: inline-block;
    animation: ${wordUp} 0.85s ${ease.out} both;
    animation-delay: ${p => 0.12 + p.$i * 0.07}s;
  }
`

const Lead = styled.p`
  font-size: 1.18rem;
  line-height: 1.66;
  color: ${p => p.theme.textSoft};
  max-width: 520px;
  margin-bottom: 34px;
  animation: ${wordUp} 0.8s ${ease.out} both;
  animation-delay: 0.85s;

  strong {
    color: ${p => p.theme.text};
    font-weight: 800;
  }

  @media (max-width: 980px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Ctas = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  animation: ${wordUp} 0.8s ${ease.out} both;
  animation-delay: 1s;

  @media (max-width: 980px) {
    justify-content: center;
  }
`

const ScrollCue = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 52px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-family: var(--font-hand);
  font-size: 1.25rem;
  color: ${p => p.theme.textSoft};
  animation: ${nudgeDown} 2.6s ease-in-out infinite;
  animation-delay: 2s;
  transition: color 0.25s;

  &:hover {
    color: ${p => p.theme.primary};
  }

  @media (max-width: 980px) {
    display: none;
  }
`

/** Titulo do hero, palavra por palavra, subindo por tras de uma mascara. */
const TITLE_WORDS: ReactNode[] = [
  'Quem',
  'decide',
  'do',
  <Circled key="outro" color="rose" delay={1.15}>
    outro lado
  </Circled>,
  'da',
  'mesa',
  'agora',
  'trabalha',
  'por',
  'você.',
]

export function Hero() {
  const parallaxRef = usePointerParallax<HTMLElement>()

  return (
    <Wrap id="topo" ref={parallaxRef}>
      <Blob $accent="rose" $size={340} style={{ top: -90, left: -110 }} />
      <Blob
        $accent="ochre"
        $size={260}
        $seconds={26}
        $delay={-6}
        $opacity={0.1}
        style={{ top: 430, right: '52%' }}
      />
      <Blob
        $accent="sage"
        $size={300}
        $seconds={30}
        $delay={-12}
        $opacity={0.11}
        style={{ bottom: -120, right: -80 }}
      />

      <FloatingDoodle $depth={16} $seconds={9} style={{ top: 70, right: '6%' }}>
        <Doodle name="spiral" size={54} color="ochre" strokeWidth={2.6} eager />
      </FloatingDoodle>
      <FloatingDoodle
        $depth={26}
        $seconds={7}
        $delay={-2}
        style={{ top: 300, left: '3%' }}
      >
        <Doodle name="sparkle" size={26} color="lilac" eager />
      </FloatingDoodle>
      <FloatingDoodle
        $depth={10}
        $seconds={11}
        $delay={-4}
        $rotate={-18}
        style={{ bottom: 130, left: '38%' }}
      >
        <Doodle name="leaf" size={46} color="sage" strokeWidth={3} eager />
      </FloatingDoodle>

      <Container>
        <Grid>
          <Col>
            <Eyebrow>
              <BreathingDot $size={9} />
              vista por dentro do recrutamento
            </Eyebrow>

            <Title>
              {TITLE_WORDS.map((word, i) => (
                <Word key={i} $i={i} $raw={typeof word !== 'string'}>
                  <span>{word}</span>
                </Word>
              ))}
            </Title>

            <HandNote>
              <Doodle name="arrow" size={30} color="lilac" strokeWidth={2.6} eager delay={1.3} />
              {notes.hero}
            </HandNote>

            <Lead>
              Antes de um recrutador te ver, um robô (o ATS) já decidiu se você
              avança. Sou recrutadora de verdade — e reescrevo seu currículo e
              seu perfil para passar na máquina e{' '}
              <strong>conquistar a pessoa</strong>.
            </Lead>

            <Ctas>
              <Button onClick={() => scrollToId('contato')}>
                Analisar meu currículo
              </Button>
              <Ghost href="#processo">
                Ver como funciona <span className="arrow">→</span>
              </Ghost>
            </Ctas>

            <ScrollCue
              type="button"
              onClick={() => scrollToId('problema')}
              aria-label="Ir para a próxima seção"
            >
              role pra baixo ↓
            </ScrollCue>
          </Col>

          <AtsScanner />
        </Grid>
      </Container>
    </Wrap>
  )
}
