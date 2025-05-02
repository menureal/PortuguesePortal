import React from 'react';
import { redirect } from 'next/navigation';
import Navigation from "../components/navigation";
import { Card, CardContent } from "../components/ui/card";
import { doctorsData, clinicsData } from "../lib/schema";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import ConfirmForm from './confirm-form';

// Página renderizada pelo servidor usando Server Component
export default function ConfirmAppointmentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse URL parameters
  const doctorId = parseInt(searchParams.doctor as string || "0");
  const clinicId = parseInt(searchParams.clinic as string || "0");
  const dateParam = searchParams.date as string;
  const timeParam = searchParams.time as string || "";

  // Get doctor and clinic data
  const doctor = doctorsData.find(d => d.id === doctorId);
  const clinic = clinicsData.find(c => c.id === clinicId);

  // Parse date if provided
  let formattedDate = "";
  if (dateParam) {
    try {
      const date = parse(dateParam, "yyyy-MM-dd", new Date());
      formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Invalid date format:", error);
    }
  }

  // Redirecionamento se os dados necessários não existirem
  if (!doctor || !clinic) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Confirme o seu agendamento</h2>

            <ConfirmForm 
              doctorId={doctorId}
              doctorName={doctor.name}
              specialty={doctor.specialty}
              crm={doctor.crm}
              clinicName={clinic.name}
              clinicLocation={clinic.location}
              clinicAddress={clinic.address}
              dateParam={dateParam}
              timeParam={timeParam}
              formattedDate={formattedDate}
              doctorPhotoUrl={doctor.photoUrl}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}