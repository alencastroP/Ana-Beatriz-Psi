/**
 * Tokens de design da marca Ana Beatriz.
 * Os dois temas compartilham exatamente as mesmas chaves (ver `AppTheme`),
 * o que garante a tipagem do styled-components em `styled.d.ts`.
 */
export interface AppTheme {
  bg: string
  bgAlt: string
  card: string
  surface: string
  text: string
  textSoft: string
  primary: string
  primaryDeep: string
  accent: string
  border: string
  keywordBg: string
  shadow: string
  cardShadow: string
}

export const lightTheme: AppTheme = {
  bg: '#FFFFFF',
  bgAlt: '#FFF5F8',
  card: '#FFFFFF',
  surface: '#FDECF2',
  text: '#1C1117',
  textSoft: '#6B5560',
  primary: '#E0357B',
  primaryDeep: '#B81E62',
  accent: '#FF7AA8',
  border: '#F4D7E2',
  keywordBg: '#FCE3EE',
  shadow: '0 24px 60px -28px rgba(184,30,98,0.28)',
  cardShadow: '0 18px 50px -30px rgba(28,17,23,0.30)',
}

export const darkTheme: AppTheme = {
  bg: '#140C11',
  bgAlt: '#1A1016',
  card: '#211520',
  surface: '#2A1824',
  text: '#FBEEF4',
  textSoft: '#B690A2',
  primary: '#FF5C9D',
  primaryDeep: '#FF87B7',
  accent: '#FF9BC2',
  border: '#3A2230',
  keywordBg: '#38202E',
  shadow: '0 24px 60px -28px rgba(255,92,157,0.30)',
  cardShadow: '0 18px 50px -30px rgba(0,0,0,0.7)',
}

export type ThemeMode = 'light' | 'dark'

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
}
