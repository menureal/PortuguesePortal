'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from "../../components/navigation";
import { clinicsData, doctorsData } from "../../lib/schema";
import { Card, CardContent } from "../../components/ui/card";
import { Building2, Star, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ClinicDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const clinicId = params?.id ? parseInt(params.id as string) : null;
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const clinic = clinicsData.find(c => c.id === clinicId);
  const clinicDoctors = doctorsData.filter(d => d.clinicId === clinicId);

  // Mock available times
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  if (!clinic) {
    return <div>Clínica não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clinic Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{clinic.name}</h1>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{clinic.location}</p>
                      <p className="text-sm">{clinic.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{clinic.type}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current flex-shrink-0" />
                    <span>{clinic.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{clinic.phone}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{clinic.hours}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Especialidades:</h3>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={clinic.photoUrl}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-gray-600">{clinic.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List and Scheduling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Médicos</h2>
            <div className="space-y-4">
              {clinicDoctors.map((doctor) => (
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

                  {/* Time Selection */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Horários Disponíveis:</h4>
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
                    disabled={!selectedTime}
                    onClick={() => {
                      router.push(`/confirmar-agendamento?doctor=${selectedDoctor.id}&clinic=${clinic.id}&time=${selectedTime}`);
                    }}
                  >
                    Confirmar Agendamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}