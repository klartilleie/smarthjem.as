import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Erik Johansen",
    location: "Hytte i Hemsedal",
    rating: 5,
    text: "Smart Hjem har fullstendig forandret utleieopplevelsen min. Jeg får stabile inntekter uten å måtte bekymre meg for noe. Profesjonelle fra dag én!",
    initials: "EJ",
  },
  {
    name: "Maria Olsen",
    location: "Leilighet i Oslo",
    rating: 5,
    text: "Den nøkkelfrie løsningen er genial. Gjestene elsker det, og jeg slipper stresset med nøkler. Rengjøringsteamet deres er også fantastisk.",
    initials: "MO",
  },
  {
    name: "Anders Berg",
    location: "Sjøhytte i Søgne",
    rating: 5,
    text: "Jeg var skeptisk først, men resultatene taler for seg selv. Høyere belegg og bedre anmeldelser enn noensinne. Anbefales på det sterkeste!",
    initials: "AB",
  },
  {
    name: "Karin Haugen",
    location: "Fjellstue i Trysil",
    rating: 5,
    text: "Kommunikasjonen er upåklagelig. De holder meg oppdatert på alt, og support er tilgjengelig når som helst. Føler meg trygg som utleier.",
    initials: "KH",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20 md:py-28 bg-card"
      data-testid="section-testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Tilbakemeldinger</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hva Våre <span className="text-primary">Utleiere Sier</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Over 200 fornøyde eiendomseiere stoler på oss med sine verdifulle eiendommer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-card-border"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="w-10 h-10 text-primary/20 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {testimonial.location}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Verifisert utleier
                        </Badge>
                      </div>
                    </div>
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
