import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: {
    doctorName: string;
    specialty: string;
    location: string;
    date?: Date;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  // Date selection state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2025");

  // Validate and create date object
  const getSelectedDate = () => {
    const d = parseInt(day);
    const m = parseInt(month) - 1; // JS months are 0-based
    const y = parseInt(year);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return undefined;

    const date = new Date(y, m, d);
    // Check if date is valid
    if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) {
      return undefined;
    }
    return date;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Pesquise pelo Médico</h2>
        <p className="text-gray-600 mt-2">
          Digite o nome do profissional ou escolha uma especialidade. Filtre por localização para encontrar os médicos mais próximos.
        </p>
      </div>

      <div className="space-y-4">
        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Nome do médico..."
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <Input
            placeholder="Especialidade..."
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <Input
            placeholder="Localização..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Date Selection */}
        <div>
          <h3 className="text-sm font-medium mb-2">Escolha a Data da Consulta</h3>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Dia"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              min="1"
              max="31"
              className="w-20"
            />
            <span>/</span>
            <Input
              type="number"
              placeholder="Mês"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="w-20"
            />
            <span>/</span>
            <Input
              type="number"
              placeholder="Ano"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="2025"
              max="2027"
              className="w-24"
            />
          </div>
        </div>

        {/* Specialties */}
        <div>
          <h3 className="text-sm font-medium mb-2">Especialidades em Destaque:</h3>
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

        {/* Search Button */}
        <Button 
          className="w-full md:w-auto h-12 px-8"
          onClick={() => onSearch({ 
            doctorName, 
            specialty, 
            location, 
            date: getSelectedDate()
          })}
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar Médicos Disponíveis
        </Button>
      </div>
    </div>
  );
}