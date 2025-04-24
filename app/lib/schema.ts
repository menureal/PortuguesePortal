import { z } from "zod";

export const hospitalTypes = [
  "Hospital Central",
  "Hospital Regional",
  "Centro de Saúde",
  "Posto Sanitário"
] as const;

export type HospitalType = typeof hospitalTypes[number];

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
  dra_carmen: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3",
  dr_pedro: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3",
  dra_maria: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3",
  dr_jose: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3"
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

// Dados das clínicas
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
  }
];

// Dados dos hospitais
export const hospitalsData = [
  {
    id: 1,
    name: "Hospital Dr. Baptista de Sousa",
    type: "Hospital Central" as HospitalType,
    location: "São Vicente" as Location,
    address: "Mindelo",
    specialties: [
      "Cardiologia",
      "Pediatria",
      "Ortopedia",
      "Neurologia"
    ] as Specialty[],
    rating: 4.8,
    phone: "232 2261",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3",
    description: "Hospital Central de referência para a região norte do país"
  },
  {
    id: 2,
    name: "Hospital Dr. Agostinho Neto",
    type: "Hospital Central" as HospitalType,
    location: "Santiago" as Location,
    address: "Praia",
    specialties: [
      "Cardiologia",
      "Pediatria",
      "Ortopedia",
      "Neurologia"
    ] as Specialty[],
    rating: 4.7,
    phone: "261 2000",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3",
    description: "Principal hospital de Cabo Verde, referência nacional"
  },
  {
    id: 3,
    name: "Hospital Regional João Morais",
    type: "Hospital Regional" as HospitalType,
    location: "Santo Antão" as Location,
    address: "Ribeira Grande",
    specialties: [
      "Clínica Geral",
      "Pediatria"
    ] as Specialty[],
    rating: 4.5,
    phone: "221 1170",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3",
    description: "Hospital Regional que serve a ilha de Santo Antão"
  }
];

// Dados dos médicos
export const doctorsData = [
  {
    id: 1,
    name: "Dr. Carlos Monteiro",
    specialty: "Cardiologia" as Specialty,
    crm: "CRM-CV 1234",
    location: "São Vicente" as Location,
    rating: 4.9,
    photoUrl: doctorImages.dr_carlos,
    bio: "Formado pela Universidade de Cabo Verde com especialização em Cardiologia pela Universidade de Lisboa. Possui mais de 15 anos de experiência no tratamento de doenças cardiovasculares.",
    languages: ["Português", "Inglês", "Francês"],
    availability: ["Segunda", "Quarta", "Sexta"],
    insuranceAccepted: ["INPS", "Garantia Saúde", "Impar Seguros"],
    clinics: [24, 25] // IDs das clínicas onde atende
  },
  {
    id: 2,
    name: "Dra. Ana Fortes",
    specialty: "Dermatologia" as Specialty,
    crm: "CRM-CV 2345",
    location: "Santiago" as Location,
    rating: 4.8,
    photoUrl: doctorImages.dra_ana,
    bio: "Especializada em Dermatologia pela Universidade do Porto, com foco em tratamentos estéticos e doenças da pele. Atua há 10 anos no diagnóstico e tratamento de problemas dermatológicos.",
    languages: ["Português", "Inglês"],
    availability: ["Terça", "Quinta", "Sábado"],
    insuranceAccepted: ["INPS", "Garantia Saúde"],
    clinics: [15] // IDs das clínicas onde atende
  },
  {
    id: 3,
    name: "Dr. Eduardo Tavares",
    specialty: "Clínica Geral" as Specialty,
    crm: "CRM-CV 3456",
    location: "Santo Antão" as Location,
    rating: 4.7,
    photoUrl: doctorImages.dr_eduardo,
    bio: "Médico generalista formado pela Faculdade de Medicina de Coimbra, com vasta experiência em atendimento primário. Atende pacientes de todas as idades.",
    languages: ["Português", "Crioulo"],
    availability: ["Segunda a Sexta"],
    insuranceAccepted: ["INPS", "Garantia Saúde", "Impar Seguros", "Salute"],
    clinics: [19, 21] // IDs das clínicas onde atende
  },
  {
    id: 4,
    name: "Dra. Evandra Lopes",
    specialty: "Pediatria" as Specialty,
    crm: "CRM-CV 4567",
    location: "Sal" as Location,
    rating: 4.9,
    photoUrl: doctorImages.dra_evandra,
    bio: "Especialista em Pediatria com formação no Brasil e Portugal. Dedicada ao atendimento infantil, com foco em desenvolvimento e crescimento saudável.",
    languages: ["Português", "Inglês", "Espanhol"],
    availability: ["Segunda", "Quarta", "Sexta"],
    insuranceAccepted: ["INPS", "Garantia Saúde"],
    clinics: [12] // IDs das clínicas onde atende
  },
  {
    id: 5,
    name: "Dr. Jacob Silva",
    specialty: "Ortopedia" as Specialty,
    crm: "CRM-CV 5678",
    location: "São Vicente" as Location,
    rating: 4.8,
    photoUrl: doctorImages.dr_jacob,
    bio: "Ortopedista com especialização em traumatologia esportiva. Possui vasta experiência no tratamento de lesões e patologias do sistema musculoesquelético.",
    languages: ["Português", "Inglês"],
    availability: ["Terça", "Quinta"],
    insuranceAccepted: ["INPS", "Garantia Saúde", "Impar Seguros"],
    clinics: [24] // IDs das clínicas onde atende
  }
];

// Tipo para Agendamento
export interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: number;
  clinicId: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Schema para criar um agendamento
export const appointmentSchema = z.object({
  patientName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  patientEmail: z.string().email({ message: "Email inválido" }),
  patientPhone: z.string().min(7, { message: "Telefone inválido" }),
  doctorId: z.number(),
  clinicId: z.number(),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
});

export type InsertAppointment = z.infer<typeof appointmentSchema>;