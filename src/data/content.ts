/**
 * Conteudo editavel do site (texto e dados estruturados).
 * Centralizar aqui facilita atualizar a copia sem mexer nos componentes.
 */
import type { AccentName } from '../styles/theme'

export const contact = {
  email: 'aanab1572@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aanabs/',
  location: 'Natal/RN',
  name: 'Ana Beatriz',
  role: 'recrutadora',
}

export const navLinks = [
  { href: '#problema', label: 'O problema', id: 'problema' },
  { href: '#servicos', label: 'Serviços', id: 'servicos' },
  { href: '#processo', label: 'Como funciona', id: 'processo' },
  { href: '#sobre', label: 'Sobre', id: 'sobre' },
] as const

export interface Stat {
  value: string
  label: string
  accent: AccentName
  /** Bilhetinho a mao que aparece no hover. */
  note: string
}

export const stats: Stat[] = [
  {
    value: '3 anos',
    label: 'dentro do RH e R&S',
    accent: 'rose',
    note: 'do outro lado da mesa',
  },
  {
    value: '+110',
    label: 'contratações conduzidas',
    accent: 'sage',
    note: 'cada uma com nome e história',
  },
  {
    value: '70',
    label: 'vagas em 3 semanas',
    accent: 'ochre',
    note: 'sim, foi intenso!',
  },
  {
    value: '40–50',
    label: 'vagas fechadas por mês',
    accent: 'lilac',
    note: 'na média, todo mês',
  },
]

/** Icones desenhados a mao (mapeados em `Services.tsx`). */
export type ServiceIcon = 'doc' | 'badge' | 'target' | 'mic'

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
  accent: AccentName
  /** Anotacao manuscrita na beirada do card. */
  note: string
}

export const services: Service[] = [
  {
    icon: 'doc',
    accent: 'rose',
    note: 'o mais pedido',
    title: 'Análise e reescrita de currículo',
    description:
      'Reviso e reescrevo seu currículo com as palavras-chave, os verbos de impacto e o formato que o ATS lê — sem perder o lado humano que conquista o recrutador.',
  },
  {
    icon: 'badge',
    accent: 'sage',
    note: 'pra ser achado',
    title: 'Otimização do LinkedIn',
    description:
      'Headline, “Sobre” e experiências reposicionados para você aparecer nas buscas de quem faz hunting — e passar a primeira impressão certa em segundos.',
  },
  {
    icon: 'target',
    accent: 'ochre',
    note: 'plano com nome e prazo',
    title: 'Estratégia de recolocação',
    description:
      'Um plano de busca sob medida: onde se candidatar, como abordar recrutadores e como se posicionar para a vaga que você quer de verdade.',
  },
  {
    icon: 'mic',
    accent: 'lilac',
    note: 'pra chegar inteiro',
    title: 'Preparação para entrevistas',
    description:
      'Treino de entrevista por competências com quem conduz esses processos todos os dias. Você chega seguro, com histórias e respostas que convencem.',
  },
]

export interface Step {
  num: string
  phase: string
  title: string
  description: string
  accent: AccentName
}

export const steps: Step[] = [
  {
    num: '01',
    phase: 'diagnóstico',
    accent: 'rose',
    title: 'Conversa e análise',
    description:
      'Você me manda seu currículo e perfil. Faço um diagnóstico do que está segurando suas chances — do ATS à forma como você se descreve.',
  },
  {
    num: '02',
    phase: 'otimização',
    accent: 'ochre',
    title: 'Reescrita estratégica',
    description:
      'Reescrevo currículo e LinkedIn com foco em palavras-chave, resultados e leitura por máquina. Tudo pronto para passar nas triagens automáticas.',
  },
  {
    num: '03',
    phase: 'recolocação',
    accent: 'sage',
    title: 'Plano de ação',
    description:
      'Você sai com uma estratégia clara de onde e como se candidatar, além do preparo para brilhar quando o convite para a entrevista chegar.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  detail: string
  accent: AccentName
  /** Inclinacao em que o post-it repousa. */
  tilt: number
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Reformulei o currículo com a Ana e em duas semanas comecei a ser chamada para entrevistas que antes nem respondiam.',
    name: 'Pamella',
    detail: 'Administrativo · Recolocação',
    accent: 'ochre',
    tilt: -2.2,
  },
  {
    quote:
      'Ela explicou por que eu estava sendo barrado no ATS. Mudou o jogo. Hoje estou empregado.',
    name: 'Carla',
    detail: 'Recursos Humanos · Promoção',
    accent: 'sage',
    tilt: 1.6,
  },
  {
    quote:
      'Meu LinkedIn passou a receber mensagens de recrutadores. Sensação de finalmente ser visto.',
    name: 'Matheus',
    detail: 'TI · Recolocação',
    accent: 'lilac',
    tilt: -1.2,
  },
]

export const objectives = [
  'Recolocação no mercado',
  'Primeira oportunidade na área',
  'Transição de carreira',
  'Crescer / ser promovido(a)',
] as const

export const heroKeywords = [
  { label: 'palavras-chave', delay: 0.2 },
  { label: 'verbos de impacto', delay: 0.5 },
  { label: 'formato legível', delay: 0.8 },
  { label: 'resultados', delay: 1.1 },
] as const

/** Frases da faixa corrida entre as secoes. */
export const marqueePhrases = [
  'currículo que passa no robô',
  'e conquista a pessoa',
  'olhar de quem contrata',
  'do diagnóstico à vaga certa',
  'gente falando com gente',
] as const

/** Bilhetinhos manuscritos espalhados pela pagina. */
export const notes = {
  hero: 'oi! que bom te ver por aqui',
  scanner: 'é isso que o robô vê',
  problem: 'ninguém te conta isso',
  process: 'sem mistério, prometo',
  about: 'essa sou eu :)',
  form: 'respondo pessoalmente',
} as const
