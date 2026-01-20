import { Link } from "wouter";
import logoImage from "@assets/Smart_Hjem_As_-_FinalizedLogoD2L5_(Transparent)-01_1768943309700.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" data-testid="link-footer-logo">
              <img
                src={logoImage}
                alt="Smart Hjem AS"
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Din partner for bekymringsfri utleie. Vi tar oss av alt fra rengjøring til booking og nøkkelfri adgang.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tjenester</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-rengjoering">Rengjøring</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-booking">Booking Administrasjon</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-nokkel">Nøkkelfri Adgang</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-internett">Internett</a></li>
              <li><a href="#tjenester" className="hover:text-foreground transition-colors" data-testid="link-footer-gjesteservice">Gjesteservice</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Selskapet</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-om">Om Oss</a></li>
              <li><a href="#hvordan" className="hover:text-foreground transition-colors" data-testid="link-footer-hvordan">Hvordan Det Fungerer</a></li>
              <li><Link href="/booking" className="hover:text-foreground transition-colors" data-testid="link-footer-eiendommer">Eiendommer</Link></li>
              <li><a href="#kontakt" className="hover:text-foreground transition-colors" data-testid="link-footer-kontakt">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-footer-address">Storgata 1, 0155 Oslo</li>
              <li data-testid="text-footer-phone">+47 22 00 00 00</li>
              <li data-testid="text-footer-email">post@smarthjem.no</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            {currentYear} Smart Hjem AS. Alle rettigheter reservert.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-personvern">Personvern</a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-vilkar">Vilkår</a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-footer-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
