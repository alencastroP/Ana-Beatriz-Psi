import styled from 'styled-components'

/** Pequeno rotulo em monospace acima dos titulos de secao. */
export const Kicker = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.theme.primary};
  margin-bottom: 14px;
`

/** Titulo de secao (serifado). Use <em> para destacar em rosa. */
export const H2 = styled.h2`
  font-family: 'Fraunces', serif;
  font-weight: 500;
  letter-spacing: -0.02em;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.1;
  max-width: 640px;

  em {
    font-style: italic;
    color: ${p => p.theme.primary};
  }
`

/** Paragrafo de apoio sob os titulos de secao. */
export const SectionLead = styled.p`
  color: ${p => p.theme.textSoft};
  font-size: 1.08rem;
  line-height: 1.6;
  max-width: 560px;
  margin-top: 18px;
`
