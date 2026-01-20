import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle } from "lucide-react";
import heroImage from "@assets/stock_images/luxury_vacation_cabi_fd229fff.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1.5"
        >
          <Users className="w-4 h-4 mr-2" />
          200+ fornøyde utleiere
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Nøkkelfri Utleie
          <span className="block text-primary mt-2">Vi Tar Oss av Alt</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Fra rengjøring til internett, fra booking til nøkkelfri adgang.
          Smart Hjem AS gir deg en helt bekymringsfri utleieopplevelse.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking">
            <Button
              size="lg"
              className="min-w-[200px] text-base font-semibold"
              data-testid="button-hero-properties"
            >
              Se Våre Eiendommer
            </Button>
          </Link>
          <a href="#hvordan">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              data-testid="button-hero-how"
            >
              Hvordan Det Fungerer
            </Button>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Profesjonell Rengjøring
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Smart Nøkkelfri Adgang
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Høyhastighets Internett
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#tjenester" className="text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
