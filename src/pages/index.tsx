import { About, Accreditation, FAQs, HowItWorks, Offer, Testimonials, Selector } from '../components/LandingPage';
import { Hero } from '../components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <Selector />
      <About />
      <Offer />
      <HowItWorks />
      <Testimonials />
      <FAQs />
      <Accreditation />
    </>
  )
}
