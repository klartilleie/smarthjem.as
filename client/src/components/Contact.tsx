import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

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
      className="py-20 md:py-28 bg-background"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Kontakt Oss</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            La Oss <span className="text-primary">Starte Samtalen</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Klar til å komme i gang? Ta kontakt med oss for en uforpliktende samtale om din eiendom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle>Send Oss en Melding</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Takk for din henvendelse!</h3>
                  <p className="text-muted-foreground mb-4">
                    Vi har mottatt meldingen din og vil svare innen 24 timer.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} data-testid="button-new-message">
                    Send en ny melding
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Navn *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ditt navn"
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
                                {...field}
                                data-testid="input-contact-email"
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+47 XXX XX XXX"
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
                              placeholder="Fortell oss om din eiendom og hva du ønsker..."
                              rows={5}
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
                      className="w-full gap-2"
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
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-card-border" data-testid="card-address">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Besøksadresse</h3>
                    <p className="text-muted-foreground text-sm">
                      Storgata 1<br />
                      0155 Oslo, Norge
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border" data-testid="card-phone">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground text-sm">
                      +47 22 00 00 00<br />
                      +47 900 00 000 (Support)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border" data-testid="card-email">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-post</h3>
                    <p className="text-muted-foreground text-sm">
                      post@smarthjem.no<br />
                      support@smarthjem.no
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border" data-testid="card-hours">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Åpningstider</h3>
                    <p className="text-muted-foreground text-sm">
                      Man - Fre: 08:00 - 17:00<br />
                      Gjesteservice: 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <p className="text-sm font-medium text-primary mb-1">Rask respons garantert</p>
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
