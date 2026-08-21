import styled, { css } from 'styled-components'
import { navLinks } from '../../data/content'
import { useThemeMode } from '../../theme/ThemeContext'
import { scrollToId } from '../../utils/scroll'
import {
  useActiveSection,
  useScrolledPast,
  useScrollProgress,
} from '../../hooks/useScrollSpy'
import { ease } from '../../styles/animations'
import { Button } from '../ui/Button'
import { Brand } from './Brand'

const Nav = styled.nav<{ $compact: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: ${p => p.theme.bg}dd;
  border-bottom: 2px solid
    ${p => (p.$compact ? p.theme.ink : 'transparent')};
  transition: border-color 0.4s ${ease.inOut}, background 0.4s ${ease.inOut};
`

const Inner = styled.div<{ $compact: boolean }>`
  max-width: 1140px;
  margin: 0 auto;
  padding: ${p => (p.$compact ? '10px 24px' : '18px 24px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: padding 0.4s ${ease.out};
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 880px) {
    display: none;
  }
`

/**
 * Link do menu com sublinhado que cresce do meio para as pontas.
 * Quando a secao correspondente esta na tela, ele fica aceso sozinho.
 */
const NavLink = styled.a<{ $active: boolean }>`
  position: relative;
  color: ${p => (p.$active ? p.theme.text : p.theme.textSoft)};
  text-decoration: none;
  font-size: 0.96rem;
  font-weight: ${p => (p.$active ? 800 : 600)};
  padding: 4px 2px;
  transition: color 0.25s ${ease.inOut}, font-weight 0.2s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 3px;
    border-radius: 999px;
    background: ${p => p.theme.primary};
    transform: scaleX(${p => (p.$active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.35s ${ease.spring};
  }

  &:hover {
    color: ${p => p.theme.primary};

    &::after {
      transform: scaleX(1);
    }
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

/** Alternador de tema: gira meia volta e troca o simbolo no meio do giro. */
const Toggle = styled.button<{ $dark: boolean }>`
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid ${p => p.theme.ink};
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};
  cursor: pointer;
  font-size: 1.05rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow: 3px 3px 0 ${p => p.theme.shade};
  transition: transform 0.45s ${ease.spring}, background 0.4s ${ease.inOut},
    box-shadow 0.25s ${ease.spring};

  &:hover {
    transform: rotate(-18deg) scale(1.06);
    box-shadow: 4px 5px 0 ${p => p.theme.shade};
  }

  &:active {
    transform: translate(3px, 3px) rotate(-18deg);
    box-shadow: 0 0 0 ${p => p.theme.shade};
  }

  span {
    position: absolute;
    display: block;
    transition: transform 0.5s ${ease.spring}, opacity 0.3s ease;
  }

  ${p =>
    p.$dark
      ? css`
          .sun {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          .moon {
            transform: translateY(30px) rotate(60deg);
            opacity: 0;
          }
        `
      : css`
          .sun {
            transform: translateY(-30px) rotate(-60deg);
            opacity: 0;
          }
          .moon {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        `}
`

const CtaButton = styled(Button)`
  font-size: 0.94rem;
  padding: 11px 22px;

  @media (max-width: 560px) {
    display: none;
  }
`

/** Barrinha de progresso da leitura, colada na base da navbar. */
const Progress = styled.div<{ $value: number }>`
  height: 4px;
  width: 100%;
  transform-origin: left;
  transform: scaleX(${p => p.$value});
  background: linear-gradient(
    90deg,
    ${p => p.theme.accents.rose},
    ${p => p.theme.accents.ochre},
    ${p => p.theme.accents.sage}
  );
`

const SECTION_IDS = navLinks.map(link => link.id)

export function Navbar() {
  const { isDark, toggle } = useThemeMode()
  const compact = useScrolledPast(40)
  const progress = useScrollProgress()
  const active = useActiveSection(SECTION_IDS)

  return (
    <Nav $compact={compact}>
      <Inner $compact={compact}>
        <Brand />
        <Links>
          {navLinks.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              $active={active === link.id}
            >
              {link.label}
            </NavLink>
          ))}
        </Links>
        <Right>
          <Toggle
            $dark={isDark}
            onClick={toggle}
            aria-label="Alternar tema claro e escuro"
          >
            <span className="sun" aria-hidden="true">
              ☀️
            </span>
            <span className="moon" aria-hidden="true">
              🌙
            </span>
          </Toggle>
          <CtaButton onClick={() => scrollToId('contato')}>
            Quero ser analisado(a)
          </CtaButton>
        </Right>
      </Inner>
      <Progress $value={progress} aria-hidden="true" />
    </Nav>
  )
}
