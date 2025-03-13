import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DoctorsPage from "@/pages/doctors";
import ClinicsPage from "@/pages/clinics";
import SchedulePage from "@/pages/schedule";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/medicos" component={DoctorsPage} />
      <Route path="/clinicas" component={ClinicsPage} />
      <Route path="/agendar" component={SchedulePage} />
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