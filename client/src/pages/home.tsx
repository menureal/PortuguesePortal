import { Navigation } from "@/components/navigation";
import { SearchFilters } from "@/components/search-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Smartphone, CalendarCheck } from "lucide-react";
import { Suspense, lazy, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the Calendar component
const Calendar = lazy(() => import("@/components/ui/calendar"));

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/90 to-blue-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Encontre os melhores profissionais de saúde da sua região
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Agende sua consulta de forma rápida e segura com os melhores especialistas
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="shadow-2xl backdrop-blur-lg bg-white/95">
              <CardContent className="p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Search Filters */}
                  <div className="space-y-4 md:space-y-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Buscar Consulta</h2>
                    <SearchFilters onSearch={handleSearch} />
                  </div>

                  {/* Calendar */}
                  <div className="bg-white rounded-xl shadow-inner p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Selecionar Data</h2>
                    <div className="flex justify-center">
                      <Suspense fallback={
                        <div className="w-full max-w-[400px] h-[300px] flex items-center justify-center">
                          <Skeleton className="w-full h-full rounded-md" />
                        </div>
                      }>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md w-full max-w-[400px]"
                          disabled={(date) => date < new Date()}
                          showOutsideDays
                          fixedWeeks
                          ISOWeek
                        />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6 md:p-8 text-center">
                <Clock className="w-12 h-12 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Agendamento 24h</h3>
                <p className="text-gray-600">Agende sua consulta a qualquer momento, com total praticidade e segurança</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6 md:p-8 text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Processo Simplificado</h3>
                <p className="text-gray-600">Interface intuitiva que permite agendar sua consulta em poucos cliques</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6 md:p-8 text-center">
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