import { Navigation } from "@/components/navigation";
import { useState } from "react";
import { hospitalsData, hospitalTypes } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Phone, Clock, Siren } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

// Agrupar hospitais por tipo
const groupHospitalsByType = (hospitals: typeof hospitalsData) => {
  return hospitals.reduce((acc, hospital) => {
    if (!acc[hospital.type]) {
      acc[hospital.type] = [];
    }
    acc[hospital.type].push(hospital);
    return acc;
  }, {} as Record<string, typeof hospitalsData>);
};

export default function HospitalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSpecialty, setSearchSpecialty] = useState("");

  const filteredHospitals = hospitalsData.filter(hospital => {
    const matchQuery = !searchQuery || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchLocation = !searchLocation || 
      hospital.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchLocation.toLowerCase());

    const matchSpecialty = !searchSpecialty || 
      hospital.specialties.some(s => s.toLowerCase().includes(searchSpecialty.toLowerCase()));

    return matchQuery && matchLocation && matchSpecialty;
  });

  const groupedHospitals = groupHospitalsByType(filteredHospitals);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hospitais
          </h1>
          <p className="text-lg text-gray-600">
            Encontre hospitais e centros de saúde em Cabo Verde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Input
            type="text"
            placeholder="Buscar por nome do hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Buscar por localização..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Buscar por especialidade..."
            value={searchSpecialty}
            onChange={(e) => setSearchSpecialty(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Hospitals by Type */}
        {Object.entries(groupedHospitals).map(([type, hospitals]) => (
          <div key={type} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital) => (
                <Link key={hospital.id} href={`/hospital/${hospital.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-video relative">
                      <img 
                        src={hospital.photoUrl}
                        alt={hospital.name}
                        className="w-full h-full object-cover"
                      />
                      {hospital.emergencyService && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          <Siren className="w-4 h-4 mr-1" />
                          Emergência 24h
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p>{hospital.address}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current flex-shrink-0" />
                          <span>{hospital.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p>{hospital.phone}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p>{hospital.hours}</p>
                        </div>
                        <div className="mt-2">
                          <p className="font-semibold text-gray-700 mb-1">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {hospital.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {Object.keys(groupedHospitals).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Nenhum hospital encontrado com os critérios de busca selecionados.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}