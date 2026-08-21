import styled from 'styled-components'
import { ease, float, pop, popIn, scan } from '../../styles/animations'
import { heroKeywords, notes } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { useTilt } from '../../hooks/useParallax'
import { Doodle } from '../ui/Doodle'

const Wrap = styled.div`
  position: relative;
  z-index: 2;
  animation: ${float} 9s ease-in-out infinite;
  perspective: 900px;

  @media (max-width: 980px) {
    max-width: 420px;
    margin: 0 auto;
  }
`

/**
 * Fita crepe segurando o papel. Duas tiras, angulos diferentes -- fita
 * colada por gente nunca fica no mesmo angulo dos dois lados.
 */
const Tape = styled.span<{ $side: 'left' | 'right' }>`
  position: absolute;
  z-index: 5;
  top: -14px;
  ${p => (p.$side === 'left' ? 'left: 12%;' : 'right: 16%;')}
  width: 92px;
  height: 30px;
  background: ${p => p.theme.tape};
  border-left: 1px dashed rgba(255, 255, 255, 0.35);
  border-right: 1px dashed rgba(255, 255, 255, 0.35);
  transform: rotate(${p => (p.$side === 'left' ? '-7deg' : '5deg')});
  backdrop-filter: blur(1px);
  pointer-events: none;
`

const ScoreBadge = styled.div`
  position: absolute;
  top: -30px;
  right: -18px;
  z-index: 6;
  width: 108px;
  height: 108px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  box-shadow: 4px 5px 0 ${p => p.theme.shade};
  text-align: center;
  transform: rotate(9deg);
  animation: ${popIn} 0.7s ${ease.spring} both;
  animation-delay: 1.4s;

  .num {
    font-family: var(--font-display);
    font-variation-settings: var(--wonk);
    font-size: 1.95rem;
    font-weight: 600;
    color: ${p => p.theme.primary};
    display: block;
    line-height: 1;
  }
  .lbl {
    font-family: var(--font-hand);
    font-size: 1.05rem;
    color: ${p => p.theme.textSoft};
    display: block;
    margin-top: 2px;
  }

  @media (max-width: 420px) {
    width: 86px;
    height: 86px;
    top: -20px;
    right: 0;
    .num {
      font-size: 1.5rem;
    }
    .lbl {
      font-size: 0.9rem;
    }
  }
`

/**
 * A folha em si. Repousa torta e se endireita quando o mouse chega, com
 * uma inclinacao 3D que segue o ponteiro (vars `--rx`/`--ry` do hook).
 */
const Paper = styled.div`
  position: relative;
  overflow: hidden;
  background: ${p => p.theme.card};
  border: 2px solid ${p => p.theme.ink};
  border-radius: 10px 14px 12px 16px;
  padding: 34px 30px 30px;
  box-shadow: 8px 10px 0 ${p => p.theme.shade};
  transform: rotate(-1.6deg);
  transform-style: preserve-3d;
  transition: transform 0.4s ${ease.spring}, box-shadow 0.4s ${ease.spring};

  &:hover {
    transform: rotate(0deg) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    box-shadow: 12px 14px 0 ${p => p.theme.shade};
  }
`

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 52px;
  background: linear-gradient(
    180deg,
    transparent,
    ${p => p.theme.accents.ochre}2E,
    transparent
  );
  border-top: 2px dashed ${p => p.theme.accents.ochre};
  animation: ${scan} 4.2s ease-in-out infinite;
  pointer-events: none;
  z-index: 3;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
`

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 46% 54% 52% 48% / 50% 46% 54% 50%;
  flex-shrink: 0;
  background: ${p => p.theme.accents.rose};
  border: 2px solid ${p => p.theme.ink};
  display: grid;
  place-items: center;
  color: ${p => p.theme.onAccent};
  font-family: var(--font-display);
  font-variation-settings: var(--wonk);
  font-weight: 600;
  font-size: 1.1rem;
`

const LineGroup = styled.div`
  flex: 1;
`

/** Linha de texto "borrada" do curriculo. */
const Bar = styled.div<{ $w?: string; $h?: number; $mb?: number }>`
  height: ${p => p.$h ?? 9}px;
  border-radius: 999px;
  background: ${p => p.theme.surface};
  width: ${p => p.$w ?? '100%'};
  margin-bottom: ${p => p.$mb ?? 9}px;
`

const KeywordRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
`

const Keyword = styled.span<{ $delay?: number }>`
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.78rem;
  background: ${p => p.theme.accentSoft.sage};
  color: ${p => p.theme.accentInk.sage};
  border: 1.5px solid ${p => p.theme.accents.sage};
  padding: 5px 12px 5px 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  animation: ${pop} 0.55s ${ease.spring} both;
  animation-delay: ${p => (p.$delay ?? 0) + 1.2}s;
  transition: transform 0.25s ${ease.spring};

  &:hover {
    transform: translateY(-3px) rotate(-3deg);
  }
`

/** Bilhete colado na beirada da folha. */
const Note = styled.div`
  position: absolute;
  right: -6px;
  bottom: -30px;
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-hand);
  font-size: 1.3rem;
  color: ${p => p.theme.accentInk.ochre};
  transform: rotate(-4deg);

  @media (max-width: 980px) {
    position: static;
    justify-content: center;
    margin-top: 26px;
  }
`

/**
 * Assinatura visual do hero: a folha de curriculo passando pelo scanner.
 *
 * A metafora continua a mesma da versao anterior, mas o objeto deixou de
 * ser um "card de dashboard" e virou papel: fita crepe, sombra dura, canto
 * torto e um carimbo de aprovacao redondo no lugar do selo retangular.
 */
export function AtsScanner() {
  const score = useCountUp(94)
  const tiltRef = useTilt<HTMLDivElement>(6)

  return (
    <Wrap>
      <ScoreBadge>
        <div>
          <span className="num">{score}%</span>
          <span className="lbl">match ATS</span>
        </div>
      </ScoreBadge>

      <Tape $side="left" />
      <Tape $side="right" />

      <Paper ref={tiltRef}>
        <ScanLine />
        <Header>
          <Avatar>CV</Avatar>
          <LineGroup>
            <Bar $w="62%" $h={12} $mb={10} />
            <Bar $w="40%" $h={8} $mb={0} />
          </LineGroup>
        </Header>
        <Bar $w="100%" />
        <Bar $w="92%" />
        <Bar $w="96%" />
        <Bar $w="74%" $mb={0} />
        <KeywordRow>
          {heroKeywords.map(k => (
            <Keyword key={k.label} $delay={k.delay}>
              <Doodle name="check" size={13} color="sage" strokeWidth={5} eager delay={k.delay + 1.3} />
              {k.label}
            </Keyword>
          ))}
        </KeywordRow>
      </Paper>

      <Note>
        <Doodle name="arrow" size={26} color="ochre" strokeWidth={2.6} eager delay={1.8} />
        {notes.scanner}
      </Note>
    </Wrap>
  )
}
