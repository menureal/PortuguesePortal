'use client';

import React, { useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

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

  const handleConfirmAppointment = async () => {
    // Validar campos
    if (!patientName || !email || !phone || !cardNumber || !expiryDate || !cvv) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Formatar a data para envio
      const date = dateParam ? new Date(dateParam + 'T' + timeParam) : new Date();
      
      // Dados do agendamento
      const appointmentData = {
        patientName,
        email,
        phone,
        specialty: doctor.specialty,
        location: clinic.location,
        provider: doctor.name,
        date: date.toISOString(),
      };

      // Enviar para a API
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o agendamento. Por favor, tente novamente.');
      }

      // Sucesso
      alert("Agendamento confirmado com sucesso!");
      router.push("/");
    } catch (err) {
      console.error('Erro:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar o agendamento.');
    } finally {
      setIsSubmitting(false);
    }
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
                    <Input 
                      placeholder="Nome completo" 
                      value={patientName} 
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input 
                      placeholder="Contato" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Pagamento</h4>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Número do Cartão" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input 
                        placeholder="Data Validade" 
                        value={expiryDate} 
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                      <Input 
                        placeholder="CCV" 
                        value={cvv} 
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
                    {error}
                  </div>
                )}

                <Button 
                  className="w-full mt-6"
                  onClick={handleConfirmAppointment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Finalizar Agendamento"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}