import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { appointmentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/appointments", async (req, res) => {
    try {
      const data = appointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(data);
      res.json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ 
          message: fromZodError(error).message 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
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
