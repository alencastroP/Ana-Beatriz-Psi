import styled, { css } from 'styled-components'

/**
 * Bloco vertical padrao das secoes.
 * Use a prop transiente `$alt` para o fundo alternativo (rosa claro/escuro).
 */
export const Section = styled.section<{ $alt?: boolean }>`
  padding: 110px 0;

  ${p =>
    p.$alt &&
    css`
      background: ${p.theme.bgAlt};
      transition: background 0.4s ease;
    `}

  @media (max-width: 720px) {
    padding: 72px 0;
  }
`
