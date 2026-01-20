import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sun, Moon } from "lucide-react";
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
    ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="link-logo">
            <img
              src={logoImage}
              alt="Smart Hjem AS"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    !isScrolled && isHome
                      ? "text-white hover:text-white/80 hover:bg-white/10"
                      : ""
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={!isScrolled && isHome ? "text-white hover:bg-white/10" : ""}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href="/booking" className="hidden md:block">
              <Button data-testid="button-book-now">
                Book Nå
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={!isScrolled && isHome ? "text-white hover:bg-white/10" : ""}
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col gap-4 mt-8">
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
                  <Link href="/booking" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full mt-4" data-testid="mobile-button-book">
                      Book Nå
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
