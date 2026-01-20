import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users, Bed, ArrowRight } from "lucide-react";
import type { Property } from "@shared/schema";

export default function PropertyShowcase() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Don't show section if no properties available
  if (!isLoading && (!properties || properties.length === 0)) {
    return null;
  }

  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <section
      className="py-24 md:py-32 bg-card relative overflow-hidden"
      data-testid="section-properties"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 flex-wrap mb-12 md:mb-16">
          <div>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">Våre Eiendommer</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Oppdag Våre
              <span className="block text-primary mt-2">Tilgjengelige Eiendommer</span>
            </h2>
          </div>
          <Link href="/booking">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all">
              Vis Alle Eiendommer
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProperties.map((property, index) => (
              <Card
                key={property.id}
                className="group overflow-hidden border-card-border bg-background/50 backdrop-blur-sm hover-elevate"
                data-testid={`card-property-${index}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Ingen bilde</span>
                    </div>
                  )}
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
                  <div className="flex items-center justify-between gap-4">
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
                      <Button data-testid={`button-book-${property.id}`}>
                        Book
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
