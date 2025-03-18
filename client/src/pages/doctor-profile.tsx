import { Navigation } from "@/components/navigation";
import { useRoute } from "wouter";
import { doctorsData, clinicsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRealTimeAvailability } from "@/hooks/useRealTimeAvailability";

export default function DoctorProfilePage() {
  const [, params] = useRoute("/medico/:id");
  const doctorId = params?.id ? parseInt(params.id) : null;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = doctor ? clinicsData.find(c => c.id === doctor.clinicId) : null;

  const { availableTimes, isConnected } = useRealTimeAvailability(doctorId || 0, selectedDate.toISOString());

  if (!doctor || !clinic) {
    return <div>Médico não encontrado</div>;
  }

  const currentMonth = selectedDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card>
              <div className="aspect-square relative">
                <img 
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-semibold mb-2">{doctor.name}</h1>
                <div className="space-y-3">
                  <p className="text-primary font-medium">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm">CRM: {doctor.crm}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p className="font-medium">Disponível em:</p>
                    <p>{doctor.availability.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinic Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Local da Consulta</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{clinic.name}</p>
                    <p className="text-gray-600">{clinic.address}</p>
                  </div>
                  <div className="text-gray-600">
                    <p>Horário de Funcionamento:</p>
                    <p>{clinic.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduling Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Agende sua Consulta</h2>

                {/* Calendar Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">&lt;</button>
                    <h3 className="text-lg font-medium">{currentMonth}</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-full">&gt;</button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
                      <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                    ))}
                  </div>

                  {/* Calendar Grid - To be replaced with real calendar component */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => (
                      <button
                        key={i + 1}
                        className={`p-2 rounded-full hover:bg-primary/10 ${
                          selectedDate.getDate() === i + 1 ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                          const newDate = new Date(selectedDate);
                          newDate.setDate(i + 1);
                          setSelectedDate(newDate);
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Horários Disponíveis:</h3>
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

                <Button 
                  className="w-full mt-6" 
                  disabled={!selectedTime}
                  onClick={() => {
                    window.location.href = `/confirmar-agendamento?doctor=${doctor.id}&clinic=${clinic.id}&time=${selectedTime}&date=${selectedDate.toISOString()}`;
                  }}
                >
                  Confirmar Agendamento
                </Button>

                {!isConnected && (
                  <p className="text-sm text-red-500 mt-2">
                    Verificando disponibilidade em tempo real...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}