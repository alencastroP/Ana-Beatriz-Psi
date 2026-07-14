import styled from 'styled-components'
import { Container } from '../ui/Container'
import { contact } from '../../data/content'
import { Brand } from './Brand'

const Wrap = styled.footer`
  border-top: 1px solid ${p => p.theme.border};
  padding: 48px 0 40px;
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  .links {
    display: flex;
    gap: 22px;
    flex-wrap: wrap;
  }
  a {
    color: ${p => p.theme.textSoft};
    text-decoration: none;
    font-size: 0.92rem;

    &:hover {
      color: ${p => p.theme.primary};
    }
  }
  small {
    color: ${p => p.theme.textSoft};
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
  }
`

export function Footer() {
  return (
    <Wrap>
      <Container>
        <Inner>
          <Brand />
          <div className="links">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="#contato">Falar com a Ana</a>
          </div>
          <small>
            © {new Date().getFullYear()} · {contact.location}
          </small>
        </Inner>
      </Container>
    </Wrap>
  )
}
