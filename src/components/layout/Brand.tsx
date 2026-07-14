import styled from 'styled-components'

const Wrap = styled.a`
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.32rem;
  letter-spacing: -0.02em;
  color: ${p => p.theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: ${p => p.theme.primary};
  }
`

const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${p => p.theme.primary};
  display: inline-block;
  box-shadow: 0 0 0 4px ${p => p.theme.keywordBg};
`

/** Marca "Ana Beatriz." reutilizada no nav e no rodape. */
export function Brand({ href = '#topo' }: { href?: string }) {
  return (
    <Wrap href={href}>
      <Dot />
      Ana Beatriz<span>.</span>
    </Wrap>
  )
}
