import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Ruler, Bed, Home, ExternalLink } from "lucide-react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PropertyCardProps {
  property: Property;
  onViewOriginal: (url: string) => void;
}

export const PropertyCard = ({ property, onViewOriginal }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-lg transition-smooth">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Carrossel de Imagens */}
        <div className="relative aspect-[4/3] bg-muted">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.titulo} - Imagem ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>

        {/* Detalhes do Imóvel */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                {property.titulo}
              </h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {property.fonte}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Localização:</strong> {property.cidade} - {property.estado}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Ruler className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Metragem:</strong> {property.metragem} m²
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Bed className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Quartos:</strong> {property.quartos}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Home className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Tipo:</strong> {property.tipo}
                </span>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(property.preco)}
                </p>
                <p className="text-xs text-muted-foreground">Preço</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onViewOriginal(property.urlOriginal)}
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Anúncio Original
          </Button>
        </div>
      </div>
    </Card>
  );
};
