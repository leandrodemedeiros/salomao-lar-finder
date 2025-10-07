import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { AdSpace } from "@/components/AdSpace";
import { CountdownModal } from "@/components/CountdownModal";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFiltersType>({
    busca: "",
  });
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [loadCount, setLoadCount] = useState(20);

  // Carregar propriedades iniciais
  useEffect(() => {
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...properties];

    // Filtro de busca
    if (filters.busca) {
      const searchLower = filters.busca.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.titulo.toLowerCase().includes(searchLower) ||
          p.cidade.toLowerCase().includes(searchLower) ||
          p.estado.toLowerCase().includes(searchLower)
      );
    }

    // Filtros de metragem
    if (filters.metragemMin) {
      filtered = filtered.filter((p) => p.metragem >= filters.metragemMin!);
    }
    if (filters.metragemMax) {
      filtered = filtered.filter((p) => p.metragem <= filters.metragemMax!);
    }

    // Filtros de preço
    if (filters.precoMin) {
      filtered = filtered.filter((p) => p.preco >= filters.precoMin!);
    }
    if (filters.precoMax) {
      filtered = filtered.filter((p) => p.preco <= filters.precoMax!);
    }

    // Filtro de estado
    if (filters.estado) {
      filtered = filtered.filter((p) => p.estado === filters.estado);
    }

    // Filtro de quartos
    if (filters.quartos) {
      filtered = filtered.filter((p) => p.quartos >= filters.quartos!);
    }

    // Filtro de tipo
    if (filters.tipo) {
      filtered = filtered.filter((p) => p.tipo === filters.tipo);
    }

    setFilteredProperties(filtered);
    setLoadCount(20);
  }, [filters, properties]);

  // Atualizar propriedades exibidas
  useEffect(() => {
    setDisplayedProperties(filteredProperties.slice(0, loadCount));
  }, [filteredProperties, loadCount]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
        loadCount < filteredProperties.length
      ) {
        setLoadCount((prev) => Math.min(prev + 5, filteredProperties.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadCount, filteredProperties.length]);

  const handleViewOriginal = (url: string) => {
    setRedirectUrl(url);
    setShowCountdown(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <AdSpace className="container mx-auto px-4 mt-6 h-32" />
      
      <PropertyFilters onFiltersChange={setFilters} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {displayedProperties.map((property, index) => (
            <div key={property.id}>
              <PropertyCard property={property} onViewOriginal={handleViewOriginal} />
              
              {/* Ad space a cada 8 anúncios */}
              {(index + 1) % 8 === 0 && index < displayedProperties.length - 1 && (
                <AdSpace className="my-6 h-32" />
              )}
            </div>
          ))}

          {displayedProperties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum imóvel encontrado com os filtros selecionados.
              </p>
            </div>
          )}

          {loadCount < filteredProperties.length && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando mais imóveis...</p>
            </div>
          )}
        </div>
      </main>

      <CountdownModal
        isOpen={showCountdown}
        onClose={() => setShowCountdown(false)}
        targetUrl={redirectUrl}
      />
    </div>
  );
};

export default Index;
