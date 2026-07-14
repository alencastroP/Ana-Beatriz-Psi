import styled from 'styled-components'
import { navLinks } from '../../data/content'
import { useThemeMode } from '../../theme/ThemeContext'
import { scrollToId } from '../../utils/scroll'
import { Button } from '../ui/Button'
import { Brand } from './Brand'

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: ${p => p.theme.bg}cc;
  border-bottom: 1px solid ${p => p.theme.border};
`

const Inner = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 880px) {
    display: none;
  }

  a {
    color: ${p => p.theme.textSoft};
    text-decoration: none;
    font-size: 0.93rem;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: ${p => p.theme.primary};
    }
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Toggle = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.border};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};
  cursor: pointer;
  font-size: 1.1rem;
  display: grid;
  place-items: center;
  transition: transform 0.25s, background 0.3s;

  &:hover {
    transform: rotate(-12deg) scale(1.05);
  }
`

const CtaButton = styled(Button)`
  @media (max-width: 480px) {
    display: none;
  }
`

export function Navbar() {
  const { isDark, toggle } = useThemeMode()

  return (
    <Nav>
      <Inner>
        <Brand />
        <Links>
          {navLinks.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </Links>
        <Right>
          <Toggle onClick={toggle} aria-label="Alternar tema claro e escuro">
            {isDark ? '☀️' : '🌙'}
          </Toggle>
          <CtaButton onClick={() => scrollToId('contato')}>
            Quero ser analisado(a)
          </CtaButton>
        </Right>
      </Inner>
    </Nav>
  )
}
