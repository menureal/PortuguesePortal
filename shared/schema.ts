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

// URLs fixas das fotos das clínicas por categoria
const clinicImages = {
  // Clínicas Gerais
  medical_services: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
  centro_medico: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
  clinica_geral: "https://images.unsplash.com/photo-1631217874688-e657db4b4627?ixlib=rb-4.0.3",

  // Clínicas Especializadas
  cardio_saude: "https://images.unsplash.com/photo-1626315869436-d6989fea3524?ixlib=rb-4.0.3",
  dentista: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3",
  fisioterapia: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3",
  laboratorio: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3",

  // Consultórios
  consultorio_1: "https://images.unsplash.com/photo-1581056771107-24758e5520b0?ixlib=rb-4.0.3",
  consultorio_2: "https://images.unsplash.com/photo-1580281658223-9b93c0789289?ixlib=rb-4.0.3",

  // Centros de Reabilitação
  reabilitacao: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?ixlib=rb-4.0.3",
  fisio_center: "https://images.unsplash.com/photo-1590956433785-8e4c9d5c5b23?ixlib=rb-4.0.3"
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

// Categorização das clínicas por tipo
const clinicTypes = {
  DENTAL: "Clínica Dentária",
  MEDICAL: "Centro Médico",
  PHYSIO: "Fisioterapia",
  LAB: "Laboratório",
  CARDIO: "Cardiologia",
  GENERAL: "Clínica Geral"
} as const;

export const clinicsData = [
  // Clínicas Dentárias
  {
    id: 1,
    type: clinicTypes.DENTAL,
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
    type: clinicTypes.DENTAL,
    name: "2Sofident Clinica Dentária",
    location: "Boa Vista" as Location,
    address: "Sal Rei",
    specialties: ["Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "9997913",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.consultorio_1,
    description: "Consultório de Estomatologia"
  },
  {
    id: 4,
    type: clinicTypes.DENTAL,
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
    id: 7,
    type: clinicTypes.DENTAL,
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
    id: 9,
    type: clinicTypes.DENTAL,
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
    type: clinicTypes.DENTAL,
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
    id: 14,
    type: clinicTypes.DENTAL,
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
    id: 17,
    type: clinicTypes.DENTAL,
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
    id: 20,
    type: clinicTypes.DENTAL,
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

  // Laboratórios
  {
    id: 3,
    type: clinicTypes.LAB,
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
    id: 6,
    type: clinicTypes.LAB,
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

  // Centros de Fisioterapia
  {
    id: 5,
    type: clinicTypes.PHYSIO,
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
    id: 8,
    type: clinicTypes.PHYSIO,
    name: "ATLAS - Clínica de Fisioterapia e Osteopatia",
    location: "Sal" as Location,
    address: "Espargos",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.9,
    phone: "2413060",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisio_center,
    description: "Consultório de Fisioterapia"
  },
  {
    id: 11,
    type: clinicTypes.PHYSIO,
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
    id: 13,
    type: clinicTypes.PHYSIO,
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
    id: 16,
    type: clinicTypes.PHYSIO,
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
    id: 18,
    type: clinicTypes.PHYSIO,
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
    id: 26,
    type: clinicTypes.PHYSIO,
    name: "CentroFisio - Tratamento",
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: ["Fisioterapia"] as Specialty[],
    rating: 4.7,
    phone: "2318344",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.fisioterapia,
    description: "Consultório de Fisioterapia"
  },

  // Centros Médicos
  {
    id: 12,
    type: clinicTypes.MEDICAL,
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
    id: 19,
    type: clinicTypes.MEDICAL,
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
    id: 21,
    type: clinicTypes.MEDICAL,
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
    type: clinicTypes.MEDICAL,
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
    type: clinicTypes.MEDICAL,
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
    type: clinicTypes.MEDICAL,
    name: "Biomédica - Centro Clínico",
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: ["Clínica Geral"] as Specialty[],
    rating: 4.9,
    phone: "2323829",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.centro_medico,
    description: "Centro Médico"
  },
    {
    id: 14,
    type: clinicTypes.MEDICAL,
    name: "Clínica Médico Dentária Triângulo",
    location: "Santiago" as Location,
    address: "Praia",
    specialties: ["Clínica Geral", "Estomatologia"] as Specialty[],
    rating: 4.7,
    phone: "9251601",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.dentista,
    description: "Consultório de Estomatologia"
  },


  // Clínicas Cardiológicas
  {
    id: 25,
    type: clinicTypes.CARDIO,
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
    id: 15,
    type: clinicTypes.CARDIO,
    name: "Cardiosaúde",
    location: "Santiago" as Location,
    address: "Praia",
    specialties: ["Cardiologia"] as Specialty[],
    rating: 4.9,
    phone: "929 79 30",
    hours: "Segunda à Sexta: 8h às 18h",
    photoUrl: clinicImages.cardio_saude,
    description: "Centro Médico especializado em cardiologia"
  }
];

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