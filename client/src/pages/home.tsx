import { Navigation } from "@/components/navigation";
import { SearchFilters } from "@/components/search-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Smartphone, CalendarCheck } from "lucide-react";

export default function Home() {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Encontre os melhores profissionais de saúde da sua região e agende uma consulta.
          </h1>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-0">
            <SearchFilters onSearch={handleSearch} />
          </CardContent>
        </Card>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Agendamento disponível 24h por dia</h3>
              <p className="text-gray-600">Agende sua consulta a qualquer momento, com praticidade e segurança</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Agendamento de consultas simples e prático</h3>
              <p className="text-gray-600">Interface intuitiva para marcar sua consulta em poucos cliques</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <CalendarCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Agende no horário ideal para você</h3>
              <p className="text-gray-600">Escolha o melhor horário de acordo com sua disponibilidade</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}