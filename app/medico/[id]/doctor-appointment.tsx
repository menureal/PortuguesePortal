'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import DateSelector from "../../components/date-selector";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { doctorsData, clinicsData } from "../../lib/schema";
import { useAvailability } from '../../hooks/use-availability';

interface DoctorAppointmentProps {
  doctorId: number;
  clinicId: number;
}

// Client Component para agendamento de consulta com médico
export default function DoctorAppointment({ doctorId, clinicId }: DoctorAppointmentProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Buscar dados do médico e clínica (pode ser redundante, mas deixa o componente mais independente)
  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = clinicsData.find(c => c.id === clinicId);
  
  // Usar o hook de disponibilidade em tempo real
  const { availabilityStatus, isConnected } = useAvailability(doctorId, selectedDate);

  // Mock available times - seria substituído por dados reais da API
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  // Verifica se um horário está disponível
  const isTimeAvailable = (time: string) => {
    // Se não tivermos informações de disponibilidade, assumimos que está disponível
    return availabilityStatus[time] !== false;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Agende sua Consulta</h2>

        {/* Indicador de status do WebSocket */}
        <div className="mb-4 flex items-center">
          <span 
            className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="text-sm text-gray-500">
            {isConnected ? 'Conectado: Disponibilidade em tempo real' : 'Desconectado: Disponibilidade pode não estar atualizada'}
          </span>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                  disabled={!isTimeAvailable(time)}
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
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Nome completo" className="w-full" />
            <Input type="email" placeholder="Email" className="w-full" />
            <Input placeholder="Contato" className="w-full sm:col-span-2" />
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h4 className="font-medium">Pagamento</h4>
          <div className="grid gap-4">
            <Input placeholder="Número do Cartão" className="w-full" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Data Validade" className="w-full" />
              <Input placeholder="CCV" className="w-full" />
            </div>
          </div>
        </div>

        <Button 
          className="w-full mt-6" 
          disabled={!selectedDate || !selectedTime}
          onClick={() => {
            if (doctor && clinic) {
              const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
              router.push(`/confirmar-agendamento?doctor=${doctor.id}&clinic=${clinic.id}&date=${formattedDate}&time=${selectedTime}`);
            }
          }}
        >
          Confirmar Agendamento
        </Button>
      </CardContent>
    </Card>
  );
}