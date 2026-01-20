import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import type { Language } from "@/lib/translations";

const languages: { code: Language; name: string; abbr: string }[] = [
  { code: "no", name: "Norsk", abbr: "NO" },
  { code: "en", name: "English", abbr: "EN" },
  { code: "de", name: "Deutsch", abbr: "DE" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          data-testid="button-language-selector"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang?.name}</span>
          <span className="sm:hidden">{currentLang?.abbr}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-accent" : ""}
            data-testid={`menu-item-lang-${lang.code}`}
          >
            <span className="w-8 text-xs font-medium text-muted-foreground">{lang.abbr}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
