import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
    transition: background 0.4s ease, color 0.4s ease;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: ${p => p.theme.primary}; color: #fff; }

  a { color: inherit; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`
