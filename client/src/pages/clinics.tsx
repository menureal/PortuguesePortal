import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { clinicsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, Phone, Clock } from "lucide-react";

export default function ClinicsPage() {
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredClinics = clinicsData.filter(clinic => {
    const matchSpecialty = !searchSpecialty || 
      clinic.specialties.some(spec => 
        spec.toLowerCase().includes(searchSpecialty.toLowerCase())
      );
    const matchLocation = !searchLocation || 
      clinic.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchSpecialty && matchLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre uma Clínica
          </h1>
          <p className="text-lg text-gray-600">
            Busque por especialidade ou localização para encontrar a clínica ideal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          {filteredClinics.map((clinic) => (
            <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{clinic.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-2" />
                    <p>{clinic.address}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                    <span>{clinic.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <p>{clinic.phone}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <p>{clinic.hours}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-gray-700">Especialidades:</p>
                    <p className="text-gray-600">{clinic.specialties.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
