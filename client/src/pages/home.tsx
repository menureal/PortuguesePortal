import { Navigation } from "@/components/navigation";
import { SearchFilters } from "@/components/search-filters";
import { AppointmentForm } from "@/components/appointment-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Faça o seu agendamento
          </h1>
          <p className="text-lg text-gray-600">
            Encontre o médico ideal e agende sua consulta de forma rápida e segura
          </p>
        </div>

        <SearchFilters onSearch={handleSearch} />

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Agende sua consulta</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
