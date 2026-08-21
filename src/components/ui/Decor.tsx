import styled, { css } from 'styled-components'
import { blobMorph, breathe, float, wiggle } from '../../styles/animations'
import type { AccentName } from '../../styles/theme'

/**
 * Mancha organica de fundo.
 *
 * Muda de forma devagar (border-radius animado) em vez de ser um circulo
 * borrado parado. Fica sempre atras do conteudo e nunca captura o mouse.
 */
export const Blob = styled.div<{
  $accent: AccentName
  $size: number
  $seconds?: number
  $delay?: number
  $opacity?: number
}>`
  position: absolute;
  z-index: 0;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  background: ${p => p.theme.accents[p.$accent]};
  opacity: ${p => p.$opacity ?? 0.14};
  filter: blur(6px);
  pointer-events: none;
  animation: ${blobMorph} ${p => p.$seconds ?? 22}s ease-in-out infinite;
  animation-delay: ${p => p.$delay ?? 0}s;
  will-change: border-radius, transform;
`

/**
 * Rabisco solto flutuando no fundo.
 *
 * `$depth` liga o elemento ao parallax de ponteiro do container (as vars
 * `--px`/`--py` vem do hook `usePointerParallax`): quanto maior, mais ele
 * se desloca em relacao ao cursor.
 */
export const FloatingDoodle = styled.div<{
  $depth?: number
  $seconds?: number
  $delay?: number
  $rotate?: number
}>`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  animation: ${float} ${p => p.$seconds ?? 8}s ease-in-out infinite;
  animation-delay: ${p => p.$delay ?? 0}s;

  ${p =>
    p.$depth &&
    css`
      /* Duas camadas de transform: o float anima o wrapper, o parallax
         anda no filho -- assim um nao sobrescreve o outro. */
      > * {
        transform: translate3d(
            calc(var(--px, 0) * ${p.$depth}px),
            calc(var(--py, 0) * ${p.$depth}px),
            0
          )
          rotate(${p.$rotate ?? 0}deg);
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
    `}

  ${p =>
    !p.$depth &&
    p.$rotate &&
    css`
      > * {
        transform: rotate(${p.$rotate}deg);
      }
    `}

  @media (max-width: 720px) {
    display: none;
  }
`

/** Pontinho que pulsa como respiracao -- usado na marca e nos separadores. */
export const BreathingDot = styled.span<{ $size?: number }>`
  display: inline-block;
  width: ${p => p.$size ?? 10}px;
  height: ${p => p.$size ?? 10}px;
  border-radius: 50%;
  background: ${p => p.theme.primary};
  box-shadow: 0 0 0 4px ${p => p.theme.keywordBg};
  animation: ${breathe} 4.5s ease-in-out infinite;
`

/** Da um balancinho no filho quando o mouse passa por cima. */
export const WiggleOnHover = styled.span`
  display: inline-flex;

  &:hover > * {
    animation: ${wiggle} 0.55s ease-in-out;
  }
`
