import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [day, setDay] = useState<string>("1");
  const [month, setMonth] = useState<string>("3"); // March
  const [year, setYear] = useState<string>("2025");

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = ["2025", "2026", "2027"];

  // Get formatted month name
  const getMonthName = (monthNumber: string) => {
    return format(new Date(2025, parseInt(monthNumber) - 1), "MMMM", { locale: ptBR });
  };

  // Create valid date object
  const getSelectedDate = () => {
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
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
          <div className="flex items-center gap-2">
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Dia" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {getMonthName(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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