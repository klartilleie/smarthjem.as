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
      className="py-20 md:py-28 bg-card"
      data-testid="section-properties"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="secondary" className="mb-4">Utvalgte Eiendommer</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Oppdag Våre <span className="text-primary">Premium Hytter</span>
            </h2>
          </div>
          <Link href="/booking">
            <Button variant="outline" className="gap-2" data-testid="button-view-all">
              Vis Alle Eiendommer
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-card-border hover-elevate"
              data-testid={`card-property-${index}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    kr {property.pricePerNight.toLocaleString()}/natt
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-xl mb-2">{property.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.beds} senger
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {property.maxGuests} gjester
                    </span>
                  </div>
                  <Link href={`/booking?property=${property.id}`}>
                    <Button size="sm" data-testid={`button-book-${property.id}`}>
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
