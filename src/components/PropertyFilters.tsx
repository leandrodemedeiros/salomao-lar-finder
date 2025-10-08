import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyFilters as PropertyFiltersType } from "@/types/property";

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFiltersType) => void;
}

const ESTADOS_BR = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFiltersType>({
    busca: "",
    metragemMin: undefined,
    metragemMax: undefined,
    precoMin: undefined,
    precoMax: undefined,
    cidade: undefined,
    estado: undefined,
    quartos: undefined,
    tipo: "",
  });

  const handleFilterChange = (key: keyof PropertyFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-40 shadow-card">
      <div className="container mx-auto px-4 py-4">
        {/* Busca Principal */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Buscar imóveis..."
              value={filters.busca}
              onChange={(e) => handleFilterChange("busca", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtros Avançados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Metragem */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Metragem mín (m²)"
              value={filters.metragemMin || ""}
              onChange={(e) => handleFilterChange("metragemMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Metragem máx (m²)"
              value={filters.metragemMax || ""}
              onChange={(e) => handleFilterChange("metragemMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          {/* Preço */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Preço mín (R$)"
              value={filters.precoMin || ""}
              onChange={(e) => handleFilterChange("precoMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Preço máx (R$)"
              value={filters.precoMax || ""}
              onChange={(e) => handleFilterChange("precoMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          {/* Estado e Tipo */}
          <Select value={filters.estado || "all"} onValueChange={(value) => handleFilterChange("estado", value === "all" ? undefined : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {ESTADOS_BR.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Quartos e Tipo */}
          <div className="flex gap-2">
            <Select value={filters.quartos?.toString() || "all"} onValueChange={(value) => handleFilterChange("quartos", value === "all" ? undefined : Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Quartos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}+ quartos
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.tipo || "all"} onValueChange={(value) => handleFilterChange("tipo", value === "all" ? undefined : value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
                <SelectItem value="Casa">Casa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botão Limpar */}
        <div className="mt-3 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              const resetFilters: PropertyFiltersType = {
                busca: "",
                metragemMin: undefined,
                metragemMax: undefined,
                precoMin: undefined,
                precoMax: undefined,
                cidade: undefined,
                estado: undefined,
                quartos: undefined,
                tipo: "",
              };
              setFilters(resetFilters);
              onFiltersChange(resetFilters);
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};
