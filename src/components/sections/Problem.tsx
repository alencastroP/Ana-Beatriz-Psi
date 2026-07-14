import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2, SectionLead } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`

const RejectCard = styled.div`
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 20px;
  padding: 26px;
  box-shadow: ${p => p.theme.cardShadow};
  font-family: 'Space Mono', monospace;
  font-size: 0.86rem;
  line-height: 1.7;

  .head {
    display: flex;
    justify-content: space-between;
    color: ${p => p.theme.textSoft};
    border-bottom: 1px dashed ${p => p.theme.border};
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
  }
  .muted {
    opacity: 0.6;
    font-size: 0.78rem;
  }
  .reject {
    color: #d23;
  }
  .pass {
    color: #1a9;
  }
`

export function Problem() {
  return (
    <Section as="section" id="problema" $alt>
      <Container>
        <Reveal>
          <Kicker>O ponto cego de quem se candidata</Kicker>
          <H2>
            Seu currículo é lido por uma <em>máquina</em> antes de chegar a um
            humano.
          </H2>
        </Reveal>
        <Grid>
          <SectionLead>
            A maioria das vagas usa um ATS — um sistema que faz triagem
            automática. Ele filtra por palavras-chave, formato e estrutura.
            Currículo bonito demais, cheio de tabelas, ou sem os termos certos, é
            descartado antes de qualquer pessoa abrir. Eu uso esses sistemas
            todos os dias do lado de quem contrata — e sei exatamente o que faz
            um perfil passar ou parar na peneira.
          </SectionLead>
          <Reveal delay={0.1} as={RejectCard}>
            <div className="head">
              <span>triagem_ats.log</span>
              <span>2 candidatos</span>
            </div>
            <div className="row">
              <span>▸ curriculo_padrao.pdf</span>
              <span className="reject">descartado ✗</span>
            </div>
            <div className="row muted">
              <span>&nbsp;&nbsp;motivo: formato + sem keywords</span>
              <span />
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <span>▸ curriculo_otimizado.pdf</span>
              <span className="pass">aprovado ✓</span>
            </div>
            <div className="row muted">
              <span>&nbsp;&nbsp;match: 94% · enviado ao recrutador</span>
              <span />
            </div>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  )
}
