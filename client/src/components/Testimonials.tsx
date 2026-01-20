import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Elisabeth M.",
    role: "Eier av utleiebolig",
    quote: "Tjenestene fra Smart Hjem AS har overgått alle mine forventninger. Jeg følte meg ivaretatt fra start til slutt!",
    rating: 5,
    initials: "EM",
  },
  {
    name: "Jonas L.",
    role: "Bedriftsleder",
    quote: "Profesjonaliteten og oppmerksomheten på detaljer var helt enestående. Jeg anbefaler dem på det varmeste!",
    rating: 5,
    initials: "JL",
  },
  {
    name: "Karin S.",
    role: "Utleier",
    quote: "En sømløs opplevelse fra start til slutt! Tjenestene deres gjorde prosessen enkel og bekymringsfri.",
    rating: 5,
    initials: "KS",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32 bg-card relative overflow-hidden"
      data-testid="section-testimonials"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">Kundeomtaler</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Innovative Løsninger for
            <span className="block text-primary mt-2">Eiendomsforvaltning</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Utforsk hva våre fornøyde kunder sier om oss - ekte historier om kvalitet og pålitelighet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover-elevate border-card-border bg-background/50 backdrop-blur-sm relative overflow-visible"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-8">
                <div className="absolute -top-4 left-8">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2">
                      {testimonial.name}
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
