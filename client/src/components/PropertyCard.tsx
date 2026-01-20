import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Bath } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <Card
      className="group overflow-hidden border-card-border hover-elevate cursor-pointer"
      onClick={() => onSelect(property)}
      data-testid={`card-property-${property.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            kr {property.pricePerNight.toLocaleString()}/natt
          </Badge>
        </div>
        {!property.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Ikke tilgjengelig
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-xl mb-2 line-clamp-1">{property.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {property.maxGuests}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.amenities.slice(0, 3).map((amenity, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{property.amenities.length - 3}
            </Badge>
          )}
        </div>

        <Button
          className="w-full"
          disabled={!property.available}
          data-testid={`button-book-${property.id}`}
        >
          {property.available ? "Se Detaljer" : "Ikke tilgjengelig"}
        </Button>
      </CardContent>
    </Card>
  );
}
