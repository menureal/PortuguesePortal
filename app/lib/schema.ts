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
    name: "Dr. Carlos Mendes",
    specialty: "Cardiologia" as Specialty,
    clinicId: 25,
    crm: "CV-1234",
    photoUrl: doctorImages.dr_carlos,
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 2,
    name: "Dra. Ana Silva",
    specialty: "Pediatria" as Specialty,
    clinicId: 12,
    crm: "CV-2345",
    photoUrl: doctorImages.dra_ana,
    rating: 4.8,
    availability: ["Segunda", "Terça", "Quinta"]
  },
  {
    id: 3,
    name: "Dr. Eduardo Pereira",
    specialty: "Ortopedia" as Specialty,
    clinicId: 5,
    crm: "CV-3456",
    photoUrl: doctorImages.dr_eduardo,
    rating: 4.7,
    availability: ["Terça", "Quinta", "Sábado"]
  },
  {
    id: 4,
    name: "Dra. Evandra Lopes",
    specialty: "Estomatologia" as Specialty,
    clinicId: 1,
    crm: "CV-4567",
    photoUrl: doctorImages.dra_evandra,
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"]
  },
  {
    id: 5,
    name: "Dr. Jacob Monteiro",
    specialty: "Análises Clínicas" as Specialty,
    clinicId: 3,
    crm: "CV-5678",
    photoUrl: doctorImages.dr_jacob,
    rating: 4.6,
    availability: ["Segunda a Sexta"]
  }
];

// Definição da tabela de agendamentos
export type Appointment = {
  id: number;
  patientName: string;
  email: string;
  phone: string;
  specialty: Specialty;
  location: Location;
  provider: string;
  date: Date;
  status: string;
};

export type InsertAppointment = Omit<Appointment, "id" | "status">;