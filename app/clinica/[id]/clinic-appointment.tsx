'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import DateSelector from "../../components/date-selector";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos de props para o componente
interface ClinicAppointmentProps {
  clinic: {
    id: number;
    name: string;
  };
  doctors: Array<{
    id: number;
    name: string;
    specialty: string;
    crm: string;
    photoUrl: string;
    availability: string[];
  }>;
}

export default function ClinicAppointment({ clinic, doctors }: ClinicAppointmentProps) {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock available times
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Doctors List */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-semibold mb-6">Médicos</h2>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Card 
              key={doctor.id} 
              className={`cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-primary text-sm">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">CRM: {doctor.crm}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Scheduling Section */}
      {selectedDoctor && (
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Agende a sua consulta</h2>

              {/* Doctor Details */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <img 
                    src={selectedDoctor.photoUrl}
                    alt={selectedDoctor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                    <p className="text-gray-600">{selectedDoctor.specialty}</p>
                    <p className="text-gray-600 text-sm">CRM: {selectedDoctor.crm}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Disponível em: {selectedDoctor.availability?.join(", ") || "Não disponível"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Selecione uma data:</h4>
                <div className="p-4 rounded-md border mb-6">
                  <DateSelector
                    onDateSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    selectedDate={selectedDate}
                  />
                </div>
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

              {/* Patient Information */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Informações do Paciente</h4>
                <div className="grid gap-4">
                  <Input placeholder="Nome completo" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Contato" />
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                disabled={!selectedDate || !selectedTime}
                onClick={() => {
                  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
                  router.push(`/confirmar-agendamento?doctor=${selectedDoctor.id}&clinic=${clinic.id}&date=${formattedDate}&time=${selectedTime}`);
                }}
              >
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}