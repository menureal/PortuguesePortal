import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const specialties = [
  "Cardiologia",
  "Dermatologia",
  "Neurologia",
  "Pediatria",
  "Ortopedia",
  "Oftalmologia",
  "Otorrinolaringologia",
  "Clínica Geral",
  "Psicologia",
  "Análises Clínicas"
] as const;

export const locations = [
  "Boa Vista",
  "Praia",
  "São Vicente",
  "Sal",
  "São Filipe",
  "Santo Antão",
  "Santiago"
] as const;

export type Specialty = typeof specialties[number];
export type Location = typeof locations[number];

// URLs fixas das fotos dos médicos e clínicas (mantendo as mesmas para preservar a consistência visual)
const doctorImages = {
  dr_carlos: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
  dra_ana: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
  dr_eduardo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
  dra_evandra: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3",
  dr_jacob: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3",
  dra_carmen: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3"
};

const clinicImages = {
  medical_services: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
  clinica_mais_saude: "https://images.unsplash.com/photo-1516549655669-df71cbe43110?ixlib=rb-4.0.3",
  centro_medico: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
  cardio_saude: "https://images.unsplash.com/photo-1626315869436-d6989fea3524?ixlib=rb-4.0.3"
};

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Eduardo H. Pérez",
    specialty: "Clínica Geral" as Specialty,
    location: "Santo Antão" as Location,
    clinicId: 1,
    crm: "079/2021",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_eduardo,
    description: "Consultório Dr. Eduardo H. Pérez - Atendimento em Clínica Geral"
  },
  {
    id: 2,
    name: "Dra. Evandra Moreira",
    specialty: "Clínica Geral" as Specialty,
    location: "Praia" as Location,
    clinicId: 2,
    crm: "015/2023",
    rating: 4.9,
    availability: ["Terça", "Quinta"],
    photoUrl: doctorImages.dra_evandra,
    description: "Clínica Médica especializada em atendimento geral"
  },
  {
    id: 3,
    name: "Dr. Jacob Vicente",
    specialty: "Psicologia" as Specialty,
    location: "Praia" as Location,
    clinicId: 3,
    crm: "058/2022",
    rating: 4.7,
    availability: ["Segunda", "Quinta", "Sexta"],
    photoUrl: doctorImages.dr_jacob,
    description: "Centro de Atendimento Psicológico"
  },
  {
    id: 4,
    name: "Dra. Carmen Almeida",
    specialty: "Otorrinolaringologia" as Specialty,
    location: "Praia" as Location,
    clinicId: 4,
    crm: "007/2020",
    rating: 5.0,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dra_carmen,
    description: "CC&TT Clinica Otorrinolaringologia"
  }
];

export const clinicsData = [
  {
    id: 1,
    name: "Medical Services Lab",
    location: "Boa Vista" as Location,
    address: "Sal Rei",
    specialties: ["Clínica Geral", "Análises Clínicas"] as Specialty[],
    rating: 4.8,
    phone: "9847620",
    hours: "Segunda à Sexta: 7h às 19h",
    photoUrl: clinicImages.medical_services,
    description: "Centro médico completo com laboratório de análises"
  },
  {
    id: 2,
    name: "Clínica + Saúde",
    location: "Praia" as Location,
    address: "Praia",
    specialties: ["Clínica Geral", "Cardiologia"] as Specialty[],
    rating: 4.9,
    phone: "2624444",
    hours: "Segunda à Sábado: 8h às 20h",
    photoUrl: clinicImages.clinica_mais_saude,
    description: "Atendimento médico multidisciplinar"
  },
  {
    id: 3,
    name: "Centro Médico ET",
    location: "Santiago" as Location,
    address: "Assomada",
    specialties: ["Clínica Geral", "Psicologia"] as Specialty[],
    rating: 4.7,
    phone: "2651800",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.centro_medico,
    description: "Centro médico especializado em saúde mental"
  },
  {
    id: 4,
    name: "Cardiosaúde",
    location: "Praia" as Location,
    address: "Praia",
    specialties: ["Cardiologia", "Otorrinolaringologia"] as Specialty[],
    rating: 4.6,
    phone: "929 79 30",
    hours: "Segunda à Sábado: 7h às 22h",
    photoUrl: clinicImages.cardio_saude,
    description: "Especializada em cardiologia e otorrinolaringologia"
  },
    {
    id: 5,
    name: "2Sofident Clinica Dentária",
    location: "Praia" as Location,
    address: "Praia",
    specialties: ["Odontologia"] as Specialty[],
    rating: 4.6,
    phone: "929 79 30",
    hours: "Segunda à Sábado: 7h às 22h",
    photoUrl: clinicImages.cardio_saude,
    description: "Clínica especializada em Odontologia"
  },
    {
    id: 6,
    name: "Centro de Reabilitação Oral",
    location: "Praia" as Location,
    address: "Praia",
    specialties: ["Odontologia"] as Specialty[],
    rating: 4.6,
    phone: "929 79 30",
    hours: "Segunda à Sábado: 7h às 22h",
    photoUrl: clinicImages.cardio_saude,
    description: "Centro especializado em Reabilitação Oral"
  }
];

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