import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/GlobalStyle'
import { themes, type ThemeMode } from '../styles/theme'

interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'ab-theme'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // Sem preferencia salva: respeita o sistema, com fallback para escuro.
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

/**
 * Provedor unico de tema: combina o contexto da aplicacao (modo + toggle)
 * com o `ThemeProvider` do styled-components e injeta o `GlobalStyle`.
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === 'dark',
      toggle: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[mode]}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeMode precisa estar dentro de <AppThemeProvider>.')
  }
  return ctx
}
