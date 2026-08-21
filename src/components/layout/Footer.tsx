import styled from 'styled-components'
import { Container } from '../ui/Container'
import { WavyRule } from '../ui/Section'
import { Doodle } from '../ui/Doodle'
import { ease } from '../../styles/animations'
import { contact } from '../../data/content'
import { Brand } from './Brand'

const Wrap = styled.footer`
  padding: 30px 0 44px;
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  padding-top: 34px;

  .links {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  small {
    color: ${p => p.theme.textSoft};
    font-family: var(--font-hand);
    font-size: 1.1rem;
  }
`

/** Link com sublinhado que se desenha da esquerda para a direita. */
const FooterLink = styled.a`
  position: relative;
  color: ${p => p.theme.textSoft};
  text-decoration: none;
  font-size: 0.94rem;
  font-weight: 600;
  padding-bottom: 3px;
  transition: color 0.25s ${ease.inOut};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: ${p => p.theme.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ${ease.out};
  }

  &:hover {
    color: ${p => p.theme.primary};

    &::after {
      transform: scaleX(1);
    }
  }
`

const SignOff = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  font-family: var(--font-hand);
  font-size: 1.3rem;
  color: ${p => p.theme.textSoft};
  transform: rotate(-1deg);
`

export function Footer() {
  return (
    <Wrap>
      <Container>
        <WavyRule />
        <Inner>
          <Brand />
          <div className="links">
            <FooterLink href={`mailto:${contact.email}`}>
              {contact.email}
            </FooterLink>
            <FooterLink
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </FooterLink>
            <FooterLink href="#contato">Falar com a Ana</FooterLink>
          </div>
          <small>
            {new Date().getFullYear()} · feito em {contact.location}
          </small>
        </Inner>
        <SignOff>
          até logo!
          <Doodle name="heart" size={19} color="rose" />
        </SignOff>
      </Container>
    </Wrap>
  )
}
