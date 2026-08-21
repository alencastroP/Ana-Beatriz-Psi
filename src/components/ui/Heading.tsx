import type { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { ease } from '../../styles/animations'
import type { AccentName } from '../../styles/theme'
import { Doodle } from './Doodle'

const KickerWrap = styled.div<{ $accent: AccentName }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-hand);
  font-size: 1.5rem;
  line-height: 1;
  color: ${p => p.theme.accentInk[p.$accent]};
  margin-bottom: 14px;
  transform: rotate(-1.5deg);

  svg {
    flex-shrink: 0;
  }
`

/**
 * Rotulo acima dos titulos de secao -- escrito a mao, com um asterisco
 * rabiscado na frente. Era aqui que morava o monospace que dava a cara de
 * painel de sistema.
 */
export function Kicker({
  children,
  accent = 'rose',
}: {
  children: ReactNode
  accent?: AccentName
}) {
  return (
    <KickerWrap $accent={accent}>
      <Doodle name="asterisk" size={17} color={accent} strokeWidth={3} />
      {children}
    </KickerWrap>
  )
}

/** Titulo de secao. Use <Mark> ou <Circled> para destacar palavras. */
export const H2 = styled.h2`
  font-family: var(--font-display);
  font-variation-settings: var(--wonk);
  font-weight: 500;
  font-size: clamp(2.05rem, 4.2vw, 3rem);
  line-height: 1.06;
  max-width: 660px;

  em {
    font-style: italic;
    color: ${p => p.theme.primary};
  }
`

/** Paragrafo de apoio sob os titulos de secao. */
export const SectionLead = styled.p`
  color: ${p => p.theme.textSoft};
  font-size: 1.1rem;
  line-height: 1.68;
  max-width: 560px;
  margin-top: 18px;
`

const MarkEl = styled.em<{ $visible: boolean; $custom?: string }>`
  font-style: italic;
  font-variation-settings: 'SOFT' 100, 'WONK' 1;
  /* &&: sobe a especificidade acima da regra "em" do H2, que senao
     repintaria o texto de rosa e sujaria o amarelo do marcador. */
  && {
    color: ${p => p.theme.text};
  }
  padding: 0 0.1em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  background-image: linear-gradient(
    ${p => p.$custom ?? p.theme.highlight} 0%,
    ${p => p.$custom ?? p.theme.highlight} 100%
  );
  background-repeat: no-repeat;
  background-position: 0 88%;
  background-size: ${p => (p.$visible ? '100%' : '0%')} 42%;
  transition: background-size 0.85s ${ease.out};
  transition-delay: 0.45s;
`

/**
 * Palavra passada a marca-texto: o traco corre da esquerda para a direita
 * quando o titulo entra na tela, como se alguem grifasse na hora.
 */
export function Mark({
  children,
  color,
}: {
  children: ReactNode
  color?: string
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <MarkEl ref={ref} $visible={inView} $custom={color}>
      {children}
    </MarkEl>
  )
}

const CircledWrap = styled.span`
  position: relative;
  display: inline-block;
  white-space: nowrap;
  font-style: italic;
  color: ${p => p.theme.primary};

  svg {
    position: absolute;
    left: -8%;
    top: -16%;
    width: 116%;
    height: 134%;
    pointer-events: none;
  }
`

/** Palavra com um circulo torto desenhado em volta ao entrar na tela. */
export function Circled({
  children,
  color = 'rose',
  delay = 0.3,
}: {
  children: ReactNode
  color?: AccentName
  delay?: number
}) {
  return (
    <CircledWrap>
      {children}
      <Doodle name="circle" color={color} strokeWidth={1.6} delay={delay} />
    </CircledWrap>
  )
}
