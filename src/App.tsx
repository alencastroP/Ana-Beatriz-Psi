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

const Page = styled.div`
  width: 100%;
  overflow-x: hidden;
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
        <Process />
        <About />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </Page>
  )
}
