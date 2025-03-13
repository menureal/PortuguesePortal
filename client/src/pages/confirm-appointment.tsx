import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doctorsData } from "@shared/schema";

export default function ConfirmAppointmentPage() {
  // Mock data for demonstration
  const appointment = {
    doctor: doctorsData[0],
    clinic: "Clínica de Fisioterapia, São José, Lda",
    address: "Achada Santo António, Praia, Santiago, Cabo Verde",
    date: "12 Agosto 2024",
    time: "14:20"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Agende a sua consulta</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left column - Doctor and Appointment Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3"
                      alt={appointment.doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.doctor.name}</h3>
                    <p className="text-gray-600">{appointment.doctor.specialty}</p>
                    <p className="text-gray-600">CRM: {appointment.doctor.crm}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Consulta</h4>
                  <p className="text-gray-600">{appointment.clinic}</p>
                  <p className="text-gray-600">{appointment.address}</p>
                  <p className="text-gray-600 mt-2">
                    Data: {appointment.date} às {appointment.time}
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

                <Button className="w-full mt-6">
                  Confirmar Agendamento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
