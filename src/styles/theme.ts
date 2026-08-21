/**
 * Tokens de design da marca Ana Beatriz.
 *
 * A paleta e "papel + tinta": fundo de papel morno, texto em tinta quente
 * (nunca preto puro) e uma familia de acentos que se revezam pelas secoes.
 * O rosa continua sendo a marca, so que dessaturado para um framboesa/argila
 * -- rosa neon em fundo branco e o que da cara de template generico.
 *
 * Os dois temas compartilham exatamente as mesmas chaves (ver `AppTheme`),
 * o que garante a tipagem do styled-components em `styled.d.ts`.
 */

/** Acentos ludicos usados em rodizio (cards, post-its, doodles). */
export interface AccentSet {
  rose: string
  coral: string
  sage: string
  ochre: string
  lilac: string
}

export type AccentName = keyof AccentSet

/** Ordem de rodizio dos acentos quando uma lista precisa se colorir sozinha. */
export const accentCycle: AccentName[] = ['rose', 'sage', 'ochre', 'lilac', 'coral']

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

  /** Traco das ilustracoes e contornos feitos a mao (SVG e bordas). */
  ink: string
  /** Cor da sombra dura, deslocada, que da o efeito de papel recortado. */
  shade: string
  /** Tinta usada sobre superficies pintadas com `primary` ou um acento. */
  onAccent: string
  /** Fita crepe que segura papeis e polaroids. */
  tape: string
  /** Marca-texto que corre atras das palavras em destaque. */
  highlight: string
  /** Sombra curta, de papel apoiado na mesa. */
  softShadow: string
  /** Intensidade da textura de papel sobreposta a pagina. */
  grain: string
  /** Mistura da textura de papel (multiply no claro, soft-light no escuro). */
  grainBlend: string

  accents: AccentSet
  /** Versao lavada de cada acento, para preenchimentos. */
  accentSoft: AccentSet
  /** Versao para texto sobre o preenchimento lavado. */
  accentInk: AccentSet
}

export const lightTheme: AppTheme = {
  bg: '#FDF7F1',
  bgAlt: '#F7EBE2',
  card: '#FFFCF8',
  surface: '#F3E4DA',
  text: '#2E2028',
  textSoft: '#6F5A63',
  primary: '#C6446E',
  primaryDeep: '#A03059',
  accent: '#F0A07C',
  border: '#E7D3C6',
  keywordBg: '#F8E4E9',
  shadow: '0 22px 44px -26px rgba(160,48,89,0.42)',
  cardShadow: '0 18px 40px -28px rgba(46,32,40,0.45)',

  ink: '#2E2028',
  shade: '#2E2028',
  onAccent: '#FFF9F5',
  tape: 'rgba(240,200,150,0.55)',
  highlight: '#FBE0A8',
  softShadow: '0 8px 18px -10px rgba(46,32,40,0.30)',
  grain: '0.055',
  grainBlend: 'multiply',

  accents: {
    rose: '#C6446E',
    coral: '#E07A55',
    sage: '#6F8F6B',
    ochre: '#C9922E',
    lilac: '#8B7BC0',
  },
  accentSoft: {
    rose: '#F8E1E8',
    coral: '#FBE6DA',
    sage: '#E4EDE0',
    ochre: '#F8EBCF',
    lilac: '#EAE5F7',
  },
  accentInk: {
    rose: '#932C51',
    coral: '#A9502F',
    sage: '#47603F',
    ochre: '#8A6210',
    lilac: '#5C4C90',
  },
}

export const darkTheme: AppTheme = {
  bg: '#191115',
  bgAlt: '#20161C',
  card: '#261A21',
  surface: '#32222B',
  text: '#F8EDE6',
  textSoft: '#BFA0AC',
  primary: '#FF8AAF',
  primaryDeep: '#FFB0C9',
  accent: '#F5B08D',
  border: '#3D2A34',
  keywordBg: '#3A2430',
  shadow: '0 22px 44px -26px rgba(255,138,175,0.34)',
  cardShadow: '0 18px 40px -26px rgba(0,0,0,0.75)',

  ink: '#F8EDE6',
  /* No escuro a sombra precisa ser mais escura que o fundo -- repetir o
     creme do traco faria cada card brilhar em vez de descolar da pagina. */
  shade: '#0B0609',
  /* No escuro o rosa da marca clareia, entao a tinta por cima escurece. */
  onAccent: '#2A1119',
  tape: 'rgba(255,196,150,0.22)',
  highlight: '#6A4A2A',
  softShadow: '0 8px 18px -10px rgba(0,0,0,0.6)',
  grain: '0.05',
  grainBlend: 'soft-light',

  accents: {
    rose: '#FF8AAF',
    coral: '#F59B73',
    sage: '#9CC094',
    ochre: '#EBC062',
    lilac: '#B7A6EE',
  },
  accentSoft: {
    rose: '#3E2530',
    coral: '#3D2921',
    sage: '#26331F',
    ochre: '#3A2E14',
    lilac: '#2E2745',
  },
  accentInk: {
    rose: '#FFB3CB',
    coral: '#FFC1A2',
    sage: '#BEDCB6',
    ochre: '#F6D68C',
    lilac: '#D2C6FF',
  },
}

export type ThemeMode = 'light' | 'dark'

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
}
