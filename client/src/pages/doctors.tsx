import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { doctorsData, clinicsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function DoctorsPage() {
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchSpecialty = !searchSpecialty || doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase());
    const clinic = clinicsData.find(c => c.id === doctor.clinicId);
    const matchLocation = !searchLocation || 
      (clinic && clinic.name.toLowerCase().includes(searchLocation.toLowerCase())) ||
      (clinic && clinic.location.toLowerCase().includes(searchLocation.toLowerCase()));
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => {
            const clinic = clinicsData.find(c => c.id === doctor.clinicId);
            return (
              <Link key={doctor.id} href={`/confirmar-agendamento?doctor=${doctor.id}&clinic=${doctor.clinicId}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                    <div className="space-y-2">
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-gray-600">{clinic ? clinic.name : ''}</p>
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
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}