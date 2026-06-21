import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/sections/Navbar'
import Hero from '../components/sections/Hero'
import Packages from '../components/sections/Packages'
import Advantages from '../components/sections/Advantages'
import BentoFeatures from '../components/sections/BentoFeatures'
import Catalog from '../components/sections/Catalog'
import Stats from '../components/sections/Stats'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'
import Footer from '../components/sections/Footer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Packages />
      <Advantages />
      <BentoFeatures />
      <Catalog />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
