import styled from 'styled-components'
import { Container } from '../ui/Container'
import { stats } from '../../data/content'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  border-top: 1px solid ${p => p.theme.border};
  border-bottom: 1px solid ${p => p.theme.border};
  padding: 40px 0;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;
  }
`

const Item = styled.div`
  text-align: center;

  .n {
    font-family: 'Fraunces', serif;
    font-size: clamp(2rem, 4vw, 2.7rem);
    font-weight: 600;
    color: ${p => p.theme.primary};
    line-height: 1;
  }
  .l {
    font-size: 0.9rem;
    color: ${p => p.theme.textSoft};
    margin-top: 8px;
  }
`

export function Stats() {
  return (
    <Container>
      <Grid>
        {stats.map(stat => (
          <Item key={stat.label}>
            <div className="n">{stat.value}</div>
            <div className="l">{stat.label}</div>
          </Item>
        ))}
      </Grid>
    </Container>
  )
}
