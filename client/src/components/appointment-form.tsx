import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { appointmentSchema, type InsertAppointment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface AppointmentFormProps {
  defaultValues?: Partial<InsertAppointment>;
}

export function AppointmentForm({ defaultValues }: AppointmentFormProps) {
  const { toast } = useToast();
  const form = useForm<InsertAppointment>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaultValues || {
      patientName: "",
      email: "",
      phone: "",
      specialty: "",
      location: "",
      provider: "",
      date: new Date(),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Agendamento realizado",
        description: "Seu agendamento foi confirmado com sucesso!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro no agendamento",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Paciente</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Agendando..." : "Agendar Consulta"}
        </Button>
      </form>
    </Form>
  );
}
