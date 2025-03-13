import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { doctorsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function DoctorsPage() {
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchSpecialty = !searchSpecialty || doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase());
    const matchLocation = !searchLocation || doctor.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchSpecialty && matchLocation;
  });

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <input
            type="text"
            placeholder="Buscar por especialidade..."
            className="p-2 border rounded"
            onChange={(e) => setSearchSpecialty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por localização..."
            className="p-2 border rounded"
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                <p className="text-gray-600 mb-1">{doctor.location}</p>
                <p className="text-gray-600 mb-1">CRM: {doctor.crm}</p>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{doctor.rating}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="font-semibold">Disponível em:</p>
                  <p>{doctor.availability.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
