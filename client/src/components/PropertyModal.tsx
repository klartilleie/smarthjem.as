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
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import { bookingRequestSchema, type Property, type BookingRequest } from "@shared/schema";
import {
  MapPin, Users, Bed, Bath, Wifi, Key, Sparkles, Car, Mountain,
  ChevronLeft, ChevronRight, CheckCircle, ExternalLink
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
  "Gratis Parkering": <Car className="w-4 h-4" />,
  "Utsikt": <Mountain className="w-4 h-4" />,
  "Sjøutsikt": <Mountain className="w-4 h-4" />,
  "Fjellutsikt": <Mountain className="w-4 h-4" />,
};

export default function PropertyModal({ property, open, onClose }: PropertyModalProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
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
        title: t.modal.toast.success,
        description: t.modal.toast.successDesc,
      });
    },
    onError: () => {
      toast({
        title: t.modal.toast.error,
        description: t.modal.toast.errorDesc,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingRequest) => {
    mutation.mutate({ ...data, propertyId: property?.id || "" });
  };

  if (!property) return null;

  const hasImages = property.images && property.images.length > 0;

  const nextImage = () => {
    if (hasImages && property.images.length > 1) {
      setCurrentImage((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (hasImages && property.images.length > 1) {
      setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const handleClose = () => {
    setShowBookingForm(false);
    setBookingComplete(false);
    setCurrentImage(0);
    form.reset();
    onClose();
  };

  const handleExternalLink = () => {
    if (property.externalUrl) {
      window.open(property.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogDescription className="sr-only">
          {t.modal.aboutProperty}: {property.name}
        </DialogDescription>
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {hasImages ? (
              <img
                src={property.images[currentImage]}
                alt={`${property.name} - bilde ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-center">
                  <Mountain className="w-16 h-16 text-primary/30 mx-auto mb-2" />
                </div>
              </div>
            )}
            {hasImages && property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg"
                  onClick={prevImage}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-7 h-7" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg"
                  onClick={nextImage}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-7 h-7" />
                </Button>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImage + 1} / {property.images.length}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full">
                  {property.images.map((_, i) => (
                    <button
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === currentImage 
                          ? "bg-white scale-110 ring-2 ring-white/50" 
                          : "bg-white/50 hover:bg-white/80"
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
          
          {hasImages && property.images.length > 1 && (
            <div className="bg-muted/50 p-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${
                      i === currentImage 
                        ? "ring-2 ring-primary ring-offset-2 opacity-100" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentImage(i)}
                    data-testid={`button-thumbnail-${i}`}
                    aria-label={`Velg bilde ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${property.name} miniatyrbilde ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {bookingComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-2">{t.modal.success.title}</h3>
              <p className="text-muted-foreground mb-6">
                {t.modal.success.message}
              </p>
              <Button onClick={handleClose} data-testid="button-close-booking">
                {t.modal.success.close}
              </Button>
            </div>
          ) : showBookingForm ? (
            <div>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl">{t.modal.bookingForm.title} {property.name}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.modal.bookingForm.checkIn} *</FormLabel>
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
                          <FormLabel>{t.modal.bookingForm.checkOut} *</FormLabel>
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
                        <FormLabel>{t.modal.bookingForm.guests} *</FormLabel>
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
                          <FormLabel>{t.modal.bookingForm.firstName} *</FormLabel>
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
                          <FormLabel>{t.modal.bookingForm.lastName} *</FormLabel>
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
                          <FormLabel>{t.modal.bookingForm.email} *</FormLabel>
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
                          <FormLabel>{t.modal.bookingForm.phone} *</FormLabel>
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
                        <FormLabel>{t.modal.bookingForm.specialRequests}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.modal.bookingForm.specialRequestsPlaceholder}
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
                      {t.modal.bookingForm.back}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={mutation.isPending}
                      data-testid="button-submit-booking"
                    >
                      {mutation.isPending ? t.modal.bookingForm.sending : t.modal.bookingForm.submit}
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
                    {property.pricePerNight > 0 
                      ? `${property.location.includes("Spain") ? "€" : "kr"} ${property.pricePerNight.toLocaleString()}${t.modal.perNight}`
                      : t.modal.contactForPrices}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Bed className="w-4 h-4 text-primary" />
                  <span>{property.beds} {t.modal.bedrooms}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Bath className="w-4 h-4 text-primary" />
                  <span>{property.bathrooms} {t.modal.bathrooms}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{t.modal.maxGuests} {property.maxGuests}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-3">{t.modal.aboutProperty}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-3">{t.modal.amenities}</h4>
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

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowBookingForm(true)}
                  disabled={!property.available}
                  data-testid="button-book-property"
                >
                  {property.available ? t.modal.sendBookingRequest : t.modal.notAvailable}
                </Button>
                
                {property.externalUrl && (
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleExternalLink}
                    data-testid="button-external-link"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.modal.viewOnExternalSite}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
