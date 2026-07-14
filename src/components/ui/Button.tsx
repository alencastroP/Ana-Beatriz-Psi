import styled from 'styled-components'

/** Botao primario (CTA solido). */
export const Button = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.98rem;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 14px 28px;
  background: ${p => p.theme.primary};
  color: #fff;
  box-shadow: ${p => p.theme.shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s;

  &:hover {
    transform: translateY(-2px);
    background: ${p => p.theme.primaryDeep};
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid ${p => p.theme.accent};
    outline-offset: 2px;
  }
`

/** Botao secundario (contorno), renderizado como link. */
export const Ghost = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.96rem;
  color: ${p => p.theme.text};
  border: 1.5px solid ${p => p.theme.border};
  border-radius: 999px;
  padding: 12px 24px;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
`
