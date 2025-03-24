import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Agende sua consulta
          </h1>
          {date && (
            <p className="text-xl text-primary font-medium">
              Data selecionada: {format(date, "PPP", { locale: ptBR })}
            </p>
          )}
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-6 md:p-10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
              showOutsideDays
              fixedWeeks
              ISOWeek
              classNames={{
                months: "flex flex-col space-y-4",
                month: "space-y-6",
                caption: "flex justify-center pt-2 relative items-center text-xl font-semibold",
                caption_label: "text-lg",
                nav: "space-x-2 flex items-center",
                nav_button: "h-10 w-10 bg-transparent p-0 hover:bg-accent rounded-full",
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                table: "w-full border-collapse space-y-2",
                head_row: "flex",
                head_cell: "text-gray-500 rounded-md w-14 md:w-16 font-medium text-base",
                row: "flex w-full mt-3",
                cell: "relative p-0 text-center text-base focus-within:relative focus-within:z-20",
                day: "h-14 w-14 md:h-16 md:w-16 p-0 font-normal rounded-full hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                day_range_end: "day-range-end",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
                day_today: "bg-accent text-accent-foreground rounded-full",
                day_outside: "text-gray-400 opacity-50 hover:bg-accent/50",
                day_disabled: "text-gray-400 opacity-50",
                day_hidden: "invisible",
                day_range_middle: "rounded-full"
              }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}