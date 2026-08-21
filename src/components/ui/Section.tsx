import styled, { css } from 'styled-components'
import { ease } from '../../styles/animations'

/**
 * Bloco vertical padrao das secoes.
 *
 * A prop transiente `$alt` pinta o fundo alternativo -- e, em vez do
 * retangulo de sempre, arredonda os cantos de forma assimetrica: a secao
 * passa a parecer uma folha apoiada sobre a mesa, nao uma faixa de CSS.
 */
export const Section = styled.section<{ $alt?: boolean }>`
  position: relative;
  padding: 118px 0;

  ${p =>
    p.$alt &&
    css`
      background: ${p.theme.bgAlt};
      border-radius: 90px 160px 0 0 / 34px 52px 0 0;
      transition: background 0.5s ${ease.inOut};

      /* Fecha a folha embaixo com a mesma curva, espelhada. */
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 52px;
        background: inherit;
        border-radius: 0 0 160px 90px / 0 0 52px 34px;
      }
    `}

  @media (max-width: 720px) {
    padding: 76px 0;

    ${p =>
      p.$alt &&
      css`
        border-radius: 44px 76px 0 0 / 20px 30px 0 0;
      `}
  }
`

/** Regua ondulada a mao, para separar blocos sem usar uma linha reta. */
export const WavyRule = styled.div<{ $color?: string }>`
  height: 14px;
  width: 100%;
  color: ${p => p.$color ?? p.theme.border};
  background-image: radial-gradient(
      circle at 10px -6px,
      transparent 12px,
      currentColor 12px,
      currentColor 13.5px,
      transparent 14px
    ),
    radial-gradient(
      circle at 10px 20px,
      transparent 12px,
      currentColor 12px,
      currentColor 13.5px,
      transparent 14px
    );
  background-size: 20px 14px;
  background-position: 0 0, 10px 0;
  background-repeat: repeat-x;
  opacity: 0.85;
`
