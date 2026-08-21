import { createGlobalStyle } from 'styled-components'
import { ease } from './animations'

/**
 * Textura de papel: ruido gerado em SVG (nao pesa nada, nao vira request).
 * E o detalhe que mais tira a cara de "gerado por template" -- fundo chapado
 * e o que denuncia. Fica por cima de tudo, sem capturar cliques.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
    --font-body: 'Nunito', system-ui, -apple-system, sans-serif;
    --font-hand: 'Caveat', 'Segoe Script', 'Bradley Hand', cursive;

    /* Fraunces tem eixos SOFT (macieza dos terminais) e WONK (o "torto"
       que faz o desenho parecer escrito, nao renderizado). */
    --wonk: 'SOFT' 60, 'WONK' 1;
    --wonk-soft: 'SOFT' 40, 'WONK' 0;
  }

  html {
    scroll-behavior: smooth;
    /* A navbar e sticky: garante que ancoras nao parem embaixo dela. */
    scroll-padding-top: 92px;
  }

  body {
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    overflow-x: hidden;
    transition: background 0.5s ${ease.inOut}, color 0.5s ${ease.inOut};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Camada de granulado por cima da pagina inteira. */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    background-image: ${GRAIN};
    opacity: ${p => p.theme.grain};
    mix-blend-mode: ${p => p.theme.grainBlend};
  }

  h1, h2, h3 {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    letter-spacing: -0.02em;
    line-height: 1.08;
  }

  ::selection {
    background: ${p => p.theme.highlight};
    color: ${p => p.theme.text};
  }

  a { color: inherit; }

  /* Foco visivel e com a mesma linguagem do resto: contorno macio, sem azul. */
  :focus-visible {
    outline: 3px dashed ${p => p.theme.primary};
    outline-offset: 3px;
    border-radius: 6px;
  }

  button, input, select, textarea { font-family: inherit; }

  ::-webkit-scrollbar { width: 12px; }
  ::-webkit-scrollbar-track { background: ${p => p.theme.bgAlt}; }
  ::-webkit-scrollbar-thumb {
    background: ${p => p.theme.border};
    border-radius: 999px;
    border: 3px solid ${p => p.theme.bgAlt};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${p => p.theme.primary}; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`
