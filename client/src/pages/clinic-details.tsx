import { Navigation } from "@/components/navigation";
import { useRoute } from "wouter";
import { clinicsData, doctorsData } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ClinicDetailsPage() {
  const [, params] = useRoute("/clinica/:id");
  const clinicId = params?.id ? parseInt(params.id) : null;

  const clinic = clinicsData.find(c => c.id === clinicId);
  const clinicDoctors = doctorsData.filter(d => d.clinicId === clinicId);

  if (!clinic) {
    return <div>Clínica não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clinic Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{clinic.name}</h1>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2" />
                    <p>{clinic.address}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                    <span>{clinic.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <p>{clinic.phone}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <p>{clinic.hours}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Especialidades:</h3>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={clinic.photoUrl}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Médicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-primary text-sm mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-3">CRM: {doctor.crm}</p>
                  <Link href={`/agendar?doctor=${doctor.id}&clinic=${clinic.id}`}>
                    <Button className="w-full">Agendar</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}