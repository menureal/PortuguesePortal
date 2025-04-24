'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navigation from "../components/navigation";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { doctorsData, clinicsData } from "../lib/schema";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ConfirmAppointmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse URL parameters
  const doctorId = parseInt(searchParams.get("doctor") || "0");
  const clinicId = parseInt(searchParams.get("clinic") || "0");
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time") || "";

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

  if (!doctor || !clinic) {
    return <div>Informações da consulta não encontradas</div>;
  }

  const handleConfirmAppointment = () => {
    // Aqui seria implementada a lógica para salvar o agendamento
    alert("Agendamento confirmado com sucesso!");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Confirme o seu agendamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left column - Doctor and Appointment Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-gray-600">CRM: {doctor.crm}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Consulta</h4>
                  <p className="text-gray-600">{clinic.name}</p>
                  <p className="text-gray-600">{clinic.address}, {clinic.location}</p>
                  <p className="text-gray-600 mt-2">
                    Data: {formattedDate} às {timeParam}
                  </p>
                </div>
              </div>

              {/* Right column - Payment Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Informações do Paciente</h4>
                  <div className="space-y-3">
                    <Input placeholder="Nome completo" />
                    <Input type="email" placeholder="Email" />
                    <Input placeholder="Contato" />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Pagamento</h4>
                  <div className="space-y-3">
                    <Input placeholder="Número do Cartão" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Data Validade" />
                      <Input placeholder="CCV" />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={handleConfirmAppointment}
                >
                  Finalizar Agendamento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}