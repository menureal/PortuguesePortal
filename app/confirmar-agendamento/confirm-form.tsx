'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createAppointment } from '../actions/appointment-actions';

interface ConfirmFormProps {
  doctorId: number;
  doctorName: string;
  specialty: string;
  crm: string;
  clinicName: string;
  clinicLocation: string;
  clinicAddress: string;
  dateParam: string;
  timeParam: string;
  formattedDate: string;
  doctorPhotoUrl: string;
}

export default function ConfirmForm({
  doctorId,
  doctorName,
  specialty,
  crm,
  clinicName,
  clinicLocation,
  clinicAddress,
  dateParam,
  timeParam,
  formattedDate,
  doctorPhotoUrl
}: ConfirmFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      // Criar um FormData para enviar para a Server Action
      const formData = new FormData();
      formData.append('patientName', patientName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('specialty', specialty);
      formData.append('location', clinicLocation);
      formData.append('provider', doctorName);
      
      // Formatar a data para envio
      const date = dateParam ? new Date(dateParam + 'T' + timeParam) : new Date();
      formData.append('date', date.toISOString());
      
      // Chamar a Server Action
      const result = await createAppointment(formData);

      if (!result.success) {
        if (result.errors) {
          // Se houver erros de validação específicos
          const errorMessage = Object.values(result.errors).join(', ');
          setError(errorMessage);
        } else {
          // Erro genérico
          setError(result.message || 'Erro ao processar o agendamento');
        }
        return;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Left column - Doctor and Appointment Info */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={doctorPhotoUrl}
              alt={doctorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{doctorName}</h3>
            <p className="text-gray-600">{specialty}</p>
            <p className="text-gray-600">CRM: {crm}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Consulta</h4>
          <p className="text-gray-600">{clinicName}</p>
          <p className="text-gray-600">{clinicAddress}, {clinicLocation}</p>
          <p className="text-gray-600 mt-2">
            Data: {formattedDate} às {timeParam}
          </p>
        </div>
      </div>

      {/* Right column - Patient & Payment Info */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="submit"
          className="w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Finalizar Agendamento"}
        </Button>
      </form>
    </div>
  );
}