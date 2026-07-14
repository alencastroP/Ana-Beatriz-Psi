/**
 * Conteudo editavel do site (texto e dados estruturados).
 * Centralizar aqui facilita atualizar a copia sem mexer nos componentes.
 */

export const contact = {
  email: 'aanab1572@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aanabs/',
  location: 'Natal/RN',
  name: 'Ana Beatriz',
  role: 'recrutadora',
}

export const navLinks = [
  { href: '#problema', label: 'O problema' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
] as const

export const stats = [
  { value: '3 anos', label: 'dentro do RH e R&S' },
  { value: '+110', label: 'contratações conduzidas' },
  { value: '70', label: 'vagas em 3 semanas' },
  { value: '40–50', label: 'vagas fechadas por mês' },
] as const

export interface Service {
  icon: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: '📄',
    title: 'Análise e reescrita de currículo',
    description:
      'Reviso e reescrevo seu currículo com as palavras-chave, os verbos de impacto e o formato que o ATS lê — sem perder o lado humano que conquista o recrutador.',
  },
  {
    icon: '💼',
    title: 'Otimização do LinkedIn',
    description:
      'Headline, “Sobre” e experiências reposicionados para você aparecer nas buscas de quem faz hunting — e passar a primeira impressão certa em segundos.',
  },
  {
    icon: '🎯',
    title: 'Estratégia de recolocação',
    description:
      'Um plano de busca sob medida: onde se candidatar, como abordar recrutadores e como se posicionar para a vaga que você quer de verdade.',
  },
  {
    icon: '🗣️',
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
}

export const steps: Step[] = [
  {
    num: '01',
    phase: 'diagnóstico',
    title: 'Conversa e análise',
    description:
      'Você me manda seu currículo e perfil. Faço um diagnóstico do que está segurando suas chances — do ATS à forma como você se descreve.',
  },
  {
    num: '02',
    phase: 'otimização',
    title: 'Reescrita estratégica',
    description:
      'Reescrevo currículo e LinkedIn com foco em palavras-chave, resultados e leitura por máquina. Tudo pronto para passar nas triagens automáticas.',
  },
  {
    num: '03',
    phase: 'recolocação',
    title: 'Plano de ação',
    description:
      'Você sai com uma estratégia clara de onde e como se candidatar, além do preparo para brilhar quando o convite para a entrevista chegar.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Reformulei o currículo com a Ana e em duas semanas comecei a ser chamada para entrevistas que antes nem respondiam.',
    name: 'Pamella',
    detail: 'Administrativo · Recolocação',
  },
  {
    quote:
      'Ela explicou por que eu estava sendo barrado no ATS. Mudou o jogo. Hoje estou empregado.',
    name: 'Carla',
    detail: 'Recursos Humanos · Promoção',
  },
  {
    quote:
      'Meu LinkedIn passou a receber mensagens de recrutadores. Sensação de finalmente ser visto.',
    name: 'Matheus',
    detail: 'TI · Recolocação',
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
