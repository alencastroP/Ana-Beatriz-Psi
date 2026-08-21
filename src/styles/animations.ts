import { keyframes } from 'styled-components'

/**
 * Biblioteca de movimento da pagina.
 *
 * Regra de ouro deste site: nada entra em linha reta e nada usa `ease`
 * padrao. O que da sensacao de coisa feita a mao e o leve exagero no fim
 * do movimento (`ease.spring`) e a rotacao de meio grau que sobra.
 */

/** Curvas compartilhadas -- use sempre estas, nunca `ease`/`linear` cru. */
export const ease = {
  /** Passa do alvo e volta: da elasticidade a entradas e hovers. */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Desaceleracao longa e macia, para reveals. */
  soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** Simetrica, para transicoes de estado (tema, cor). */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  /** Saida rapida, chegada calma. */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

/* ------------------------------------------------------------------ */
/* Entradas                                                            */
/* ------------------------------------------------------------------ */

/** Entrada de baixo para cima, com meio grau de torto. */
export const riseIn = keyframes`
  from { opacity: 0; transform: translateY(26px) rotate(-0.6deg); }
  to   { opacity: 1; transform: translateY(0) rotate(0deg); }
`

export const riseLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px) rotate(1deg); }
  to   { opacity: 1; transform: translateX(0) rotate(0deg); }
`

export const riseRight = keyframes`
  from { opacity: 0; transform: translateX(30px) rotate(-1deg); }
  to   { opacity: 1; transform: translateX(0) rotate(0deg); }
`

/** Cresce estourando um pouco -- para selos, numeros e adesivos. */
export const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.72) rotate(-6deg); }
  65%  { opacity: 1; transform: scale(1.06) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
`

/** Cai e assenta, como papel colado com fita. */
export const tapeIn = keyframes`
  0%   { opacity: 0; transform: translateY(-18px) rotate(4deg); }
  70%  { opacity: 1; transform: translateY(4px) rotate(-1.5deg); }
  100% { opacity: 1; transform: translateY(0) rotate(var(--rest-tilt, -1deg)); }
`

/** Carimbo batendo no papel. */
export const stampIn = keyframes`
  0%   { opacity: 0; transform: scale(2.2) rotate(-18deg); }
  55%  { opacity: 1; transform: scale(0.92) rotate(-9deg); }
  75%  { transform: scale(1.05) rotate(-12deg); }
  100% { opacity: 1; transform: scale(1) rotate(-11deg); }
`

/** Palavra subindo por tras de uma mascara (revelacao do titulo). */
export const wordUp = keyframes`
  from { opacity: 0; transform: translateY(0.9em) rotate(3deg); }
  to   { opacity: 1; transform: translateY(0) rotate(0deg); }
`

/* ------------------------------------------------------------------ */
/* Continuas                                                           */
/* ------------------------------------------------------------------ */

/** Flutuacao lenta de cartoes e doodles. */
export const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-12px) rotate(1.2deg); }
`

/** Respiracao: escala minima, ritmo de inspirar/expirar. */
export const breathe = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50%      { transform: scale(1.14); opacity: 1; }
`

/** Blob de fundo que muda de forma devagar. */
export const blobMorph = keyframes`
  0%, 100% { border-radius: 62% 38% 46% 54% / 58% 46% 54% 42%; transform: rotate(0deg) scale(1); }
  33%      { border-radius: 38% 62% 58% 42% / 44% 62% 38% 56%; transform: rotate(12deg) scale(1.06); }
  66%      { border-radius: 54% 46% 34% 66% / 62% 38% 62% 38%; transform: rotate(-8deg) scale(0.96); }
`

/** Balancinho -- hover de icones e emojis. */
export const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(-9deg); }
  50%      { transform: rotate(7deg); }
  75%      { transform: rotate(-4deg); }
`

/** Seta/indicador de rolagem cutucando para baixo. */
export const nudgeDown = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50%      { transform: translateY(7px); opacity: 1; }
`

/** Faixa infinita (marquee). O conteudo e duplicado no componente. */
export const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

export const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

/* ------------------------------------------------------------------ */
/* Tracos e marcacoes                                                  */
/* ------------------------------------------------------------------ */

/** Desenha um traco SVG (usar com stroke-dasharray no elemento). */
export const drawStroke = keyframes`
  from { stroke-dashoffset: var(--dash, 400); }
  to   { stroke-dashoffset: 0; }
`

/** Marca-texto correndo por tras da palavra. */
export const highlightSweep = keyframes`
  from { background-size: 0% 100%; }
  to   { background-size: 100% 100%; }
`

/** Linha de varredura do "scanner" de curriculo no hero. */
export const scan = keyframes`
  0%   { top: 4%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 90%; opacity: 0; }
`

/** "Estouro" usado nas palavras-chave aprovadas. */
export const pop = keyframes`
  0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
  60%  { transform: scale(1.14) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`

/** Confete saindo do centro (usa --x/--y por particula). */
export const burst = keyframes`
  0%   { opacity: 0; transform: translate(0, 0) scale(0.4) rotate(0deg); }
  25%  { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--x, 0), var(--y, -60px)) scale(1) rotate(var(--r, 180deg)); }
`
