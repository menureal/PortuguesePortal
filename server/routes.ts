import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Create our own schema rather than importing from shared
const appointmentSchema = z.object({
  patientName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  specialty: z.string(),
  location: z.string(),
  provider: z.string(),
  date: z.coerce.date(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/appointments", async (req, res) => {
    try {
      const data = appointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(data);
      res.json(appointment);
    } catch (error) {
      // Handle the error response
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid input" 
      });
    }
  });

  app.get("/api/appointments", async (_req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return createServer(app);
}
