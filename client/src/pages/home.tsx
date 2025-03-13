import { Navigation } from "@/components/navigation";
import { SearchFilters } from "@/components/search-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Smartphone, CalendarCheck } from "lucide-react";

export default function Home() {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/medical-bg.jpg')] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/90 to-blue-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Encontre os melhores profissionais de saúde da sua região
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Agende sua consulta de forma rápida e segura com os melhores especialistas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl backdrop-blur-lg bg-white/95">
              <CardContent className="p-0">
                <SearchFilters onSearch={handleSearch} />
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Agendamento 24h</h3>
                <p className="text-gray-600">Agende sua consulta a qualquer momento, com total praticidade e segurança</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8 text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Processo Simplificado</h3>
                <p className="text-gray-600">Interface intuitiva que permite agendar sua consulta em poucos cliques</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-8 text-center">
                <CalendarCheck className="w-12 h-12 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Horários Flexíveis</h3>
                <p className="text-gray-600">Escolha o melhor horário de acordo com sua disponibilidade</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}