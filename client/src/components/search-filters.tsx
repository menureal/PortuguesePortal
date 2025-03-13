import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { specialties, locations } from "@shared/schema";

interface SearchFiltersProps {
  onSearch: (filters: {
    location: string;
    specialty: string;
    provider: string;
    date: Date | undefined;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [provider, setProvider] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
      <div>
        <Label>Localização</Label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione local" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Especialidade</Label>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione especialidade" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Prestador de Serviço</Label>
        <Input 
          placeholder="Nome do médico"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />
      </div>

      <div>
        <Label>Data</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PP") : <span>Escolha uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        className="col-span-1 md:col-span-4"
        onClick={() => onSearch({ location, specialty, provider, date })}
      >
        Pesquisar
      </Button>
    </div>
  );
}
