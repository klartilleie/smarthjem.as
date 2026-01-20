import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import logoImage from "@assets/Smart_Hjem_As_-_FinalizedLogoD2L5_(Transparent)-01_1768943309700.png";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/booking", label: "Eiendommer" },
  { href: "/#tjenester", label: "Tjenester" },
  { href: "/#hvordan", label: "Hvordan Det Fungerer" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Header() {
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
        <div className="flex items-center justify-between h-18 md:h-20">
          <Link href="/" data-testid="link-logo">
            <img
              src={logoImage}
              alt="Smart Hjem AS"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium rounded-full px-4 ${
                    !isScrolled && isHome
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : ""
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full ${!isScrolled && isHome ? "text-white hover:bg-white/10" : ""}`}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href="/#kontakt" className="hidden lg:block">
              <Button className="rounded-full px-6" data-testid="button-contact-header">
                Kontakt Oss
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${!isScrolled && isHome ? "text-white hover:bg-white/10" : ""}`}
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
                        className="w-full justify-start text-base rounded-xl h-12"
                        data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <Link href="/#kontakt" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full mt-4 rounded-xl h-12" data-testid="mobile-button-contact">
                      Kontakt Oss
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
