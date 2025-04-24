'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from "../../components/navigation";
import { doctorsData, clinicsData } from "../../lib/schema";
import { Card, CardContent } from "../../components/ui/card";
import { Star, Clock, Building2, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.id ? parseInt(params.id as string) : null;
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = doctor ? clinicsData.find(c => c.id === doctor.clinicId) : null;

  // Mock available times
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  if (!doctor || !clinic) {
    return <div>Médico não encontrado</div>;
  }

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
                <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
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
                <h2 className="text-xl font-semibold mb-4">Local de Atendimento</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{clinic.name}</p>
                      <p className="text-sm">{clinic.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{clinic.phone}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
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

                {/* Time Selection */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Horários Disponíveis:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                  disabled={!selectedTime}
                  onClick={() => {
                    router.push(`/confirmar-agendamento?doctor=${doctor.id}&clinic=${clinic.id}&time=${selectedTime}`);
                  }}
                >
                  Confirmar Agendamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}