# Ana Beatriz · Landing de Consultoria de Carreira

Landing page de captação de clientes para **Ana Beatriz**, recrutadora que
reescreve currículos e perfis de LinkedIn para passar nas triagens automáticas
(ATS) e conquistar o recrutador.

A página comunica uma ideia central: _antes de um humano ver seu currículo, um
robô (o ATS) já decidiu se você avança_ — e quem trabalha do lado de quem
contrata sabe exatamente o que faz um perfil passar.

> Este repositório é a versão **React + TypeScript + styled-components** de um
> protótipo que originalmente vivia em um único arquivo HTML. O código foi
> componentizado, tipado e estruturado para ser fácil de manter e evoluir.

---

## ✨ Destaques

- **Tema claro/escuro** com persistência em `localStorage` e respeito à
  preferência do sistema (`prefers-color-scheme`).
- **Scanner de ATS animado** no hero, com selo de _match_ que conta de 0 a 94%.
- **Revelação ao rolar** (fade-up) usando `IntersectionObserver`.
- **Formulário de leads** que monta um e-mail pré-preenchido (`mailto:`) — sem
  backend, pronto para trocar por Formspree, RD Station, WhatsApp etc.
- **Acessibilidade**: `prefers-reduced-motion`, foco visível, `labels` e
  textos alternativos.
- **100% tipado** em TypeScript, incluindo o tema do styled-components.

## 🧰 Stack

| Ferramenta                     | Para quê                                            |
| ------------------------------ | --------------------------------------------------- |
| **React 18**                   | Biblioteca de UI                                    |
| **TypeScript**                 | Tipagem estática                                    |
| **Vite**                       | Dev server e bundler                                |
| **styled-components 6**        | CSS-in-JS com theming                               |
| **react-intersection-observer**| Animações de entrada ao rolar (`Reveal`)            |
| **ESLint**                     | Padronização e qualidade de código                  |

## 🚀 Como rodar

Pré-requisitos: **Node.js 18+**.

```bash
# 1. Instalar dependências
npm install

# 2. Ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# 3. Build de produção (gera a pasta dist/)
npm run build

# 4. Pré-visualizar o build
npm run preview
```

Outros scripts:

```bash
npm run typecheck   # checagem de tipos sem emitir arquivos
npm run lint        # ESLint
```

## 📁 Estrutura

```
.
├─ index.html               # HTML raiz (fontes + #root)
├─ public/
│  └─ ana-beatriz.jpg        # (você adiciona) foto usada na seção "Sobre"
└─ src/
   ├─ main.tsx               # ponto de entrada (StrictMode + provider)
   ├─ App.tsx                # composição das seções da página
   ├─ data/
   │  └─ content.ts          # TODO o texto e dados editáveis do site
   ├─ styles/
   │  ├─ theme.ts            # tokens de cor dos temas claro/escuro
   │  ├─ styled.d.ts         # tipagem do `theme` no styled-components
   │  ├─ GlobalStyle.ts      # reset + estilos globais
   │  └─ animations.ts       # keyframes (scan, fadeUp, pop, float)
   ├─ theme/
   │  └─ ThemeContext.tsx    # provider de tema + hook useThemeMode
   ├─ hooks/
   │  └─ useCountUp.ts        # animação numérica (match ATS / stats)
   ├─ utils/
   │  └─ scroll.ts           # scroll suave até uma âncora
   └─ components/
      ├─ ui/                  # primitivos reutilizáveis
      │  ├─ Container.tsx
      │  ├─ Section.tsx
      │  ├─ Button.tsx        # Button + Ghost
      │  ├─ Heading.tsx       # Kicker, H2, SectionLead
      │  └─ Reveal.tsx        # wrapper de animação ao rolar
      ├─ layout/
      │  ├─ Brand.tsx
      │  ├─ Navbar.tsx
      │  └─ Footer.tsx
      └─ sections/            # blocos da página
         ├─ Hero.tsx
         ├─ AtsScanner.tsx
         ├─ Stats.tsx
         ├─ Problem.tsx
         ├─ Services.tsx
         ├─ Process.tsx
         ├─ About.tsx
         ├─ Testimonials.tsx
         └─ LeadForm.tsx
```

## ✏️ Como personalizar

- **Textos, serviços, etapas, estatísticas e depoimentos:** edite
  [`src/data/content.ts`](src/data/content.ts). É o ponto único de conteúdo.
- **Cores e temas:** ajuste os tokens em
  [`src/styles/theme.ts`](src/styles/theme.ts). Como ambos os temas seguem a
  interface `AppTheme`, qualquer chave nova é checada pelo TypeScript.
- **Foto da Ana:** coloque `ana-beatriz.jpg` em `public/`. Enquanto o arquivo
  não existir, a seção "Sobre" mostra o monograma "AB" como fallback.
- **E-mail / contato:** atualize `contact` em `src/data/content.ts`.

## 🔌 Trocando o formulário por uma integração real

Hoje o formulário em [`LeadForm.tsx`](src/components/sections/LeadForm.tsx)
abre o cliente de e-mail do visitante com a mensagem pronta (`mailto:`). Para
capturar leads de outra forma, substitua o corpo de `handleSubmit` por uma
chamada à sua ferramenta preferida:

- **Formspree** — `fetch('https://formspree.io/f/SEU_ID', { method: 'POST', ... })`
- **WhatsApp** — redirecione para `https://wa.me/55SEUNUMERO?text=...`
- **RD Station / HubSpot** — use o SDK/endpoint da plataforma.

## 📝 Depoimentos

Os depoimentos em `content.ts` são **placeholders** (`[Nome do cliente]`).
Substitua por relatos reais antes de publicar.

## 📄 Licença

Uso pessoal/comercial da Ana Beatriz. Sinta-se à vontade para usar como
referência de estrutura.
