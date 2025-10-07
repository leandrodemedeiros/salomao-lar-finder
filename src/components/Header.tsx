import { Building2, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Salomão Imóveis</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
