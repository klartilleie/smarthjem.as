import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Home, Building } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Property } from "@shared/schema";

function PropertyForm({ 
  property, 
  onSubmit, 
  onCancel,
  isLoading 
}: { 
  property?: Property; 
  onSubmit: (data: Property) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<Partial<Property>>(property || {
    id: "",
    name: "",
    description: "",
    location: "",
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 0,
    images: [],
    amenities: [],
    available: true,
  });

  const [imagesText, setImagesText] = useState(property?.images?.join("\n") || "");
  const [amenitiesText, setAmenitiesText] = useState(property?.amenities?.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imagesText.split("\n").filter(url => url.trim());
    const amenities = amenitiesText.split(",").map(a => a.trim()).filter(a => a);
    
    onSubmit({
      ...formData,
      id: formData.id || `property-${Date.now()}`,
      name: formData.name || "",
      description: formData.description || "",
      location: formData.location || "",
      beds: formData.beds || 1,
      bathrooms: formData.bathrooms || 1,
      maxGuests: formData.maxGuests || 2,
      pricePerNight: formData.pricePerNight || 0,
      images,
      amenities,
      available: formData.available ?? true,
    } as Property);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">ID (unik)</Label>
          <Input
            id="id"
            value={formData.id || ""}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            required
            disabled={!!property}
            placeholder="min-eiendom-123"
            data-testid="input-property-id"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Navn</Label>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Flott hytte ved sjøen"
            data-testid="input-property-name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beskrivelse</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
          placeholder="Beskriv eiendommen..."
          data-testid="input-property-description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokasjon</Label>
        <Input
          id="location"
          value={formData.location || ""}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          placeholder="Lindesnes, Norge"
          data-testid="input-property-location"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="beds">Senger</Label>
          <Input
            id="beds"
            type="number"
            min="1"
            value={formData.beds || 1}
            onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
            data-testid="input-property-beds"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bad</Label>
          <Input
            id="bathrooms"
            type="number"
            min="1"
            value={formData.bathrooms || 1}
            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
            data-testid="input-property-bathrooms"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxGuests">Maks gjester</Label>
          <Input
            id="maxGuests"
            type="number"
            min="1"
            value={formData.maxGuests || 2}
            onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
            data-testid="input-property-guests"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pricePerNight">Pris/natt</Label>
          <Input
            id="pricePerNight"
            type="number"
            min="0"
            value={formData.pricePerNight || 0}
            onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
            data-testid="input-property-price"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Bilder (én URL per linje)</Label>
        <Textarea
          id="images"
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          rows={3}
          placeholder="https://example.com/bilde1.jpg&#10;https://example.com/bilde2.jpg"
          data-testid="input-property-images"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Fasiliteter (kommaseparert)</Label>
        <Input
          id="amenities"
          value={amenitiesText}
          onChange={(e) => setAmenitiesText(e.target.value)}
          placeholder="WiFi, Parkering, Kjøkken, TV"
          data-testid="input-property-amenities"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="externalUrl">Ekstern URL (valgfritt)</Label>
          <Input
            id="externalUrl"
            value={formData.externalUrl || ""}
            onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
            placeholder="https://booking.com/..."
            data-testid="input-property-external-url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bookingUrl">Booking URL (valgfritt)</Label>
          <Input
            id="bookingUrl"
            value={formData.bookingUrl || ""}
            onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
            placeholder="https://booking.com/..."
            data-testid="input-property-booking-url"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading} data-testid="button-save-property">
          {isLoading ? "Lagrer..." : (property ? "Oppdater" : "Legg til")}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
          Avbryt
        </Button>
      </div>
    </form>
  );
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: session, isLoading: sessionLoading } = useQuery<{ isAdmin: boolean; email: string | null }>({
    queryKey: ["/api/admin/session"],
  });

  const { data: properties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    enabled: !!session?.isAdmin,
  });

  const addMutation = useMutation({
    mutationFn: (property: Property) => apiRequest("POST", "/api/admin/properties", property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setIsAddDialogOpen(false);
      toast({ title: "Suksess", description: "Eiendom lagt til." });
    },
    onError: () => {
      toast({ title: "Feil", description: "Kunne ikke legge til eiendom.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (property: Property) => apiRequest("PUT", `/api/admin/properties/${property.id}`, property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setIsEditDialogOpen(false);
      setEditingProperty(null);
      toast({ title: "Suksess", description: "Eiendom oppdatert." });
    },
    onError: () => {
      toast({ title: "Feil", description: "Kunne ikke oppdatere eiendom.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/properties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Suksess", description: "Eiendom slettet." });
    },
    onError: () => {
      toast({ title: "Feil", description: "Kunne ikke slette eiendom.", variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/session"] });
      setLocation("/admin/login");
    },
  });

  useEffect(() => {
    if (!sessionLoading && !session?.isAdmin) {
      setLocation("/admin/login");
    }
  }, [session, sessionLoading, setLocation]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Laster...</p>
      </div>
    );
  }

  if (!session?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.email}</span>
            <Button 
              variant="outline" 
              onClick={() => logoutMutation.mutate()}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logg ut
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Eiendommer</h2>
            <p className="text-muted-foreground">{properties.length} eiendommer totalt</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-property">
                <Plus className="h-4 w-4 mr-2" />
                Legg til eiendom
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Legg til ny eiendom</DialogTitle>
                <DialogDescription>
                  Fyll ut informasjon om den nye eiendommen.
                </DialogDescription>
              </DialogHeader>
              <PropertyForm
                onSubmit={(data) => addMutation.mutate(data)}
                onCancel={() => setIsAddDialogOpen(false)}
                isLoading={addMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {propertiesLoading ? (
          <p>Laster eiendommer...</p>
        ) : (
          <div className="grid gap-4">
            {properties.map((property) => (
              <Card key={property.id} data-testid={`card-property-${property.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {property.images?.[0] && (
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{property.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                      <p className="text-sm mt-1">
                        {property.beds} senger • {property.bathrooms} bad • {property.maxGuests} gjester
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={isEditDialogOpen && editingProperty?.id === property.id} onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) setEditingProperty(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingProperty(property)}
                            data-testid={`button-edit-${property.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Rediger eiendom</DialogTitle>
                            <DialogDescription>
                              Oppdater informasjon om eiendommen.
                            </DialogDescription>
                          </DialogHeader>
                          {editingProperty && (
                            <PropertyForm
                              property={editingProperty}
                              onSubmit={(data) => updateMutation.mutate(data)}
                              onCancel={() => {
                                setIsEditDialogOpen(false);
                                setEditingProperty(null);
                              }}
                              isLoading={updateMutation.isPending}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Er du sikker på at du vil slette "${property.name}"?`)) {
                            deleteMutation.mutate(property.id);
                          }
                        }}
                        data-testid={`button-delete-${property.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
