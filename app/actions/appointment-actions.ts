'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Definição do schema para validação
const appointmentSchema = z.object({
  patientName: z.string().min(3, { message: 'Nome do paciente deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(7, { message: 'Telefone inválido' }),
  specialty: z.string().min(1, { message: 'Especialidade é obrigatória' }),
  location: z.string().min(1, { message: 'Localização é obrigatória' }),
  provider: z.string().min(1, { message: 'Médico é obrigatório' }),
  date: z.string().transform(val => new Date(val)),
});

// In-memory storage para agendamentos
const appointments = new Map<number, any>();
let currentId = 1;

/**
 * Server Action para criar um novo agendamento
 */
export async function createAppointment(formData: FormData) {
  // Converter FormData para objeto
  const rawData = Object.fromEntries(formData.entries());
  
  try {
    // Validar dados
    const validatedData = appointmentSchema.parse({
      patientName: rawData.patientName,
      email: rawData.email,
      phone: rawData.phone,
      specialty: rawData.specialty,
      location: rawData.location,
      provider: rawData.provider,
      date: rawData.date
    });
    
    // Criar agendamento
    const id = currentId++;
    const appointment = {
      ...validatedData,
      id,
      status: "pending"
    };
    
    // Salvar na memória
    appointments.set(id, appointment);
    
    // Revalidar rotas que podem exibir agendamentos
    revalidatePath('/confirmar-agendamento');
    
    return { success: true, data: appointment };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Retornar erros de validação
      const formattedErrors = error.errors.reduce((acc, curr) => {
        const field = curr.path[0];
        acc[String(field)] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return { success: false, errors: formattedErrors };
    }
    
    // Erro genérico
    return { success: false, message: 'Ocorreu um erro ao agendar sua consulta' };
  }
}

/**
 * Server Action para obter todos os agendamentos
 */
export async function getAppointments() {
  try {
    return { 
      success: true,
      data: Array.from(appointments.values())
    };
  } catch (error) {
    return { 
      success: false, 
      message: 'Falha ao buscar agendamentos'
    };
  }
}

/**
 * Server Action para obter um agendamento específico
 */
export async function getAppointmentById(id: number) {
  try {
    const appointment = appointments.get(id);
    
    if (!appointment) {
      return { success: false, message: 'Agendamento não encontrado' };
    }
    
    return { success: true, data: appointment };
  } catch (error) {
    return { success: false, message: 'Falha ao buscar agendamento' };
  }
}