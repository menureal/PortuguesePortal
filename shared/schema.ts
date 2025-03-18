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

// URLs fixas das fotos dos médicos
const doctorImages = {
  dr_carlos: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
  dra_ana: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
  dr_roberto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
  dra_patricia: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3",
  dr_marcos: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3",
  dra_luciana: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3"
};

// URLs fixas das fotos das clínicas
const clinicImages = {
  medical_services: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
  saude_total: "https://images.unsplash.com/photo-1516549655669-df71cbe43110?ixlib=rb-4.0.3",
  centro_medico: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
  policlinica: "https://images.unsplash.com/photo-1626315869436-d6989fea3524?ixlib=rb-4.0.3"
};

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Carlos Silva",
    specialty: "Cardiologia" as Specialty,
    location: "Hospital Central" as Location,
    clinicId: 1,
    crm: "12345-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_carlos,
    description: "Especialista em Cardiologia com mais de 15 anos de experiência"
  },
  {
    id: 2,
    name: "Dra. Ana Santos",
    specialty: "Dermatologia" as Specialty,
    location: "Clínica Sul" as Location,
    clinicId: 2,
    crm: "23456-SP",
    rating: 4.9,
    availability: ["Terça", "Quinta"],
    photoUrl: doctorImages.dra_ana,
    description: "Dermatologista especializada em tratamentos estéticos e clínicos"
  },
  {
    id: 3,
    name: "Dr. Roberto Oliveira",
    specialty: "Neurologia" as Specialty,
    location: "Centro Médico Norte" as Location,
    clinicId: 3,
    crm: "34567-SP",
    rating: 4.7,
    availability: ["Segunda", "Quinta", "Sexta"],
    photoUrl: doctorImages.dr_roberto,
    description: "Neurologista com foco em diagnóstico e tratamento de doenças neurológicas"
  },
  {
    id: 4,
    name: "Dra. Patrícia Lima",
    specialty: "Pediatria" as Specialty,
    location: "Policlínica Leste" as Location,
    clinicId: 4,
    crm: "45678-SP",
    rating: 5.0,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dra_patricia,
    description: "Pediatra dedicada ao cuidado integral da saúde infantil"
  },
  {
    id: 5,
    name: "Dr. Marcos Souza",
    specialty: "Ortopedia" as Specialty,
    location: "Hospital Central" as Location,
    clinicId: 1,
    crm: "56789-SP",
    rating: 4.6,
    availability: ["Terça", "Quinta"],
    photoUrl: doctorImages.dr_marcos,
    description: "Ortopedista especializado em traumatologia e medicina esportiva"
  },
  {
    id: 6,
    name: "Dra. Luciana Costa",
    specialty: "Oftalmologia" as Specialty,
    location: "Clínica Sul" as Location,
    clinicId: 2,
    crm: "67890-SP",
    rating: 4.8,
    availability: ["Segunda", "Quarta"],
    photoUrl: doctorImages.dra_luciana,
    description: "Oftalmologista com experiência em cirurgias e tratamentos oculares"
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
    hours: "Segunda à Sexta: 7h às 19h",
    photoUrl: clinicImages.medical_services,
    description: "Centro médico de excelência em cardiologia e ortopedia"
  },
  {
    id: 2,
    name: "Clínica Saúde Total",
    location: "Clínica Sul" as Location,
    address: "Av. das Flores, 456",
    specialties: ["Dermatologia", "Oftalmologia"] as Specialty[],
    rating: 4.9,
    phone: "(11) 2345-6789",
    hours: "Segunda à Sábado: 8h às 20h",
    photoUrl: clinicImages.saude_total,
    description: "Referência em tratamentos dermatológicos e oftalmológicos"
  },
  {
    id: 3,
    name: "Centro Médico Vida",
    location: "Centro Médico Norte" as Location,
    address: "Rua dos Pinheiros, 789",
    specialties: ["Neurologia", "Pediatria"] as Specialty[],
    rating: 4.7,
    phone: "(11) 4567-8901",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.centro_medico,
    description: "Atendimento especializado em neurologia e pediatria"
  },
  {
    id: 4,
    name: "Policlínica Bem Estar",
    location: "Policlínica Leste" as Location,
    address: "Av. Principal, 1010",
    specialties: ["Pediatria", "Cardiologia"] as Specialty[],
    rating: 4.6,
    phone: "(11) 5678-9012",
    hours: "Segunda à Sábado: 7h às 22h",
    photoUrl: clinicImages.policlinica,
    description: "Atendimento humanizado em pediatria e cardiologia"
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