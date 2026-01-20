import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, FileSearch, Settings, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Ta Kontakt",
    description: "Fortell oss om dine behov. Vi lytter og forstår din situasjon for å finne den beste løsningen.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Vi Analyserer",
    description: "Våre eksperter gjennomgår dine behov og presenterer skreddersydde løsningsforslag.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Gjennomføring",
    description: "Vi implementerer løsningen profesjonelt med fokus på kvalitet og dine ønsker.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Oppfølging",
    description: "Vi sikrer at du er fornøyd og tilbyr løpende support for vedvarende suksess.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="hvordan"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      data-testid="section-how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">Prosessen</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Eiendomsløsninger der
            <span className="block text-primary mt-2">Dine Behov Står i Sentrum</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Oppdag fordelene med våre tjenester og ta neste steg i dag. 
            Kontakt oss for en løsning skreddersydd for deg!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group hover-elevate border-card-border bg-card/50 backdrop-blur-sm relative overflow-visible"
              data-testid={`step-${index + 1}`}
            >
              <CardContent className="p-8 text-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mt-6 mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
