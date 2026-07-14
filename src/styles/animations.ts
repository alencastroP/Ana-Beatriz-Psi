import { keyframes } from 'styled-components'

/** Linha de varredura do "scanner" de curriculo no hero. */
export const scan = keyframes`
  0% { top: 6%; opacity: 0; }
  8% { opacity: 1; }
  92% { opacity: 1; }
  100% { top: 92%; opacity: 0; }
`

/** Entrada suave de baixo para cima (revelar ao rolar). */
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`

/** "Estouro" usado nas palavras-chave aprovadas. */
export const pop = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
`

/** Flutuacao continua do cartao do scanner. */
export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`
