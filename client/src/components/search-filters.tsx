import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

interface SearchFiltersProps {
  onSearch: (filters: {
    specialty: string;
    location: string;
    date?: Date;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Search Fields */}
        <div className="space-y-4">
          <Input
            className="h-12 text-lg placeholder:text-gray-400"
            placeholder="Especialidade..."
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <Input
            className="h-12 text-lg placeholder:text-gray-400"
            placeholder="Nome do médico..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90"
            onClick={() => onSearch({ specialty, location, date })}
          >
            <Search className="w-5 h-5 mr-2" />
            Pesquisar
          </Button>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="rounded-md"
          />
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2">
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