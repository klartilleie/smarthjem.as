import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Wifi, Key, Headphones, Shield } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Profesjonell Rengjøring",
    description: "Vårt erfarne team sørger for at eiendommen er skinnende ren før hver gjest ankommer, med hotellstandard.",
    badge: "Alt inkludert",
  },
  {
    icon: Calendar,
    title: "Booking & Administrasjon",
    description: "Vi håndterer alle bookinger, kommunikasjon med gjester og koordinering - du trenger ikke løfte en finger.",
    badge: "24/7 Tilgjengelig",
  },
  {
    icon: Key,
    title: "Nøkkelfri Adgang",
    description: "Moderne smarte låser gir gjestene enkel og sikker innsjekking uten behov for fysisk nøkkelutveksling.",
    badge: "Smart Løsning",
  },
  {
    icon: Wifi,
    title: "Høyhastighets Internett",
    description: "Vi installerer og vedlikeholder pålitelig fiber eller 5G-internett i alle eiendommer for best mulig gjesteopplevelse.",
    badge: "Inkludert",
  },
  {
    icon: Headphones,
    title: "Gjeste-Support",
    description: "Vårt supportteam er tilgjengelig døgnet rundt for å hjelpe gjester med spørsmål eller problemer.",
    badge: "Døgnåpent",
  },
  {
    icon: Shield,
    title: "Forsikring & Sikkerhet",
    description: "Full forsikringsdekning og regelmessige sikkerhetssjekker gir deg trygghet som utleier.",
    badge: "Trygt",
  },
];

export default function Services() {
  return (
    <section
      id="tjenester"
      className="py-20 md:py-28 bg-background"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Våre Tjenester</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Alt Du Trenger for <span className="text-primary">Bekymringsfri Utleie</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vi tar hånd om alle aspekter ved utleie, slik at du kan fokusere på det som er viktig for deg.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover-elevate border-card-border"
              data-testid={`card-service-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {service.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
