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
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          className="flex-1 h-12 text-lg placeholder:text-gray-400"
          placeholder="Nome ou especialidade..."
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Input
          className="flex-1 h-12 text-lg placeholder:text-gray-400"
          placeholder="Cidade"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button 
          className="h-12 px-8 text-lg bg-primary hover:bg-primary/90"
          onClick={() => onSearch({ specialty, location })}
        >
          <Search className="w-5 h-5 mr-2" />
          Pesquisar
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {specialties.map((spec) => (
          <Button
            key={spec}
            variant="outline"
            size="sm"
            onClick={() => setSpecialty(spec)}
            className={`
              ${specialty === spec ? "bg-primary/10 border-primary" : "hover:bg-primary/5"}
              transition-colors duration-200
            `}
          >
            {spec}
          </Button>
        ))}
      </div>
    </div>
  );
}