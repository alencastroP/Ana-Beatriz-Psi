import type { CSSProperties } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { ease } from '../../styles/animations'
import type { AccentName, AppTheme } from '../../styles/theme'

/**
 * Kit de rabiscos a mao.
 *
 * Todos os tracos sao curvas (`C`/`S`), nunca retas perfeitas -- e a
 * imperfeicao que faz parecer caneta e nao vetor gerado. Os contornados se
 * desenham sozinhos ao entrar na viewport, via `pathLength={1}`: isso
 * normaliza qualquer path para 0..1 e dispensa medir o comprimento real.
 */

interface DoodleShape {
  viewBox: string
  paths: string[]
  /** Preenchidos entram com um "pop" em vez de serem desenhados. */
  filled?: boolean
}

const SHAPES = {
  /** Sublinhado ondulado, com uma segunda passada por cima. */
  underline: {
    viewBox: '0 0 200 22',
    paths: [
      'M4 14 C 38 5, 66 19, 100 10 S 166 4, 196 13',
      'M12 19 C 44 12, 78 22, 116 15 S 172 11, 190 18',
    ],
  },
  /** Circulo torto em volta de uma palavra -- sempre abre no fim. */
  circle: {
    viewBox: '0 0 210 104',
    paths: [
      'M104 8 C 46 6, 10 26, 9 52 C 8 80, 60 98, 112 97 C 164 96, 200 74, 198 48 C 196 24, 156 8, 100 9 C 74 10, 50 15, 36 26',
    ],
  },
  /** Seta curva apontando para baixo. */
  arrow: {
    viewBox: '0 0 120 86',
    paths: [
      'M8 10 C 44 2, 96 18, 100 56',
      'M86 42 C 92 48, 97 54, 100 60 C 105 52, 110 45, 116 40',
    ],
  },
  /** Rabisco de enfase, tipo "pensei e risquei". */
  scribble: {
    viewBox: '0 0 140 40',
    paths: ['M5 22 C 21 4, 31 36, 47 19 S 75 3, 89 24 S 117 36, 134 16'],
  },
  /** Espiral -- o gesto mais "caderno de anotacao" do kit. */
  spiral: {
    viewBox: '0 0 44 44',
    paths: [
      'M31 23 C 31 16, 25 11, 19 13 C 11 16, 9 27, 16 33 C 25 40, 38 33, 40 22 C 42 8, 29 -1, 16 3',
    ],
  },
  /** Folhinha: o toque organico das secoes mais calmas. */
  leaf: {
    viewBox: '0 0 64 64',
    paths: [
      'M8 58 C 11 32, 28 12, 56 7 C 57 34, 40 55, 9 58 Z',
      'M9 58 C 21 47, 35 34, 48 19',
    ],
  },
  /** Balaozinho de fala, para depoimentos. */
  chat: {
    viewBox: '0 0 64 56',
    paths: [
      'M9 10 C 9 6, 12 4, 17 4 C 30 3, 46 3, 53 5 C 57 6, 58 9, 58 14 C 58 26, 57 34, 55 37 C 53 40, 40 41, 30 41 C 26 46, 21 50, 15 52 C 17 47, 18 44, 18 41 C 13 40, 9 38, 9 34 Z',
    ],
  },
  /** Coracao meio torto (proposital). */
  heart: {
    viewBox: '0 0 44 40',
    filled: true,
    paths: [
      'M22 37 C 6 26, 2 17, 5 10 C 9 2, 19 4, 22 12 C 25 3, 36 2, 39 10 C 42 18, 37 26, 22 37 Z',
    ],
  },
  /** Brilho de 4 pontas, usado como pontuacao visual. */
  sparkle: {
    viewBox: '0 0 40 40',
    filled: true,
    paths: [
      'M20 1 C 22.5 13, 27 17.5, 39 20 C 27 22.5, 22.5 27, 20 39 C 17.5 27, 13 22.5, 1 20 C 13 17.5, 17.5 13, 20 1 Z',
    ],
  },
  /** Asterisco desenhado a mao. */
  asterisk: {
    viewBox: '0 0 40 40',
    paths: [
      'M20 4 C 20 14, 20 26, 20 36',
      'M7 12 C 15 17, 25 23, 33 28',
      'M33 12 C 25 17, 15 23, 7 28',
    ],
  },
  /** Check torto, para listas aprovadas. */
  check: {
    viewBox: '0 0 56 40',
    paths: ['M5 20 C 11 24, 16 29, 21 35 C 30 20, 40 9, 52 3'],
  },
  /** Xis, o par do check. */
  cross: {
    viewBox: '0 0 40 40',
    paths: [
      'M7 6 C 16 15, 25 24, 34 34',
      'M34 6 C 25 15, 16 24, 7 34',
    ],
  },
  /* --- icones dos servicos, no mesmo traco de caneta --- */
  iconDoc: {
    viewBox: '0 0 64 64',
    paths: [
      'M15 7 C 24 5, 33 5, 40 7 C 45 12, 50 17, 52 22 C 53 34, 53 48, 51 57 C 40 59, 24 59, 14 57 C 12 44, 12 20, 15 7 Z',
      'M39 6 C 40 12, 40 18, 41 21 C 44 22, 48 22, 52 22',
      'M22 30 C 28 29, 35 29, 43 30',
      'M22 39 C 28 38, 35 38, 43 39',
      'M22 48 C 26 47, 30 47, 35 48',
    ],
  },
  iconBadge: {
    viewBox: '0 0 64 64',
    paths: [
      'M7 22 C 22 19, 42 19, 57 22 C 58 34, 58 46, 56 55 C 41 58, 22 58, 8 55 C 6 45, 6 32, 7 22 Z',
      'M24 21 C 24 15, 24 12, 26 11 C 31 10, 34 10, 39 11 C 41 12, 41 16, 41 21',
      'M7 34 C 22 39, 42 39, 57 34',
      'M29 35 C 31 34, 34 34, 36 35',
    ],
  },
  iconTarget: {
    viewBox: '0 0 64 64',
    paths: [
      'M32 8 C 15 9, 7 20, 8 33 C 9 47, 20 56, 33 55 C 47 54, 56 43, 55 30 C 54 18, 45 9, 32 8 Z',
      'M32 20 C 24 21, 20 26, 21 32 C 22 39, 27 43, 33 42 C 40 41, 44 36, 43 30 C 42 24, 38 20, 32 20 Z',
      'M31 32 C 38 25, 45 18, 53 11',
      'M44 11 C 45 14, 46 17, 45 20 C 48 19, 51 18, 54 19',
    ],
  },
  iconMic: {
    viewBox: '0 0 64 64',
    paths: [
      'M32 6 C 26 6, 23 10, 23 16 C 23 23, 23 28, 24 32 C 25 37, 29 39, 33 38 C 38 37, 40 33, 40 27 C 41 20, 41 12, 39 9 C 37 6, 35 6, 32 6 Z',
      'M15 28 C 15 40, 23 47, 32 47 C 42 47, 49 39, 48 27',
      'M32 47 C 32 51, 32 54, 31 58',
      'M22 58 C 28 57, 36 57, 42 58',
    ],
  },
} satisfies Record<string, DoodleShape>

export type DoodleName = keyof typeof SHAPES

const Svg = styled.svg<{ $visible: boolean; $delay: number; $filled: boolean }>`
  display: block;
  overflow: visible;

  path {
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${p =>
    p.$filled
      ? css`
          transform-origin: center;
          opacity: ${p.$visible ? 1 : 0};
          transform: scale(${p.$visible ? 1 : 0.3})
            rotate(${p.$visible ? 0 : -40}deg);
          transition: transform 0.6s ${ease.spring}, opacity 0.4s ease;
          transition-delay: ${p.$delay}s;
        `
      : css`
          path {
            stroke-dashoffset: ${p.$visible ? 0 : 1};
            transition: stroke-dashoffset 1.05s ${ease.soft};
          }
          /* Um traco depois do outro: parece uma mao desenhando. */
          path:nth-child(1) {
            transition-delay: ${p.$delay}s;
          }
          path:nth-child(2) {
            transition-delay: ${p.$delay + 0.22}s;
          }
          path:nth-child(3) {
            transition-delay: ${p.$delay + 0.4}s;
          }
          path:nth-child(4) {
            transition-delay: ${p.$delay + 0.55}s;
          }
          path:nth-child(5) {
            transition-delay: ${p.$delay + 0.68}s;
          }
        `}
`

export interface DoodleProps {
  name: DoodleName
  /** Largura em px (a altura segue a proporcao do viewBox). */
  size?: number
  /** Nome de um acento do tema, ou qualquer cor CSS. */
  color?: AccentName | 'primary' | 'ink' | 'text' | (string & {})
  strokeWidth?: number
  /** Atraso do desenho, em segundos. */
  delay?: number
  /** Desenha imediatamente, sem esperar entrar na viewport. */
  eager?: boolean
  className?: string
  style?: CSSProperties
}

function resolveColor(theme: AppTheme, color: DoodleProps['color']): string {
  if (!color) return theme.primary
  if (color === 'primary') return theme.primary
  if (color === 'ink') return theme.ink
  if (color === 'text') return theme.text
  if (color in theme.accents) return theme.accents[color as AccentName]
  return color
}

/** Rabisco decorativo. Sempre `aria-hidden` -- e ornamento, nao conteudo. */
export function Doodle({
  name,
  size = 64,
  color,
  strokeWidth = 2.4,
  delay = 0,
  eager = false,
  className,
  style,
}: DoodleProps) {
  const shape: DoodleShape = SHAPES[name]
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const visible = eager || inView

  const [w, h] = shape.viewBox.split(' ').slice(2).map(Number)
  const stroke = (theme: AppTheme) => resolveColor(theme, color)

  return (
    <Svg
      ref={ref}
      className={className}
      style={style}
      viewBox={shape.viewBox}
      width={size}
      height={(size * h) / w}
      fill="none"
      aria-hidden="true"
      focusable="false"
      $visible={visible}
      $delay={delay}
      $filled={Boolean(shape.filled)}
    >
      {shape.paths.map(d => (
        <Path
          key={d}
          d={d}
          pathLength={1}
          $filled={Boolean(shape.filled)}
          $stroke={stroke}
          $strokeWidth={strokeWidth}
        />
      ))}
    </Svg>
  )
}

const Path = styled.path<{
  $filled: boolean
  $stroke: (theme: AppTheme) => string
  $strokeWidth: number
}>`
  ${p =>
    p.$filled
      ? css`
          fill: ${p.$stroke(p.theme)};
        `
      : css`
          fill: none;
          stroke: ${p.$stroke(p.theme)};
          stroke-width: ${p.$strokeWidth};
          stroke-dasharray: 1;
        `}
  transition: stroke 0.5s ${ease.inOut}, fill 0.5s ${ease.inOut};
`
