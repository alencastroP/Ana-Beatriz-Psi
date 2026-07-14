import styled from 'styled-components'
import { float, pop, scan } from '../../styles/animations'
import { heroKeywords } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'

const Wrap = styled.div`
  position: relative;
  animation: ${float} 7s ease-in-out infinite;

  @media (max-width: 980px) {
    max-width: 420px;
    margin: 0 auto;
  }
`

const ScoreBadge = styled.div`
  position: absolute;
  top: -22px;
  right: -10px;
  z-index: 4;
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 18px;
  padding: 14px 18px;
  box-shadow: ${p => p.theme.cardShadow};
  text-align: center;
  min-width: 104px;

  .num {
    font-family: 'Fraunces', serif;
    font-size: 2.1rem;
    font-weight: 600;
    color: ${p => p.theme.primary};
    display: block;
    line-height: 1;
  }
  .lbl {
    font-family: 'Space Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${p => p.theme.textSoft};
  }

  @media (max-width: 420px) {
    top: -16px;
    right: 4px;
    padding: 10px 14px;
    min-width: 88px;
    .num {
      font-size: 1.6rem;
    }
  }
`

const Resume = styled.div`
  position: relative;
  overflow: hidden;
  background: ${p => p.theme.card};
  border: 1px solid ${p => p.theme.border};
  border-radius: 24px;
  padding: 30px 28px;
  box-shadow: ${p => p.theme.cardShadow};
`

const ScanLine = styled.div`
  position: absolute;
  left: 4%;
  right: 4%;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    ${p => p.theme.primary}00,
    ${p => p.theme.primary}38,
    ${p => p.theme.primary}00
  );
  border-top: 2px solid ${p => p.theme.primary};
  animation: ${scan} 3.4s ease-in-out infinite;
  pointer-events: none;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  flex-shrink: 0;
  background: linear-gradient(135deg, ${p => p.theme.primary}, ${p => p.theme.accent});
  display: grid;
  place-items: center;
  color: #fff;
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.15rem;
`

const LineGroup = styled.div`
  flex: 1;
`

const Bar = styled.div<{ $w?: string; $h?: number; $mb?: number }>`
  height: ${p => p.$h ?? 9}px;
  border-radius: 6px;
  background: ${p => p.theme.surface};
  width: ${p => p.$w ?? '100%'};
  margin-bottom: ${p => p.$mb ?? 8}px;
`

const KeywordRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`

const Keyword = styled.span<{ $delay?: number }>`
  font-family: 'Space Mono', monospace;
  font-size: 0.74rem;
  background: ${p => p.theme.keywordBg};
  color: ${p => p.theme.primaryDeep};
  padding: 5px 11px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  animation: ${pop} 0.5s ease both;
  animation-delay: ${p => p.$delay ?? 0}s;

  &::before {
    content: '✓';
    font-weight: 700;
  }
`

/**
 * Assinatura visual do hero: um "scanner" de curriculo com a linha de
 * varredura, o selo de match ATS animado e as palavras-chave aprovadas.
 */
export function AtsScanner() {
  const score = useCountUp(94)

  return (
    <Wrap>
      <ScoreBadge>
        <span className="num">{score}%</span>
        <span className="lbl">match ATS</span>
      </ScoreBadge>
      <Resume>
        <ScanLine />
        <Header>
          <Avatar>CV</Avatar>
          <LineGroup>
            <Bar $w="62%" $h={11} $mb={9} />
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
              {k.label}
            </Keyword>
          ))}
        </KeywordRow>
      </Resume>
    </Wrap>
  )
}
