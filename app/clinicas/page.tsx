'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from "../components/navigation";
import { clinicsData } from "../lib/schema";
import { Card, CardContent } from "../components/ui/card";
import { Building2, Star, Phone, Clock, MapPin } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Agrupar clínicas por tipo
const groupClinicsByType = (clinics: typeof clinicsData) => {
  return clinics.reduce((acc, clinic) => {
    if (!acc[clinic.type]) {
      acc[clinic.type] = [];
    }
    acc[clinic.type].push(clinic);
    return acc;
  }, {} as Record<string, typeof clinicsData>);
};

export default function ClinicsPage() {
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredClinics = clinicsData.filter(clinic => {
    const matchSpecialty = !searchSpecialty || 
      clinic.specialties.some((spec: string) => 
        spec.toLowerCase().includes(searchSpecialty.toLowerCase())
      );
    const matchLocation = !searchLocation || 
      clinic.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchSpecialty && matchLocation;
  });

  const groupedClinics = groupClinicsByType(filteredClinics);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre uma Clínica
          </h1>
          <p className="text-lg text-gray-600">
            Busque por especialidade ou localização para encontrar a clínica ideal
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Especialidade..."
              value={searchSpecialty}
              onChange={(e) => setSearchSpecialty(e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Nome da clínica ou localização..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full"
            />
            <Button className="w-full">
              Procurar
            </Button>
          </div>
        </div>

        {/* Clinics by Category */}
        {Object.entries(groupedClinics).map(([type, clinics]) => (
          <div key={type} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <Link key={clinic.id} href={`/clinica/${clinic.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img 
                        src={clinic.photoUrl}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{clinic.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{clinic.location}</p>
                            <p className="text-sm">{clinic.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current flex-shrink-0" />
                          <span>{clinic.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p>{clinic.phone}</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p>{clinic.hours}</p>
                        </div>
                        <div className="mt-2">
                          <p className="font-semibold text-gray-700">Especialidades:</p>
                          <p className="text-gray-600">{clinic.specialties.join(", ")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}