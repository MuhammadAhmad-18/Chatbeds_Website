import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppWorkflow } from "@/components/WhatsAppWorkflow";
import { ProductPillars } from "@/components/ProductPillars";
import { ChatOperations } from "@/components/ChatOperations";
import { GuestExperience } from "@/components/GuestExperience";
import { AIFeatures } from "@/components/AIFeatures";
import { PropertyTypes } from "@/components/PropertyTypes";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="home" />
      <Navbar />
      <main id="main" className="relative min-w-0">
        <Hero />
        <TrustStrip />
        <WhatsAppWorkflow />
        <ProductPillars />
        <ChatOperations />
        <GuestExperience />
        <AIFeatures />
        <PropertyTypes />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
