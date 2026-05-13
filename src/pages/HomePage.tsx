import HeroSection from '../sections/HeroSection'
import FeaturesSection from '../sections/FeaturesSection'
import ComponentsGallery from '../sections/ComponentsGallery'
import ShowcaseSection from '../sections/ShowcaseSection'
import DocumentationSection from '../sections/DocumentationSection'
import StatsSection from '../sections/StatsSection'
import CTASection from '../sections/CTASection'
import LandingFooter from '../sections/LandingFooter'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ComponentsGallery />
      <ShowcaseSection />
      <DocumentationSection />
      <StatsSection />
      <CTASection />
      <LandingFooter />
    </main>
  )
}
