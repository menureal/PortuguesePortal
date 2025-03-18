import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const specialties = [
  "Cardiologia",
  "Dermatologia", 
  "Neurologia",
  "Pediatria",
  "Ortopedia",
  "Oftalmologia"
] as const;

export const locations = [
  "Hospital Central",
  "Clínica Sul",
  "Centro Médico Norte",
  "Policlínica Leste"
] as const;

export type Specialty = typeof specialties[number];
export type Location = typeof locations[number];

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Carlos Silva",
    specialty: "Cardiologia" as Specialty,
    location: "Hospital Central" as Location,
    clinicId: 1,
    crm: "12345-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 2,
    name: "Dra. Ana Santos",
    specialty: "Dermatologia" as Specialty,
    location: "Clínica Sul" as Location,
    clinicId: 2,
    crm: "23456-SP",
    rating: 4.9,
    availability: ["Terça", "Quinta"]
  },
  {
    id: 3,
    name: "Dr. Roberto Oliveira",
    specialty: "Neurologia" as Specialty,
    location: "Centro Médico Norte" as Location,
    clinicId: 3,
    crm: "34567-SP",
    rating: 4.7,
    availability: ["Segunda", "Quinta", "Sexta"]
  },
  {
    id: 4,
    name: "Dra. Patrícia Lima",
    specialty: "Pediatria" as Specialty,
    location: "Policlínica Leste" as Location,
    clinicId: 4,
    crm: "45678-SP",
    rating: 5.0,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 5,
    name: "Dr. Marcos Souza",
    specialty: "Ortopedia" as Specialty,
    location: "Hospital Central" as Location,
    clinicId: 1,
    crm: "56789-SP",
    rating: 4.6,
    availability: ["Terça", "Quinta"]
  },
  {
    id: 6,
    name: "Dra. Luciana Costa",
    specialty: "Oftalmologia" as Specialty,
    location: "Clínica Sul" as Location,
    clinicId: 2,
    crm: "67890-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta"]
  }
] as const;

export const clinicsData = [
  {
    id: 1,
    name: "Medical Services Lab",
    location: "Hospital Central" as Location,
    address: "Rua Santa Maria, 123",
    specialties: ["Cardiologia", "Ortopedia"] as Specialty[],
    rating: 4.8,
    phone: "(11) 3456-7890",
    hours: "Segunda à Sexta: 7h às 19h"
  },
  {
    id: 2,
    name: "Clínica Saúde Total",
    location: "Clínica Sul" as Location,
    address: "Av. das Flores, 456",
    specialties: ["Dermatologia", "Oftalmologia"] as Specialty[],
    rating: 4.9,
    phone: "(11) 2345-6789",
    hours: "Segunda à Sábado: 8h às 20h"
  },
  {
    id: 3,
    name: "Centro Médico Vida",
    location: "Centro Médico Norte" as Location,
    address: "Rua dos Pinheiros, 789",
    specialties: ["Neurologia", "Pediatria"] as Specialty[],
    rating: 4.7,
    phone: "(11) 4567-8901",
    hours: "Segunda à Sexta: 8h às 18h"
  },
  {
    id: 4,
    name: "Policlínica Bem Estar",
    location: "Policlínica Leste" as Location,
    address: "Av. Principal, 1010",
    specialties: ["Pediatria", "Cardiologia"] as Specialty[],
    rating: 4.6,
    phone: "(11) 5678-9012",
    hours: "Segunda à Sábado: 7h às 22h"
  }
] as const;

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  specialty: text("specialty").notNull(),
  location: text("location").notNull(),
  provider: text("provider").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").default("pending").notNull()
});

export const appointmentSchema = createInsertSchema(appointments, {
  patientName: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(9).max(20),
  specialty: z.enum(specialties),
  location: z.enum(locations),
  provider: z.string().min(3).max(100),
  date: z.coerce.date().min(new Date())
}).omit({ id: true, status: true });

export type InsertAppointment = z.infer<typeof appointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;