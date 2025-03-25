import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
          <div className="flex flex-wrap gap-2">
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return (
                <Button
                  key={i}
                  variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                  onClick={() => setSelectedDate(date)}
                  className="flex-1 min-w-[100px] max-w-[150px] h-auto py-2"
                >
                  <div className="text-center">
                    <div className="text-xs uppercase">
                      {format(date, "EEE", { locale: ptBR })}
                    </div>
                    <div className="text-lg font-semibold">
                      {format(date, "dd")}
                    </div>
                    <div className="text-xs">
                      {format(date, "MMM", { locale: ptBR })}
                    </div>
                  </div>
                </Button>
              );
            })}
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
          onClick={() => onSearch({ doctorName, specialty, location, date: selectedDate })}
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar Médicos Disponíveis
        </Button>
      </div>
    </div>
  );
}