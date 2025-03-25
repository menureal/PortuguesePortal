import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { specialties } from "@shared/schema";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Generate dates for the current month
  const generateMonthDates = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const dates = [];
    for (let i = 0; i < 31; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      if (date.getMonth() === currentMonth.getMonth()) {
        dates.push(date);
      }
    }
    return dates;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Encontre os melhores profissionais de saúde da sua região</h2>
      <p className="text-gray-600 mb-6">
        Agende sua consulta de forma rápida e segura com os melhores especialistas
      </p>

      {/* Search Section */}
      <div className="space-y-6">
        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Nome do médico..."
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="h-12"
          />
          <Input
            placeholder="Especialidade..."
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="h-12"
          />
          <Input
            placeholder="Localização..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12"
          />
        </div>

        {/* Date Selection */}
        <div>
          <h3 className="text-sm font-medium mb-2">Escolha a Data da Consulta</h3>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {generateMonthDates().map((date) => (
                <Button
                  key={date.toISOString()}
                  variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                  className="min-w-[4rem] h-16 flex flex-col items-center justify-center p-1"
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-xs">{format(date, "EEE", { locale: ptBR })}</span>
                  <span className="text-lg">{format(date, "d")}</span>
                </Button>
              ))}
            </div>
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