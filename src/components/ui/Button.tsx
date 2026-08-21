import styled, { css } from 'styled-components'
import { ease } from '../../styles/animations'

/**
 * Botao primario (CTA solido).
 *
 * O truque aqui e a "sombra dura": em vez do box-shadow difuso de sempre,
 * uma copia solida deslocada, como adesivo colado no papel. No hover o
 * botao sobe e a sombra cresce; no clique ele afunda ate encostar nela.
 */
export const Button = styled.button`
  position: relative;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: -0.01em;
  border: 2px solid ${p => p.theme.ink};
  cursor: pointer;
  border-radius: 999px;
  padding: 14px 30px;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.onAccent};
  box-shadow: 4px 4px 0 ${p => p.theme.shade};
  transition: transform 0.24s ${ease.spring}, box-shadow 0.24s ${ease.spring},
    background 0.4s ${ease.inOut};

  &:hover {
    transform: translate(-2px, -3px);
    box-shadow: 7px 8px 0 ${p => p.theme.shade};
    background: ${p => p.theme.primaryDeep};
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 ${p => p.theme.shade};
    transition-duration: 0.08s;
  }
`

/**
 * Botao secundario: link com contorno tracejado, jeito de anotacao.
 * A setinha do fim anda quando o mouse chega.
 */
export const Ghost = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  color: ${p => p.theme.text};
  border: 2px dashed ${p => p.theme.border};
  border-radius: 999px;
  padding: 12px 26px;
  transition: border-color 0.25s ${ease.inOut}, color 0.25s ${ease.inOut},
    transform 0.25s ${ease.spring}, background 0.25s ${ease.inOut};

  .arrow {
    display: inline-block;
    transition: transform 0.3s ${ease.spring};
  }

  &:hover {
    border-color: ${p => p.theme.primary};
    border-style: solid;
    color: ${p => p.theme.primary};
    background: ${p => p.theme.card};
    transform: rotate(-1.2deg);

    .arrow {
      transform: translateX(5px);
    }
  }
`

/** Variacao pequena, para acoes discretas dentro de cards. */
export const TinyButton = styled.button<{ $accent?: string }>`
  font-family: var(--font-hand);
  font-size: 1.15rem;
  line-height: 1;
  border: 2px solid ${p => p.theme.border};
  background: transparent;
  color: ${p => p.theme.textSoft};
  border-radius: 999px;
  padding: 6px 16px 4px;
  cursor: pointer;
  transition: transform 0.25s ${ease.spring}, color 0.25s, border-color 0.25s;

  ${p =>
    p.$accent &&
    css`
      color: ${p.$accent};
      border-color: ${p.$accent};
    `}

  &:hover {
    transform: translateY(-2px) rotate(-2deg);
    border-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
`
