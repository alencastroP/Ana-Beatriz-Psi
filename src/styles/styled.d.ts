import 'styled-components'
import type { AppTheme } from './theme'

// Faz com que `props.theme` seja fortemente tipado em todos os
// componentes estilizados, em vez de `any`.
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
