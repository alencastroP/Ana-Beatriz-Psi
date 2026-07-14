import styled from 'styled-components'
import { Container } from '../ui/Container'
import { Button, Ghost } from '../ui/Button'
import { scrollToId } from '../../utils/scroll'
import { AtsScanner } from './AtsScanner'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
  padding: 84px 0 96px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 56px 0 64px;
  }
`

const Col = styled.div`
  @media (max-width: 980px) {
    text-align: center;
  }
`

const Eyebrow = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: ${p => p.theme.primary};
  text-transform: uppercase;
  margin-bottom: 22px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${p => p.theme.keywordBg};
  padding: 7px 14px;
  border-radius: 999px;
`

const Title = styled.h1`
  font-family: 'Fraunces', serif;
  font-weight: 500;
  letter-spacing: -0.025em;
  font-size: clamp(2.5rem, 5.4vw, 4rem);
  line-height: 1.04;
  margin-bottom: 24px;

  em {
    font-style: italic;
    color: ${p => p.theme.primary};
  }
`

const Lead = styled.p`
  font-size: 1.16rem;
  line-height: 1.6;
  color: ${p => p.theme.textSoft};
  max-width: 520px;
  margin-bottom: 34px;

  @media (max-width: 980px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Ctas = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 980px) {
    justify-content: center;
  }
`

export function Hero() {
  return (
    <Container id="topo">
      <Grid>
        <Col>
          <Eyebrow>✦ vista por dentro do recrutamento</Eyebrow>
          <Title>
            Quem decide do <em>outro lado</em> da mesa agora trabalha por você.
          </Title>
          <Lead>
            Antes de um recrutador te ver, um robô (o ATS) já decidiu se você
            avança. Sou recrutadora de verdade — e reescrevo seu currículo e seu
            perfil para passar na máquina e <strong>conquistar a pessoa</strong>.
          </Lead>
          <Ctas>
            <Button onClick={() => scrollToId('contato')}>
              Analisar meu currículo
            </Button>
            <Ghost href="#processo">Ver como funciona →</Ghost>
          </Ctas>
        </Col>

        <AtsScanner />
      </Grid>
    </Container>
  )
}
