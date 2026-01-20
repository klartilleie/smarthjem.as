import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Settings, Sparkles, Wallet } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Registrering",
    description: "Ta kontakt med oss og fortell om eiendommen din. Vi evaluerer potensialet og gir deg et tilbud.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Oppsett",
    description: "Vi installerer smart lås, setter opp internett og profesjonell fotografering av eiendommen.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Vi Håndterer Alt",
    description: "Fra booking til rengjøring, fra gjestekommunikasjon til vedlikehold - vi tar oss av alt.",
  },
  {
    number: "04",
    icon: Wallet,
    title: "Du Mottar Inntekt",
    description: "Se inntektene strømme inn mens du sitter tilbake. Månedlige utbetalinger, null bekymringer.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="hvordan"
      className="py-20 md:py-28 bg-background"
      data-testid="section-how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Hvordan Det Fungerer</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Fire Enkle Steg til <span className="text-primary">Passiv Inntekt</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La oss vise deg hvor enkelt det er å komme i gang med utleie av din eiendom.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
                data-testid={`step-${index + 1}`}
              >
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                <span className="text-5xl font-bold text-primary/20 absolute -top-2 left-1/2 -translate-x-1/2 -z-10">
                  {step.number}
                </span>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
