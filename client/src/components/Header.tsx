import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import logoImage from "@assets/Smart_Hjem_As_-_FinalizedLogoD2L5_(Transparent)-01_1768943309700.png";

export default function Header() {
  const { t } = useLanguage();
  
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/booking", label: t.nav.properties },
    { href: "/#tjenester", label: t.services.badge },
    { href: "/#kontakt", label: t.nav.contact },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const headerBg = isScrolled || !isHome
    ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-4 h-20 md:h-24">
          <Link href="/" data-testid="link-logo">
            <img
              src={logoImage}
              alt="Smart Hjem AS"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    !isScrolled && isHome ? "text-white/90" : ""
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={!isScrolled && isHome ? "text-white" : ""}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <a href="https://klartilleie.no" target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <Button variant="outline" data-testid="button-huseier-header">
                Huseier
              </Button>
            </a>

            <Link href="/#kontakt" className="hidden lg:block">
              <Button data-testid="button-contact-header">
                {t.nav.contact}
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={!isScrolled && isHome ? "text-white" : ""}
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base"
                        data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <a href="https://klartilleie.no" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full mt-4" data-testid="mobile-button-huseier">
                      Huseier
                    </Button>
                  </a>
                  <Link href="/#kontakt" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full mt-2" data-testid="mobile-button-contact">
                      {t.nav.contact}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
