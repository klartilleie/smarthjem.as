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

        <div className="border-t border-border/50 pt-8 pb-8 flex flex-col items-center gap-6">
          <a 
            href="https://www.dropbox.com/request/9W81hTtZdazD7rp3k65n" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            data-testid="button-send-photos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Send oss bilder
          </a>
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            {currentYear} Smart Hjem AS. {t.footer.rights}
          </p>
          <Link href="/admin/login">
            <span className="text-muted-foreground/50 text-xs hover:text-muted-foreground transition-colors cursor-pointer" data-testid="link-admin">
              Admin
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
