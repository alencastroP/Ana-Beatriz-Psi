import styled from 'styled-components'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Stats } from './components/sections/Stats'
import { Problem } from './components/sections/Problem'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { About } from './components/sections/About'
import { Testimonials } from './components/sections/Testimonials'
import { LeadForm } from './components/sections/LeadForm'
import { Marquee } from './components/ui/Marquee'
import { marqueePhrases } from './data/content'

const Page = styled.div`
  width: 100%;
  overflow-x: clip;
`

/** Respiro em volta da faixa corrida, que sangra para fora do container. */
const Strip = styled.div`
  padding: 26px 0;
`

export function App() {
  return (
    <Page>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Services />
        <Strip>
          <Marquee items={marqueePhrases} />
        </Strip>
        <Process />
        <About />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </Page>
  )
}
