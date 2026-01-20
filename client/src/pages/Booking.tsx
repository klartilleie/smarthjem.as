import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Booking() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [guestFilter, setGuestFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Filter to only show available (active) properties
  const availableProperties = properties?.filter((p) => p.available !== false) || [];

  const locations = availableProperties.length > 0
    ? Array.from(new Set(availableProperties.map((p) => p.location)))
    : [];

  const filteredProperties = availableProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || property.location === locationFilter;
    const matchesGuests =
      guestFilter === "all" || property.maxGuests >= parseInt(guestFilter);
    return matchesSearch && matchesLocation && matchesGuests;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setGuestFilter("all");
  };

  const hasActiveFilters =
    searchQuery || locationFilter !== "all" || guestFilter !== "all";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="bg-card border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Badge variant="secondary" className="mb-4">Våre Eiendommer</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Finn Din Perfekte <span className="text-primary">Feriebolig</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              Utforsk vårt utvalg av premium hytter og eiendommer. Alle inkluderer nøkkelfri adgang, høyhastighets internett og profesjonell rengjøring.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Tilgjengelig på:</span>
              <Badge variant="outline">Booking.com</Badge>
              <Badge variant="outline">Airbnb</Badge>
              <Badge variant="outline">VRBO</Badge>
              <Badge variant="outline">Finn.no</Badge>
              <span className="text-xs">og flere plattformer</span>
            </div>
          </div>
        </section>

        <section className="sticky top-20 md:top-24 z-40 bg-background border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Søk etter navn eller sted..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Button
                variant="outline"
                className="sm:hidden gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtre
                {hasActiveFilters && (
                  <Badge className="ml-1">Aktiv</Badge>
                )}
              </Button>
              <div className={`flex-col sm:flex-row gap-4 ${showFilters ? "flex" : "hidden sm:flex"}`}>
                <div className="w-full sm:w-48">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger data-testid="select-location">
                      <SelectValue placeholder="Velg sted" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle steder</SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-40">
                  <Select value={guestFilter} onValueChange={setGuestFilter}>
                    <SelectTrigger data-testid="select-guests">
                      <SelectValue placeholder="Antall gjester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle</SelectItem>
                      <SelectItem value="2">2+ gjester</SelectItem>
                      <SelectItem value="4">4+ gjester</SelectItem>
                      <SelectItem value="6">6+ gjester</SelectItem>
                      <SelectItem value="8">8+ gjester</SelectItem>
                      <SelectItem value="10">10+ gjester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilters}
                    className="flex-shrink-0"
                    data-testid="button-clear-filters"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12" data-testid="section-property-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[4/3] rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Kunne ikke laste eiendommer. Vennligst prøv igjen senere.
                </p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Prøv igjen
                </Button>
              </div>
            ) : filteredProperties && filteredProperties.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Viser {filteredProperties.length} av {availableProperties.length} eiendommer
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={setSelectedProperty}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Ingen eiendommer funnet som matcher dine kriterier.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Fjern alle filtre
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <PropertyModal
        property={selectedProperty}
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
