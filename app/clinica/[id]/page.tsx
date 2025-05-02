import React from 'react';
import { notFound } from 'next/navigation';
import Navigation from "../../components/navigation";
import { clinicsData, doctorsData } from "../../lib/schema";
import { Card, CardContent } from "../../components/ui/card";
import { Building2, Star, Phone, Clock, MapPin } from "lucide-react";
import ClinicAppointment from './clinic-appointment';

interface ClinicDetailsPageProps {
  params: { id: string }
}

// Página agora usa Server Component
export default function ClinicDetailsPage({ params }: ClinicDetailsPageProps) {
  const clinicId = parseInt(params.id);
  
  // Buscar dados da clínica e médicos associados
  const clinic = clinicsData.find(c => c.id === clinicId);
  const clinicDoctors = doctorsData.filter(d => d.clinicId === clinicId);

  // Usar notFound do Next.js para lidar com clínicas inexistentes
  if (!clinic) {
    notFound();
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

        {/* Componente client para agendamento */}
        <ClinicAppointment clinic={clinic} doctors={clinicDoctors} />
      </main>
    </div>
  );
}