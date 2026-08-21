import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, SectionLead, Mark } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { Doodle } from '../ui/Doodle'
import { Blob, FloatingDoodle } from '../ui/Decor'
import { ease, stampIn } from '../../styles/animations'
import { notes } from '../../data/content'

const Grid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-top: 44px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 56px;
  }
`

/** As duas folhas empilhadas na mesa, uma cobrindo a outra. */
const Stack = styled.div`
  position: relative;
  padding: 10px 0 40px;
`

const Sheet = styled.div<{ $tilt: number; $accent: 'reject' | 'pass' }>`
  position: relative;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 12px 16px 10px 14px;
  padding: 26px 26px 30px;
  box-shadow: 7px 8px 0 ${p => p.theme.shade};
  transform: rotate(${p => p.$tilt}deg);
  transition: transform 0.4s ${ease.spring}, box-shadow 0.4s ${ease.spring};

  &:hover {
    transform: rotate(0deg) translateY(-5px);
    box-shadow: 10px 12px 0 ${p => p.theme.shade};
    z-index: 4;
  }

  ${p =>
    p.$accent === 'pass' &&
    css`
      margin-top: -18px;
      margin-left: 42px;
      z-index: 3;
      background: ${p.theme.accentSoft.sage};

      @media (max-width: 520px) {
        margin-left: 12px;
      }
    `}

  ${p =>
    p.$accent === 'reject' &&
    css`
      z-index: 2;
      opacity: 0.95;
    `}

  .file {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 0.95rem;
    color: ${p => p.theme.text};
    margin-bottom: 16px;
  }

  .why {
    font-family: var(--font-hand);
    font-size: 1.24rem;
    line-height: 1.3;
    color: ${p =>
      p.$accent === 'pass'
        ? p.theme.accentInk.sage
        : p.theme.accentInk.coral};
    margin-top: 16px;
  }
`

const Bar = styled.div<{ $w?: string; $dim?: boolean }>`
  height: 8px;
  border-radius: 999px;
  background: ${p => p.theme.surface};
  opacity: ${p => (p.$dim ? 0.6 : 1)};
  width: ${p => p.$w ?? '100%'};
  margin-bottom: 8px;
`

/** Carimbo que bate no papel quando a secao entra na tela. */
const Stamp = styled.div<{ $visible: boolean; $tone: 'reject' | 'pass' }>`
  position: absolute;
  top: 26px;
  right: -14px;
  font-family: var(--font-display);
  font-variation-settings: var(--wonk);
  font-weight: 700;
  font-style: italic;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 7px 15px;
  border-radius: 8px;
  color: ${p =>
    p.$tone === 'pass' ? p.theme.accentInk.sage : p.theme.accentInk.coral};
  border: 3px solid currentColor;
  opacity: 0;

  ${p =>
    p.$visible &&
    css`
      animation: ${stampIn} 0.55s ${ease.spring} both;
      animation-delay: ${p.$tone === 'reject' ? 0.5 : 1.1}s;
    `}
`

const HandNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-hand);
  font-size: 1.4rem;
  color: ${p => p.theme.accentInk.ochre};
  transform: rotate(-2deg);
  margin-top: 26px;
`

export function Problem() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <Section as="section" id="problema" $alt>
      <Blob
        $accent="coral"
        $size={280}
        $seconds={25}
        $opacity={0.1}
        style={{ top: 40, right: -90 }}
      />
      <FloatingDoodle $seconds={10} $rotate={14} style={{ top: 60, left: '5%' }}>
        <Doodle name="scribble" size={70} color="coral" strokeWidth={2.2} />
      </FloatingDoodle>

      <Container>
        <Reveal>
          <Kicker accent="coral">o ponto cego de quem se candidata</Kicker>
          <H2>
            Seu currículo é lido por uma <Mark>máquina</Mark> antes de chegar a
            um humano.
          </H2>
        </Reveal>

        <Grid ref={ref}>
          <Reveal variant="left" delay={0.1}>
            <SectionLead>
              A maioria das vagas usa um ATS — um sistema que faz triagem
              automática. Ele filtra por palavras-chave, formato e estrutura.
              Currículo bonito demais, cheio de tabelas, ou sem os termos
              certos, é descartado antes de qualquer pessoa abrir. Eu uso esses
              sistemas todos os dias do lado de quem contrata — e sei exatamente
              o que faz um perfil passar ou parar na peneira.
            </SectionLead>
            <HandNote>
              <Doodle name="spiral" size={26} color="ochre" strokeWidth={2.8} />
              {notes.problem}
            </HandNote>
          </Reveal>

          <Reveal variant="right" delay={0.15}>
            <Stack>
              <Sheet $tilt={-2.4} $accent="reject">
                <div className="file">
                  <Doodle name="cross" size={15} color="coral" strokeWidth={4} />
                  currículo_padrão.pdf
                </div>
                <Bar $w="88%" $dim />
                <Bar $w="96%" $dim />
                <Bar $w="70%" $dim />
                <div className="why">
                  parou na peneira: formato quebrado, sem as palavras certas
                </div>
                <Stamp $visible={inView} $tone="reject">
                  descartado
                </Stamp>
              </Sheet>

              <Sheet $tilt={1.8} $accent="pass">
                <div className="file">
                  <Doodle name="check" size={16} color="sage" strokeWidth={4} />
                  currículo_otimizado.pdf
                </div>
                <Bar $w="94%" />
                <Bar $w="86%" />
                <Bar $w="78%" />
                <div className="why">
                  94% de match — chegou inteiro na mesa do recrutador
                </div>
                <Stamp $visible={inView} $tone="pass">
                  aprovado
                </Stamp>
              </Sheet>
            </Stack>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}
