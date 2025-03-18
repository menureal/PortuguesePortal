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
  "Análises Clínicas",
  "Estomatologia",
  "Fisioterapia",
  "Odontologia"
] as const;

export const locations = [
  "Boa Vista",
  "Praia",
  "São Vicente",
  "Sal",
  "São Filipe",
  "Santo Antão",
  "Santiago",
  "São Nicolau"
] as const;

export type Specialty = typeof specialties[number];
export type Location = typeof locations[number];

// URLs fixas das fotos das clínicas
const clinicImages = {
  medical_services: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
  clinica_mais_saude: "https://images.unsplash.com/photo-1516549655669-df71cbe43110?ixlib=rb-4.0.3",
  centro_medico: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
  cardio_saude: "https://images.unsplash.com/photo-1626315869436-d6989fea3524?ixlib=rb-4.0.3",
  dentista: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3",
  fisioterapia: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
  laboratorio: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3"
};

// URLs fixas das fotos dos médicos
const doctorImages = {
  dr_carlos: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3",
  dra_ana: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3",
  dr_eduardo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3",
  dra_evandra: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3",
  dr_jacob: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3",
  dra_carmen: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3"
};

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Eduardo H. Pérez",
    specialty: "Clínica Geral" as Specialty,
    location: "Santo Antão" as Location,
    clinicId: 19, // Consultório Dr. Eduardo H. Pérez
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
    clinicId: 14, // Clínica Médico Dentária Triângulo
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
    clinicId: 15, // Cardiosaúde
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
    clinicId: 15, // Cardiosaúde
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
    name: "Clínica Dentária Sorriso Mais",
    location: "Boa Vista" as Location,
    address: "Sal Rei",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.8,
    phone: "9511729",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 2,
    name: "2Sofident Clinica Dentária",
    location: "Boa Vista" as Location,
    address: "Sal Rei",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "9997913",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 3,
    name: "Tavares Laboratório",
    location: "Boa Vista" as Location,
    address: "Sal Rei",
    specialties: ["Análises Clínicas"] as Specialty[],
    rating: 4.6,
    phone: "9847620",
    hours: "Segunda à Sexta: 7h às 19h",
    photoUrl: clinicImages.laboratorio,
    description: "Centro Médico especializado em análises clínicas"
  },
  {
    id: 4,
    name: "Centro de Reabilitação Oral e Maxilo-Facial",
    location: "São Filipe" as Location,
    address: "São Filipe",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.9,
    phone: "2812006",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 5,
    name: "Fisiofogo",
    location: "São Filipe" as Location,
    address: "São Filipe",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.8,
    phone: "2812604",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Centro Médico especializado em fisioterapia"
  },
  {
    id: 6,
    name: "LAC - Laboratório de Análises Clínicas",
    location: "São Filipe" as Location,
    address: "São Filipe",
    specialties: ["Análises Clínicas"] as Specialty[],
    rating: 4.7,
    phone: "2812006",
    hours: "Segunda à Sexta: 7h às 19h",
    photoUrl: clinicImages.laboratorio,
    description: "Laboratório de Análises Clínicas"
  },
  {
    id: 7,
    name: "Clinica Dentária Prodente",
    location: "São Filipe" as Location,
    address: "São Filipe",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.8,
    phone: "2814242",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 8,
    name: "ATLAS - Clínica de Fisioterapia e Osteopatia",
    location: "Sal" as Location,
    address: "Espargos",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.9,
    phone: "2413060",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
  },
  {
    id: 9,
    name: "Jany'sclinic - Odontologia Integrada",
    location: "Sal" as Location,
    address: "Espargos",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "5809575",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 10,
    name: "Kharisma - Saúde e Estética Bucal",
    location: "Sal" as Location,
    address: "Espargos",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.8,
    phone: "2411038",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 11,
    name: "Phisiosal - Centro de Fisioterapia do Sal",
    location: "Sal" as Location,
    address: "Santa Maria",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.9,
    phone: "2412041",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
  },
  {
    id: 12,
    name: "Medical Services",
    location: "Sal" as Location,
    address: "Santa Maria",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.7,
    phone: "9889863",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Centro Médico"
  },
  {
    id: 13,
    name: "2L Clínica de Fisioterapia",
    location: "Santiago" as Location,
    address: "Tarrafal",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.8,
    phone: "9340262",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
  },
  {
    id: 14,
    name: "Clínica Médico Dentária Triângulo",
    location: "Santiago" as Location,
    address: "Praia",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "9251601",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 15,
    name: "Cardiosaúde",
    location: "Santiago" as Location,
    address: "Praia",
    specialties: ["Cardiologia"] as Specialty[],
    rating: 4.9,
    phone: "929 79 30",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.cardio_saude,
    description: "Centro Médico especializado em cardiologia"
  },
  {
    id: 16,
    name: "Clínica Reabilitá",
    location: "Santo Antão" as Location,
    address: "Porto Novo",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.7,
    phone: "2222767",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
  },
  {
    id: 17,
    name: "Confidente - Clínica Dentária",
    location: "Santo Antão" as Location,
    address: "Ribeira Grande",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.8,
    phone: "2212114",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Centro Médico Dentário"
  },
  {
    id: 18,
    name: "Fisiolótus - Clínica de Fisioterapia e Yoga",
    location: "Santo Antão" as Location,
    address: "Ribeira Grande",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.8,
    phone: "2213080",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia e Yoga"
  },
  {
    id: 19,
    name: "Consultório Dr. Eduardo H. Pérez",
    location: "Santo Antão" as Location,
    address: "Ribeira Grande",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.9,
    phone: "2212229",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Consultório Médico"
  },
  {
    id: 20,
    name: "Clínica Dentária Dentoestética",
    location: "Santo Antão" as Location,
    address: "Porto Novo",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "2212229",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },
  {
    id: 21,
    name: "Medicália",
    location: "Santo Antão" as Location,
    address: "Ribeira Grande",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.8,
    phone: "5981308",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Centro Médico"
  },
  {
    id: 22,
    name: "Consultório Oncomédica",
    location: "Santo Antão" as Location,
    address: "Porto Novo",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.7,
    phone: "5247077",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Centro Médico"
  },
  {
    id: 23,
    name: "Medilar",
    location: "São Nicolau" as Location,
    address: "Ribeira Brava",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.8,
    phone: "2352423",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Centro Médico"
  },
  {
    id: 24,
    name: "Biomédica - Centro Clínico",
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.9,
    phone: "2323829",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.medical_services,
    description: "Centro Médico"
  },
  {
    id: 25,
    name: "Cardio Clinic",
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: ["Cardiologia"] as Specialty[],
    rating: 4.8,
    phone: "5853228",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.cardio_saude,
    description: "Centro Médico especializado em Cardiologia"
  },
  {
    id: 26,
    name: "CentroFisio - Tratamento",
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.7,
    phone: "2318344",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
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