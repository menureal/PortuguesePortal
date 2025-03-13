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

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Carlos Silva",
    specialty: "Cardiologia",
    location: "Hospital Central",
    crm: "12345-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 2,
    name: "Dra. Ana Santos",
    specialty: "Dermatologia",
    location: "Clínica Sul",
    crm: "23456-SP",
    rating: 4.9,
    availability: ["Terça", "Quinta"]
  },
  {
    id: 3,
    name: "Dr. Roberto Oliveira",
    specialty: "Neurologia",
    location: "Centro Médico Norte",
    crm: "34567-SP",
    rating: 4.7,
    availability: ["Segunda", "Quinta", "Sexta"]
  },
  {
    id: 4,
    name: "Dra. Patrícia Lima",
    specialty: "Pediatria",
    location: "Policlínica Leste",
    crm: "45678-SP",
    rating: 5.0,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 5,
    name: "Dr. Marcos Souza",
    specialty: "Ortopedia",
    location: "Hospital Central",
    crm: "56789-SP",
    rating: 4.6,
    availability: ["Terça", "Quinta"]
  },
  {
    id: 6,
    name: "Dra. Luciana Costa",
    specialty: "Oftalmologia",
    location: "Clínica Sul",
    crm: "67890-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta"]
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