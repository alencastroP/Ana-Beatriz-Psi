import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Doodle } from '../ui/Doodle'
import { Blob, FloatingDoodle } from '../ui/Decor'
import { Reveal } from '../ui/Reveal'
import { burst, ease, popIn } from '../../styles/animations'
import { contact, notes, objectives } from '../../data/content'

const Card = styled.div`
  position: relative;
  z-index: 2;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 28px 34px 26px 30px;
  overflow: hidden;
  box-shadow: 10px 12px 0 ${p => p.theme.shade};
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`

const Aside = styled.div`
  position: relative;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.onAccent};
  padding: 52px 40px;
  border-right: 2px solid ${p => p.theme.ink};

  @media (max-width: 880px) {
    border-right: none;
    border-bottom: 2px solid ${p => p.theme.ink};
    padding: 44px 30px;
  }

  h2 {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-weight: 500;
    font-size: 2.05rem;
    line-height: 1.1;
    margin-bottom: 18px;
  }

  > p {
    opacity: 0.94;
    line-height: 1.62;
    margin-bottom: 28px;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  li {
    display: flex;
    gap: 11px;
    align-items: flex-start;
    font-size: 0.99rem;
    line-height: 1.45;
    font-weight: 600;
  }

  li svg {
    flex-shrink: 0;
    margin-top: 3px;
  }
`

const AsideNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  font-family: var(--font-hand);
  font-size: 1.35rem;
  transform: rotate(-2deg);
  opacity: 0.95;
`

const FormBox = styled.form`
  padding: 52px 40px;

  @media (max-width: 480px) {
    padding: 36px 24px;
  }
`

const Field = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-family: var(--font-hand);
    font-size: 1.3rem;
    line-height: 1;
    margin-bottom: 8px;
    color: ${p => p.theme.text};
  }

  input,
  select {
    width: 100%;
    padding: 13px 16px;
    border-radius: 14px 12px 15px 11px;
    font-size: 1rem;
    border: 2px solid ${p => p.theme.border};
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: var(--font-body);
    transition: border-color 0.25s ${ease.inOut}, transform 0.3s ${ease.spring},
      box-shadow 0.25s ${ease.spring};

    &::placeholder {
      color: ${p => p.theme.textSoft};
      opacity: 0.6;
    }

    /* No foco o campo se inclina de leve e ganha a sombra dura: e o
       mesmo vocabulario dos papeis do resto da pagina. */
    &:focus {
      outline: none;
      border-color: ${p => p.theme.primary};
      transform: rotate(-0.5deg);
      box-shadow: 4px 4px 0 ${p => p.theme.primary};
    }
  }
`

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

const Submit = styled(Button)`
  width: 100%;
  padding: 17px;
  font-size: 1.06rem;
  margin-top: 10px;
`

const Note = styled.p`
  font-family: var(--font-hand);
  font-size: 1.15rem;
  color: ${p => p.theme.textSoft};
  margin-top: 16px;
  text-align: center;
`

const ErrorNote = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-hand);
  font-size: 1.25rem;
  color: ${p => p.theme.accentInk.coral};
  margin-top: 14px;
  animation: ${popIn} 0.5s ${ease.spring} both;
`

const Success = styled.div`
  position: relative;
  background: ${p => p.theme.accentSoft.sage};
  border: 2px solid ${p => p.theme.accents.sage};
  border-radius: 16px 12px 18px 14px;
  padding: 20px 22px;
  color: ${p => p.theme.accentInk.sage};
  font-weight: 600;
  line-height: 1.55;
  margin-top: 18px;
  animation: ${popIn} 0.6s ${ease.spring} both;
`

/** Confete que sai do centro quando o formulario e enviado. */
const Confetti = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  pointer-events: none;

  i {
    position: absolute;
    top: 40%;
    left: 0;
    width: 9px;
    height: 9px;
    border-radius: 2px;
  }
`

const CONFETTI = [
  { x: '-120px', y: '-70px', r: '210deg', c: 'rose', d: 0 },
  { x: '-70px', y: '-95px', r: '-160deg', c: 'ochre', d: 0.05 },
  { x: '-20px', y: '-110px', r: '120deg', c: 'sage', d: 0.1 },
  { x: '40px', y: '-96px', r: '-200deg', c: 'lilac', d: 0.04 },
  { x: '95px', y: '-72px', r: '260deg', c: 'coral', d: 0.12 },
  { x: '135px', y: '-30px', r: '-140deg', c: 'rose', d: 0.08 },
] as const

interface LeadFormState {
  nome: string
  email: string
  whats: string
  objetivo: string
  linkedin: string
}

const initialState: LeadFormState = {
  nome: '',
  email: '',
  whats: '',
  objetivo: objectives[0],
  linkedin: '',
}

const BENEFITS = [
  'Diagnóstico do que trava suas chances no ATS',
  'Visão de quem contrata, aplicada ao seu caso',
  'Próximos passos claros para a recolocação',
]

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialState)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update =
    (key: keyof LeadFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setError('')
      setForm(prev => ({ ...prev, [key]: e.target.value }))
    }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim()) {
      setError('Falta só o nome e o e-mail para eu conseguir te responder!')
      return
    }

    // Sem backend: monta um e-mail pre-preenchido direto para a Ana.
    // >> Para captar de outra forma, troque por uma integracao
    //    (Formspree, RD Station, WhatsApp wa.me/55..., etc.).
    const subject = encodeURIComponent('Quero otimizar meu currículo — via site')
    const body = encodeURIComponent(
      `Olá, Ana!\n\nVim pelo seu site e quero ajuda com minha carreira.\n\n` +
        `Nome: ${form.nome}\nE-mail: ${form.email}\nWhatsApp: ${form.whats || '—'}\n` +
        `Objetivo: ${form.objetivo}\nLinkedIn/perfil: ${form.linkedin || '—'}\n\nObrigado(a)!`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Section as="section" id="contato" $alt>
      <Blob
        $accent="ochre"
        $size={300}
        $seconds={27}
        $opacity={0.12}
        style={{ top: 30, left: -110 }}
      />
      <FloatingDoodle
        $seconds={10}
        $rotate={16}
        style={{ bottom: 60, right: '5%' }}
      >
        <Doodle name="spiral" size={44} color="ochre" strokeWidth={2.6} />
      </FloatingDoodle>

      <Container>
        <Reveal variant="pop">
          <Card>
            <Aside>
              <h2>Vamos fazer seu perfil ser impossível de ignorar.</h2>
              <p>
                Preencha ao lado e eu retorno com os primeiros pontos do seu
                diagnóstico — sem compromisso.
              </p>
              <ul>
                {BENEFITS.map((item, i) => (
                  <li key={item}>
                    <Doodle
                      name="check"
                      size={18}
                      color="currentColor"
                      strokeWidth={4}
                      delay={0.3 + i * 0.15}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <AsideNote>
                <Doodle name="heart" size={18} color="currentColor" delay={0.8} />
                {notes.form}
              </AsideNote>
            </Aside>

            <FormBox onSubmit={handleSubmit} noValidate>
              <Field>
                <label htmlFor="nome">Como você se chama? *</label>
                <input
                  id="nome"
                  value={form.nome}
                  onChange={update('nome')}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </Field>
              <Row2>
                <Field>
                  <label htmlFor="email">Seu e-mail *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="voce@email.com"
                    autoComplete="email"
                  />
                </Field>
                <Field>
                  <label htmlFor="whats">WhatsApp</label>
                  <input
                    id="whats"
                    value={form.whats}
                    onChange={update('whats')}
                    placeholder="(00) 00000-0000"
                    autoComplete="tel"
                  />
                </Field>
              </Row2>
              <Field>
                <label htmlFor="objetivo">Qual seu objetivo agora?</label>
                <select
                  id="objetivo"
                  value={form.objetivo}
                  onChange={update('objetivo')}
                >
                  {objectives.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field>
                <label htmlFor="linkedin">
                  Link do LinkedIn ou currículo (opcional)
                </label>
                <input
                  id="linkedin"
                  value={form.linkedin}
                  onChange={update('linkedin')}
                  placeholder="linkedin.com/in/seu-perfil"
                />
              </Field>

              <Submit type="submit">Quero meu diagnóstico</Submit>

              {error && (
                <ErrorNote role="alert">
                  <Doodle name="cross" size={16} color="coral" strokeWidth={4} eager />
                  {error}
                </ErrorNote>
              )}

              {sent && (
                <Success role="status">
                  <Confetti aria-hidden="true">
                    {CONFETTI.map(piece => (
                      <ConfettiPiece
                        key={piece.x}
                        $x={piece.x}
                        $y={piece.y}
                        $r={piece.r}
                        $accent={piece.c}
                        $delay={piece.d}
                      />
                    ))}
                  </Confetti>
                  Tudo certo! Seu e-mail vai abrir com a mensagem pronta — é só
                  enviar. Em breve eu te respondo, pessoalmente.
                </Success>
              )}

              <Note>seus dados ficam só entre a gente. sem spam.</Note>
            </FormBox>
          </Card>
        </Reveal>
      </Container>
    </Section>
  )
}

const ConfettiPiece = styled.i<{
  $x: string
  $y: string
  $r: string
  $accent: 'rose' | 'coral' | 'sage' | 'ochre' | 'lilac'
  $delay: number
}>`
  --x: ${p => p.$x};
  --y: ${p => p.$y};
  --r: ${p => p.$r};
  background: ${p => p.theme.accents[p.$accent]};
  /* A animacao mora aqui, e nao na regra do elemento no pai: o atalho
     animation la zeraria este delay, por ter especificidade maior. */
  animation: ${burst} 1.1s ${ease.out} both;
  animation-delay: ${p => p.$delay}s;
`
