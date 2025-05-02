import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define types locally for this API endpoint

// Create zod schema for appointments
const appointmentSchema = z.object({
  patientName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  specialty: z.string(),
  location: z.string(),
  provider: z.string(),
  date: z.string().transform(val => new Date(val)),
});

// In-memory storage for appointments
const appointments = new Map<number, any>();
let currentId = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = appointmentSchema.parse(body);
    
    const id = currentId++;
    const appointment = {
      ...data,
      id,
      status: "pending"
    };
    
    appointments.set(id, appointment);
    
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Invalid input data" 
    }, { status: 400 });
  }
}

export async function GET() {
  try {
    const allAppointments = Array.from(appointments.values());
    return NextResponse.json(allAppointments);
  } catch (error) {
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}