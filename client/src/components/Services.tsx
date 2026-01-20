import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Building, TreePine, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: TreePine,
      title: t.services.cabins.title,
      description: t.services.cabins.description,
      badge: t.services.cabins.badge,
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: Building,
      title: t.services.apartments.title,
      description: t.services.apartments.description,
      badge: t.services.apartments.badge,
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Home,
      title: t.services.houses.title,
      description: t.services.houses.description,
      badge: t.services.houses.badge,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section
      id="tjenester"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      data-testid="section-services"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">{t.services.badge}</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t.services.title1}
            <span className="block text-primary mt-2">{t.services.title2}</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover-elevate border-card-border bg-card/50 backdrop-blur-sm overflow-visible"
              data-testid={`card-service-${index}`}
            >
              <CardContent className="p-8 lg:p-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 dark:border-white/5 flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h3 className="font-bold text-xl lg:text-2xl">{service.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {service.badge}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <a 
                  href="#kontakt" 
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                  data-testid={`link-service-${index}`}
                >
                  {t.services.contactUs}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
