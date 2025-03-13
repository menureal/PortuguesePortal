import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: {
    specialty: string;
    location: string;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          className="flex-1"
          placeholder="Nome ou especialidade..."
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Input
          className="flex-1"
          placeholder="Cidade"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => onSearch({ specialty, location })}
        >
          <Search className="w-4 h-4 mr-2" />
          Pesquisar
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {specialties.map((spec) => (
          <Button
            key={spec}
            variant="outline"
            size="sm"
            onClick={() => setSpecialty(spec)}
            className={specialty === spec ? "bg-primary/10" : ""}
          >
            {spec}
          </Button>
        ))}
      </div>
    </div>
  );
}