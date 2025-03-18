import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { doctorsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Array of professional doctor photos from Unsplash
const doctorPhotos = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
];

export default function DoctorsPage() {
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchSpecialty = !searchSpecialty || doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase());
    const matchLocation = !searchLocation || doctor.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchSpecialty && matchLocation;
  });

  // Mock available times
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre um Médico
          </h1>
          <p className="text-lg text-gray-600">
            Busque por especialidade ou localização para encontrar o profissional ideal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input
            type="text"
            placeholder="Buscar por especialidade..."
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            onChange={(e) => setSearchSpecialty(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Buscar por localização..."
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Médicos */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <Card 
                  key={doctor.id} 
                  className={`cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={doctor.photoUrl || doctorPhotos[index % doctorPhotos.length]} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                    <div className="space-y-2">
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-gray-600">{doctor.location}</p>
                      <p className="text-gray-600 text-sm">CRM: {doctor.crm}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">Disponível em:</p>
                        <p>{doctor.availability.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Seção de Agendamento */}
          {selectedDoctor && (
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Agende a sua consulta</h2>

                  {/* Doctor Details */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <img 
                        src={selectedDoctor.photoUrl || doctorPhotos[0]}
                        alt={selectedDoctor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                        <p className="text-gray-600">{selectedDoctor.specialty}</p>
                        <p className="text-gray-600 text-sm">CRM: {selectedDoctor.crm}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Disponível em: {selectedDoctor.availability?.join(", ") || "Não disponível"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Horários Disponíveis:</h4>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium">Informações do Paciente</h4>
                    <Input placeholder="Nome completo" />
                    <Input type="email" placeholder="Email" />
                    <Input placeholder="Contato" />
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Pagamento</h4>
                    <Input placeholder="Número do Cartão" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Data Validade" />
                      <Input placeholder="CCV" />
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    disabled={!selectedTime}
                  >
                    Confirmar Agendamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}