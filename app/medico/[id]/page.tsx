import React from 'react';
import { notFound } from 'next/navigation';
import Navigation from "../../components/navigation";
import { doctorsData, clinicsData } from "../../lib/schema";
import { Card, CardContent } from "../../components/ui/card";
import { Star, Clock, Building2, Phone } from "lucide-react";
import DoctorAppointment from './doctor-appointment';

interface DoctorProfilePageProps {
  params: { id: string }
}

// Server Component para a página de perfil do médico
export default function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const doctorId = parseInt(params.id);
  
  // Buscar dados do médico e clínica
  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = doctor ? clinicsData.find(c => c.id === doctor.clinicId) : null;

  // Usar notFound do Next.js para lidar com médicos inexistentes
  if (!doctor || !clinic) {
    notFound();
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

          {/* Scheduling Section - Client Component */}
          <div className="lg:col-span-2">
            <DoctorAppointment doctorId={doctor.id} clinicId={clinic.id} />
          </div>
        </div>
      </main>
    </div>
  );
}