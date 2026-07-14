import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Habilita o suporte ao styled-components no Babel:
      // melhores nomes de classe na inspecao, SSR consistente e minificacao.
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true, ssr: true }]],
      },
    }),
  ],
})
