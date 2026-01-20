import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-24" />
            <span className="text-primary font-medium tracking-wide text-sm uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Innovative Løsninger
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-24" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight text-center">
            Eiendomstjenester
            <span className="block bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent mt-2">
              Skreddersydd for Deg
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed text-center">
            Vi kombinerer erfaring og lidenskap for å gjøre ideer til virkelighet. 
            Med innovative løsninger hjelper vi deg å nå dine mål på en effektiv og personlig måte.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/booking">
              <Button
                size="lg"
                className="min-w-[220px] gap-2"
                data-testid="button-hero-properties"
              >
                Se Våre Eiendommer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#tjenester">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[220px] bg-white/5 border-white/20 text-white backdrop-blur-sm"
                data-testid="button-hero-services"
              >
                Utforsk Tjenester
              </Button>
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-white/70 text-sm">
            <div className="flex items-center justify-center gap-2 backdrop-blur-md bg-white/5 rounded-xl py-3 px-4 border border-white/10">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Profesjonell Rådgivning</span>
            </div>
            <div className="flex items-center justify-center gap-2 backdrop-blur-md bg-white/5 rounded-xl py-3 px-4 border border-white/10">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Lokalkunnskap</span>
            </div>
            <div className="flex items-center justify-center gap-2 backdrop-blur-md bg-white/5 rounded-xl py-3 px-4 border border-white/10">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Skreddersydde Løsninger</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-12">
          <div className="text-center backdrop-blur-md bg-white/5 rounded-2xl py-4 px-8 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white">2000+</div>
            <div className="text-white/60 text-sm mt-1">Tjenester Levert</div>
          </div>
          <div className="text-center backdrop-blur-md bg-white/5 rounded-2xl py-4 px-8 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
            <div className="text-white/60 text-sm mt-1">Glade Kunder</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#tjenester" className="text-white/40 hover:text-white/80 transition-colors" data-testid="link-scroll-down">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
