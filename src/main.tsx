import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { AppThemeProvider } from './theme/ThemeContext'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root nao encontrado no index.html')

createRoot(container).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
