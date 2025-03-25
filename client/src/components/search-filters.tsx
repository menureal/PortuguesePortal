import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-8">
      {/* Step 1: Doctor Search */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pesquise pelo Médico</h2>
        <p className="text-gray-600 mb-4">
          Digite o nome do profissional ou escolha uma especialidade. Filtre por localização para encontrar os médicos mais próximos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            className="h-12 text-lg placeholder:text-gray-400"
            placeholder="Nome do médico..."
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <Input
            className="h-12 text-lg placeholder:text-gray-400"
            placeholder="Especialidade..."
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <Input
            className="h-12 text-lg placeholder:text-gray-400"
            placeholder="Localização..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Step 2: Date Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Escolha a Data da Consulta</h2>
        <p className="text-gray-600 mb-4">
          Selecione o dia em que deseja agendar sua consulta. O sistema exibirá apenas os locais onde o médico estará disponível nessa data.
        </p>
        <div className="inline-block bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="rounded-md"
            showOutsideDays={false}
            fixedWeeks
          />
        </div>
      </div>

      {/* Specialties Quick Select */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Especialidades em Destaque:</h3>
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
        className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary/90"
        onClick={() => onSearch({ doctorName, specialty, location, date })}
      >
        <Search className="w-5 h-5 mr-2" />
        Buscar Médicos Disponíveis
      </Button>
    </div>
  );
}