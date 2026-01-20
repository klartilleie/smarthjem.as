import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@assets/Smart_Hjem_As_-_FinalizedLogoD2L5_(Transparent)-01_1768943309700.png";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" data-testid="link-footer-logo">
              <img
                src={logoImage}
                alt="Smart Hjem AS"
                className="h-12 w-auto mb-6"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">16+</div>
                <div className="text-xs text-muted-foreground">{t.nav.properties}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5">{t.services.badge}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-cabins">{t.services.cabins.title}</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-apartments">{t.services.apartments.title}</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-houses">{t.services.houses.title}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5">{t.footer.quickLinks}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors" data-testid="link-footer-home">{t.nav.home}</Link></li>
              <li><Link href="/booking" className="hover:text-foreground transition-colors" data-testid="link-footer-eiendommer">{t.nav.properties}</Link></li>
              <li><a href="#kontakt" className="hover:text-foreground transition-colors" data-testid="link-footer-kontakt">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5">{t.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li data-testid="text-footer-address">Norge</li>
              <li data-testid="text-footer-email">post@smarthjem.as</li>
              <li data-testid="text-footer-website">
                <a href="https://smarthjem.as" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  smarthjem.as
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            {currentYear} Smart Hjem AS. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
