import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users, Bed, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Property } from "@shared/schema";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PropertyShowcase() {
  const { t } = useLanguage();
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const allProperties = properties?.filter((p) => p.available !== false && p.images && p.images.length > 0) || [];

  const [visibleCards, setVisibleCards] = useState<Property[]>([]);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const poolRef = useRef<Property[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (allProperties.length > 0 && visibleCards.length === 0) {
      const shuffled = shuffleArray(allProperties);
      setVisibleCards(shuffled.slice(0, 6));
      poolRef.current = shuffled.slice(6);
    }
  }, [allProperties.length]);

  const rotateOne = useCallback(() => {
    if (allProperties.length <= 6) return;

    const indexToReplace = Math.floor(Math.random() * 6);
    setFadingIndex(indexToReplace);

    setTimeout(() => {
      setVisibleCards((prev) => {
        if (poolRef.current.length === 0) {
          const currentIds = new Set(prev.map((p) => p.id));
          poolRef.current = shuffleArray(allProperties.filter((p) => !currentIds.has(p.id)));
        }

        const next = poolRef.current.shift();
        if (!next) return prev;

        const oldCard = prev[indexToReplace];
        if (oldCard) {
          poolRef.current.push(oldCard);
        }

        const updated = [...prev];
        updated[indexToReplace] = next;
        return updated;
      });
      setFadingIndex(null);
    }, 400);
  }, [allProperties]);

  useEffect(() => {
    if (allProperties.length <= 6) return;

    intervalRef.current = setInterval(rotateOne, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rotateOne, allProperties.length]);

  if (!isLoading && (!properties || properties.length === 0)) {
    return null;
  }

  return (
    <section
      className="py-24 md:py-32 bg-card relative overflow-hidden"
      data-testid="section-properties"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 flex-wrap mb-12 md:mb-16">
          <div>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">{t.propertyShowcase?.badge || "Våre Eiendommer"}</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.propertyShowcase?.titleLine1 || "Oppdag Våre"}
              <span className="block text-primary mt-2">{t.propertyShowcase?.titleLine2 || "Tilgjengelige Eiendommer"}</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-muted-foreground">
              <span>{t.propertyShowcase?.alsoOn || "Også tilgjengelig på:"}</span>
              <Badge variant="outline" className="text-xs">Booking.com</Badge>
              <Badge variant="outline" className="text-xs">Airbnb</Badge>
              <Badge variant="outline" className="text-xs">Finn.no</Badge>
            </div>
          </div>
          <Link href="/booking">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all">
              {t.propertyShowcase?.viewAll || "Vis Alle Eiendommer"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleCards.map((property, index) => (
              <Card
                key={property.id}
                className={`group overflow-hidden border-card-border bg-background/50 backdrop-blur-sm hover-elevate transition-opacity duration-400 ${
                  fadingIndex === index ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
                style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
                data-testid={`card-property-${index}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      {property.pricePerNight > 0 
                        ? `${property.location.includes("Spain") ? "€" : "kr"} ${property.pricePerNight.toLocaleString()}${t.modal?.perNight || "/natt"}`
                        : t.propertyShowcase?.seePrices || "Se priser"}
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
