import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PropertyShowcase from "@/components/PropertyShowcase";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <PropertyShowcase />
        <HowItWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
