import { appointments, type Appointment, type InsertAppointment } from "@shared/schema";

export interface IStorage {
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private appointments: Map<number, Appointment>;
  private currentId: number;

  constructor() {
    this.appointments = new Map();
    this.currentId = 1;
  }

  async createAppointment(data: InsertAppointment): Promise<Appointment> {
    const id = this.currentId++;
    const appointment: Appointment = {
      ...data,
      id,
      status: "pending"
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
}

export const storage = new MemStorage();
