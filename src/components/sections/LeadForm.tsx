import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { contact, objectives } from '../../data/content'

const Grid = styled.div`
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 28px;
  overflow: hidden;
  box-shadow: ${p => p.theme.cardShadow};
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`

const Aside = styled.div`
  background: linear-gradient(160deg, ${p => p.theme.primary}, ${p => p.theme.primaryDeep});
  color: #fff;
  padding: 48px 40px;

  h2 {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-size: 2rem;
    line-height: 1.12;
    margin-bottom: 18px;
  }
  p {
    opacity: 0.92;
    line-height: 1.6;
    margin-bottom: 26px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 0.96rem;
    line-height: 1.45;
  }
  li::before {
    content: '✦';
    flex-shrink: 0;
  }
`

const FormBox = styled.form`
  padding: 48px 40px;

  @media (max-width: 480px) {
    padding: 34px 24px;
  }
`

const Field = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    margin-bottom: 7px;
    color: ${p => p.theme.text};
  }
  input,
  select {
    width: 100%;
    padding: 13px 15px;
    border-radius: 12px;
    font-size: 0.96rem;
    border: 1.5px solid ${p => p.theme.border};
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: ${p => p.theme.primary};
    }
  }
`

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

const Submit = styled(Button)`
  width: 100%;
  padding: 16px;
  font-size: 1.02rem;
  margin-top: 8px;
`

const Note = styled.p`
  font-size: 0.8rem;
  color: ${p => p.theme.textSoft};
  margin-top: 14px;
  text-align: center;
`

const Success = styled.div`
  background: ${p => p.theme.keywordBg};
  border: 1px solid ${p => p.theme.primary};
  border-radius: 14px;
  padding: 18px;
  color: ${p => p.theme.primaryDeep};
  font-weight: 500;
  line-height: 1.5;
  margin-top: 16px;
`

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

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialState)
  const [sent, setSent] = useState(false)

  const update =
    (key: keyof LeadFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim()) {
      alert('Por favor, preencha pelo menos seu nome e e-mail.')
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
      <Container>
        <Grid>
          <Aside>
            <h2>Vamos fazer seu perfil ser impossível de ignorar.</h2>
            <p>
              Preencha ao lado e eu retorno com os primeiros pontos do seu
              diagnóstico — sem compromisso.
            </p>
            <ul>
              <li>Diagnóstico do que trava suas chances no ATS</li>
              <li>Visão de quem contrata, aplicada ao seu caso</li>
              <li>Próximos passos claros para a recolocação</li>
            </ul>
          </Aside>

          <FormBox onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="nome">Nome completo *</label>
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
                <label htmlFor="email">E-mail *</label>
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
                Link do seu LinkedIn ou currículo (opcional)
              </label>
              <input
                id="linkedin"
                value={form.linkedin}
                onChange={update('linkedin')}
                placeholder="linkedin.com/in/seu-perfil"
              />
            </Field>
            <Submit type="submit">Quero meu diagnóstico</Submit>
            {sent && (
              <Success>
                Tudo certo! Seu cliente de e-mail vai abrir com a mensagem pronta
                — é só enviar. Em breve a Ana retorna. ✦
              </Success>
            )}
            <Note>Seus dados são usados apenas para o contato. Sem spam.</Note>
          </FormBox>
        </Grid>
      </Container>
    </Section>
  )
}
