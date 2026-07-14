import { useState } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Kicker, H2 } from '../ui/Heading'
import { Reveal } from '../ui/Reveal'
import { contact } from '../../data/content'
import ProfilePhoto from '../../utils/ana-beatriz.jpg'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 52px;
  align-items: center;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 36px;
    text-align: center;
  }
`

const Portrait = styled.div`
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(150deg, ${p => p.theme.primary}, ${p => p.theme.accent});
  display: grid;
  place-items: center;
  box-shadow: ${p => p.theme.shadow};
  max-width: 360px;
  margin: 0 auto;
  width: 100%;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mono {
    font-family: 'Fraunces', serif;
    font-size: 5rem;
    font-weight: 600;
    color: #fff;
    opacity: 0.92;
  }

  .tag {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    background: ${p => p.theme.card};
    border-radius: 14px;
    padding: 12px 16px;
    text-align: left;
    box-shadow: ${p => p.theme.cardShadow};

    .role {
      font-weight: 600;
      font-size: 0.95rem;
    }
    .loc {
      font-size: 0.82rem;
      color: ${p => p.theme.textSoft};
      font-family: 'Space Mono', monospace;
    }
  }
`

const Body = styled.div`
  p {
    color: ${p => p.theme.textSoft};
    line-height: 1.72;
    font-size: 1.05rem;
    margin-bottom: 16px;
  }
  strong {
    color: ${p => p.theme.text};
    font-weight: 600;
  }
`

// Coloque a foto em `public/ana-beatriz.jpg` para substituir o monograma.
const PHOTO_SRC = ProfilePhoto;

export function About() {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <Section as="section" id="sobre">
      <Container>
        <Grid>
          <Reveal as={Portrait}>
            {hasPhoto ? (
              <img
                src={PHOTO_SRC}
                alt="Ana Beatriz, recrutadora"
                onError={() => setHasPhoto(false)}
              />
            ) : (
              <span className="mono">AB</span>
            )}
            <div className="tag">
              <div className="role">{contact.name}</div>
              <div className="loc">
                {contact.role} · {contact.location}
              </div>
            </div>
          </Reveal>

          <Body>
            <Kicker>Quem está do seu lado</Kicker>
            <H2 as="h2" style={{ marginBottom: 22 }}>
              Eu vivo o recrutamento <em>por dentro</em>.
            </H2>
            <p>
              Sou <strong>Ana Beatriz</strong>, profissional de Recrutamento &amp;
              Seleção e Atração de Talentos, graduanda em Psicologia. Já
              estruturei processos seletivos do zero, fechei{' '}
              <strong>de 40 a 50 vagas por mês</strong> e cheguei a contratar{' '}
              <strong>70 profissionais em apenas 3 semanas</strong>.
            </p>
            <p>
              Faço hunting, triagem e entrevistas por competências todos os dias —
              então sei o que faz um currículo ser descartado e o que faz um
              perfil ser chamado. É esse olhar de quem contrata que eu coloco a
              serviço de quem está em busca.
            </p>
            <p>
              Minha missão é simples:{' '}
              <strong>conectar pessoas a oportunidades</strong>, fazendo você ser
              o mais atrativo possível para os sistemas e para as pessoas por
              trás deles.
            </p>
          </Body>
        </Grid>
      </Container>
    </Section>
  )
}
