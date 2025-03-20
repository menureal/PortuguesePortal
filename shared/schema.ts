import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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
      "Cirurgia",
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
      "Cirurgia",
      "Ortopedia",
      "Neurologia",
      "Oncologia"
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
      "Pediatria",
      "Cirurgia"
    ] as Specialty[],
    rating: 4.5,
    phone: "221 1170",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3",
    description: "Hospital Regional que serve a ilha de Santo Antão"
  },
  {
    id: 4,
    name: "Hospital Regional Dr. Santa Rita Vieira",
    type: "Hospital Regional" as HospitalType,
    location: "Santiago" as Location,
    address: "Santa Catarina",
    specialties: [
      "Clínica Geral",
      "Pediatria",
      "Ginecologia"
    ] as Specialty[],
    rating: 4.6,
    phone: "265 1111",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
    description: "Hospital Regional que serve a região de Santa Catarina"
  },
  {
    id: 5,
    name: "Hospital Regional São Francisco de Assis",
    type: "Hospital Regional" as HospitalType,
    location: "São Filipe" as Location,
    address: "São Filipe, Fogo",
    specialties: [
      "Clínica Geral",
      "Pediatria",
      "Cirurgia Básica"
    ] as Specialty[],
    rating: 4.4,
    phone: "281 1316",
    hours: "24 horas",
    emergencyService: true,
    photoUrl: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3",
    description: "Principal unidade hospitalar da ilha do Fogo"
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
  },
  // Novos médicos
  {
    id: 5,
    name: "Dr. Carlos Santos",
    specialty: "Cardiologia" as Specialty,
    location: "São Vicente" as Location,
    clinicId: 25, // Cardio Clinic
    crm: "082/2021",
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_carlos,
    description: "Especialista em Cardiologia"
  },
  {
    id: 6,
    name: "Dra. Ana Lima",
    specialty: "Estomatologia" as Specialty,
    location: "Boa Vista" as Location,
    clinicId: 1, // Clínica Dentária Sorriso Mais
    crm: "045/2022",
    rating: 4.8,
    availability: ["Segunda", "Terça", "Quinta"],
    photoUrl: doctorImages.dra_ana,
    description: "Especialista em Estomatologia"
  },
  {
    id: 7,
    name: "Dr. Pedro Costa",
    specialty: "Fisioterapia" as Specialty,
    location: "Sal" as Location,
    clinicId: 8, // ATLAS - Clínica de Fisioterapia
    crm: "091/2021",
    rating: 4.7,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_pedro,
    description: "Especialista em Fisioterapia e Reabilitação"
  },
  {
    id: 8,
    name: "Dra. Maria Silva",
    specialty: "Clínica Geral" as Specialty,
    location: "São Nicolau" as Location,
    clinicId: 23, // Medilar
    crm: "033/2023",
    rating: 4.8,
    availability: ["Terça", "Quinta", "Sexta"],
    photoUrl: doctorImages.dra_maria,
    description: "Médica Clínica Geral"
  },
  {
    id: 9,
    name: "Dr. José Fernandes",
    specialty: "Cardiologia" as Specialty,
    location: "Santiago" as Location,
    clinicId: 15, // Cardiosaúde
    crm: "064/2022",
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_jose,
    description: "Especialista em Cardiologia"
  },
  {
    id: 10,
    name: "Dr. António Monteiro",
    specialty: "Estomatologia" as Specialty,
    location: "Santo Antão" as Location,
    clinicId: 17, // Confidente - Clínica Dentária
    crm: "076/2021",
    rating: 4.8,
    availability: ["Segunda", "Terça", "Quinta"],
    photoUrl: doctorImages.dr_carlos,
    description: "Especialista em Estomatologia"
  },
  {
    id: 11,
    name: "Dra. Sofia Rodrigues",
    specialty: "Fisioterapia" as Specialty,
    location: "São Vicente" as Location,
    clinicId: 26, // CentroFisio
    crm: "088/2022",
    rating: 4.7,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dra_ana,
    description: "Especialista em Fisioterapia"
  },
  {
    id: 12,
    name: "Dr. Manuel Cruz",
    specialty: "Clínica Geral" as Specialty,
    location: "Sal" as Location,
    clinicId: 12, // Medical Services
    crm: "052/2023",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_eduardo,
    description: "Médico Clínica Geral"
  },
  {
    id: 13,
    name: "Dra. Patrícia Gomes",
    specialty: "Estomatologia" as Specialty,
    location: "São Filipe" as Location,
    clinicId: 4, // Centro de Reabilitação Oral
    crm: "039/2022",
    rating: 4.9,
    availability: ["Terça", "Quinta", "Sexta"],
    photoUrl: doctorImages.dra_evandra,
    description: "Especialista em Estomatologia"
  },
  {
    id: 14,
    name: "Dr. Ricardo Tavares",
    specialty: "Fisioterapia" as Specialty,
    location: "Santo Antão" as Location,
    clinicId: 18, // Fisiolótus
    crm: "071/2021",
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
    photoUrl: doctorImages.dr_jacob,
    description: "Especialista em Fisioterapia"
  },
  {
    id: 15,
    name: "Dra. Carla Santos",
    specialty: "Análises Clínicas" as Specialty,
    location: "São Filipe" as Location,
    clinicId: 6, // LAC - Laboratório
    crm: "094/2022",
    rating: 4.7,
    availability: ["Segunda", "Terça", "Quinta"],
    photoUrl: doctorImages.dra_carmen,
    description: "Especialista em Análises Clínicas"
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