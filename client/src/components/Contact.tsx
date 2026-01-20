import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { contactFormSchema, type ContactForm as ContactFormType } from "@shared/schema";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormType) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Melding sendt!",
        description: "Vi tar kontakt med deg så snart som mulig.",
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

  const onSubmit = (data: ContactFormType) => {
    mutation.mutate(data);
  };

  return (
    <section
      id="kontakt"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      data-testid="section-contact"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">Kontakt Oss</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            La Oss
            <span className="block text-primary mt-2">Starte Samtalen</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Klar til å komme i gang? Ta kontakt med oss for en uforpliktende samtale 
            om dine eiendomsbehov.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <Card className="lg:col-span-3 border-card-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3">Takk for din henvendelse!</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Vi har mottatt meldingen din og vil svare innen 24 timer.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-full" data-testid="button-new-message">
                    Send en ny melding
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-xl">Send Oss en Melding</h3>
                  </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Navn *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ditt navn"
                                  className="h-12 rounded-xl"
                                  {...field}
                                  data-testid="input-contact-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-post *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="din@epost.no"
                                  className="h-12 rounded-xl"
                                  {...field}
                                  data-testid="input-contact-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+47 XXX XX XXX"
                                  className="h-12 rounded-xl"
                                  {...field}
                                  data-testid="input-contact-phone"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emne *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Hva gjelder det?"
                                  className="h-12 rounded-xl"
                                  {...field}
                                  data-testid="input-contact-subject"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Melding *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Fortell oss om dine behov..."
                                rows={5}
                                className="rounded-xl resize-none"
                                {...field}
                                data-testid="input-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2 rounded-full h-14"
                        disabled={mutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        {mutation.isPending ? (
                          "Sender..."
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Melding
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-4">
            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-address">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Besøksadresse</h3>
                    <p className="text-muted-foreground text-sm">
                      Norge
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-phone">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground text-sm">
                      Live Chat Tilgjengelig
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-email">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-post</h3>
                    <p className="text-muted-foreground text-sm">
                      post@smarthjem.as
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-card/50 backdrop-blur-sm hover-elevate" data-testid="card-hours">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Åpningstider</h3>
                    <p className="text-muted-foreground text-sm">
                      Man - Fre: 08:00 - 17:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <p className="text-sm font-semibold text-primary mb-1">Rask respons garantert</p>
              <p className="text-muted-foreground text-sm">
                Vi svarer på alle henvendelser innen 24 timer på virkedager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
