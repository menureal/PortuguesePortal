import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { doctorsData, clinicsData } from "@shared/schema";
import { useLocation } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [location] = useLocation();

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const doctorId = parseInt(searchParams.get("doctor") || "0");
  const clinicId = parseInt(searchParams.get("clinic") || "0");

  // Get doctor and clinic data
  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = clinicsData.find(c => c.id === clinicId);

  // Mock available times
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  if (!doctor || !clinic) {
    return <div>Médico ou clínica não encontrado</div>;
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img 
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-gray-600 mb-1">{doctor.specialty}</p>
              <p className="text-gray-600 mb-1">CRM: {doctor.crm}</p>
              <p className="text-gray-600 mb-4">{clinic.name}</p>

              <div className="text-sm text-gray-500">
                <p className="font-semibold">Disponível em:</p>
                <p>{doctor.availability.join(", ")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Scheduling */}
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Agende a sua consulta</h3>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Selecione uma data:</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    Horários Disponíveis para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}:
                  </h4>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation Button */}
              <Button 
                className="w-full"
                disabled={!selectedDate || !selectedTime}
                onClick={() => {
                  const formattedDate = format(selectedDate!, "yyyy-MM-dd");
                  window.location.href = `/confirmar-agendamento?doctor=${doctorId}&clinic=${clinicId}&date=${formattedDate}&time=${selectedTime}`;
                }}
              >
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}