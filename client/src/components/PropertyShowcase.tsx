import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, ArrowRight } from "lucide-react";

import property1 from "@assets/stock_images/luxury_vacation_cabi_fd229fff.jpg";
import property2 from "@assets/stock_images/luxury_vacation_cabi_824e5b19.jpg";
import property3 from "@assets/stock_images/luxury_vacation_cabi_906cf2af.jpg";

const featuredProperties = [
  {
    id: "1",
    name: "Fjellhytte Deluxe",
    location: "Hemsedal",
    beds: 6,
    maxGuests: 10,
    pricePerNight: 3500,
    image: property1,
  },
  {
    id: "2",
    name: "Sjøhytta Premium",
    location: "Kristiansand",
    beds: 4,
    maxGuests: 8,
    pricePerNight: 2800,
    image: property2,
  },
  {
    id: "3",
    name: "Skogstua Luksus",
    location: "Trysil",
    beds: 5,
    maxGuests: 10,
    pricePerNight: 3200,
    image: property3,
  },
];

export default function PropertyShowcase() {
  return (
    <section
      className="py-24 md:py-32 bg-card relative overflow-hidden"
      data-testid="section-properties"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">Utvalgte Eiendommer</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Oppdag Våre
              <span className="block text-primary mt-2">Premium Hytter</span>
            </h2>
          </div>
          <Link href="/booking">
            <Button variant="outline" size="lg" className="gap-2 rounded-full" data-testid="button-view-all">
              Vis Alle Eiendommer
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property, index) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-card-border bg-background/50 backdrop-blur-sm hover-elevate"
              data-testid={`card-property-${index}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    kr {property.pricePerNight.toLocaleString()}/natt
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-xl text-white mb-1">{property.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full">
                      <Bed className="w-4 h-4" />
                      {property.beds}
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      {property.maxGuests}
                    </span>
                  </div>
                  <Link href={`/booking?property=${property.id}`}>
                    <Button className="rounded-full" data-testid={`button-book-${property.id}`}>
                      Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
