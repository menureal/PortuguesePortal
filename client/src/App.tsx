import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DoctorsPage from "@/pages/doctors";
import ClinicsPage from "@/pages/clinics";
import SchedulePage from "@/pages/schedule";
import ConfirmAppointmentPage from "@/pages/confirm-appointment";
import ClinicDetailsPage from "@/pages/clinic-details";
import DoctorProfilePage from "@/pages/doctor-profile";
import HospitalsPage from "@/pages/hospitals";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/medicos" component={DoctorsPage} />
      <Route path="/clinicas" component={ClinicsPage} />
      <Route path="/hospitais" component={HospitalsPage} />
      <Route path="/clinica/:id" component={ClinicDetailsPage} />
      <Route path="/medico/:id" component={DoctorProfilePage} />
      <Route path="/agendar" component={SchedulePage} />
      <Route path="/confirmar-agendamento" component={ConfirmAppointmentPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;