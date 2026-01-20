import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { bookingRequestSchema, type Property, type BookingRequest } from "@shared/schema";
import {
  MapPin, Users, Bed, Bath, Wifi, Key, Sparkles, Car, Mountain,
  ChevronLeft, ChevronRight, CheckCircle
} from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="w-4 h-4" />,
  "Smart Lås": <Key className="w-4 h-4" />,
  "Rengjøring": <Sparkles className="w-4 h-4" />,
  "Parkering": <Car className="w-4 h-4" />,
  "Utsikt": <Mountain className="w-4 h-4" />,
};

export default function PropertyModal({ property, open, onClose }: PropertyModalProps) {
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const form = useForm<BookingRequest>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      propertyId: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  useEffect(() => {
    if (property) {
      form.setValue("propertyId", property.id);
      form.setValue("guests", Math.min(2, property.maxGuests));
    }
  }, [property, form]);

  const mutation = useMutation({
    mutationFn: async (data: BookingRequest) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      setBookingComplete(true);
      toast({
        title: "Booking forespørsel sendt!",
        description: "Vi sender deg bekreftelse på e-post.",
      });
    },
    onError: () => {
      toast({
        title: "Noe gikk galt",
        description: "Vennligst prøv igjen senere.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingRequest) => {
    mutation.mutate({ ...data, propertyId: property?.id || "" });
  };

  if (!property) return null;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleClose = () => {
    setShowBookingForm(false);
    setBookingComplete(false);
    setCurrentImage(0);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogDescription className="sr-only">
          Detaljer og booking for {property.name}
        </DialogDescription>
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={property.images[currentImage]}
              alt={`${property.name} - bilde ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImage ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImage(i)}
                      data-testid={`button-image-dot-${i}`}
                      aria-label={`Vis bilde ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          {bookingComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-2">Takk for din bestilling!</h3>
              <p className="text-muted-foreground mb-6">
                Vi har mottatt din forespørsel for {property.name}. Du vil motta en bekreftelse på e-post innen kort tid.
              </p>
              <Button onClick={handleClose} data-testid="button-close-booking">
                Lukk
              </Button>
            </div>
          ) : showBookingForm ? (
            <div>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl">Book {property.name}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Innsjekking *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              data-testid="input-checkin"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Utsjekking *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              data-testid="input-checkout"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Antall gjester *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={property.maxGuests}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            data-testid="input-guests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fornavn *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-firstname"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Etternavn *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-lastname"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              data-testid="input-book-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-book-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spesielle ønsker</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="F.eks. sent ankomst, allergier, etc."
                            {...field}
                            data-testid="input-special-requests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowBookingForm(false)}
                      data-testid="button-back"
                    >
                      Tilbake
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={mutation.isPending}
                      data-testid="button-submit-booking"
                    >
                      {mutation.isPending ? "Sender..." : "Send Bestilling"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <DialogTitle className="text-2xl mb-2">{property.name}</DialogTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </div>
                  </div>
                  <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
                    kr {property.pricePerNight.toLocaleString()}/natt
                  </Badge>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Bed className="w-4 h-4 text-primary" />
                  <span>{property.beds} soverom</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Bath className="w-4 h-4 text-primary" />
                  <span>{property.bathrooms} bad</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Maks {property.maxGuests} gjester</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-3">Om eiendommen</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-3">Fasiliteter</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm bg-muted px-3 py-2 rounded-md"
                    >
                      {amenityIcons[amenity] || <CheckCircle className="w-4 h-4 text-primary" />}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowBookingForm(true)}
                  disabled={!property.available}
                  data-testid="button-book-property"
                >
                  {property.available ? "Book Denne Eiendommen" : "Ikke tilgjengelig"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
