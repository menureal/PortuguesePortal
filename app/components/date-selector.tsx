'use client';

import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DateSelectorProps {
  onDateSelect: (date: Date | undefined) => void;
  selectedDate?: Date;
  className?: string;
}

export default function DateSelector({ onDateSelect, selectedDate, className = "" }: DateSelectorProps) {
  // Get current date parts from selectedDate or default to current date
  const defaultDate = selectedDate || new Date();
  
  const [day, setDay] = useState<string>(defaultDate.getDate().toString());
  const [month, setMonth] = useState<string>((defaultDate.getMonth() + 1).toString());
  const [year, setYear] = useState<string>(defaultDate.getFullYear().toString());

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  // Months (1-12)
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
  // Years (current year + 2 years ahead)
  const currentYear = new Date().getFullYear();
  const years = [
    currentYear.toString(),
    (currentYear + 1).toString(),
    (currentYear + 2).toString()
  ];

  // Get formatted month name
  const getMonthName = (monthNumber: string) => {
    return format(new Date(2025, parseInt(monthNumber) - 1), "MMMM", { locale: ptBR });
  };

  // Handle date changes
  const handleDateChange = (type: 'day' | 'month' | 'year', value: string) => {
    let newDay = day;
    let newMonth = month;
    let newYear = year;
    
    if (type === 'day') {
      newDay = value;
      setDay(value);
    } else if (type === 'month') {
      newMonth = value;
      setMonth(value);
      
      // Adjust day if necessary (e.g., if selected day is 31 but new month only has 30 days)
      const lastDayOfMonth = new Date(parseInt(year), parseInt(value), 0).getDate();
      if (parseInt(day) > lastDayOfMonth) {
        newDay = lastDayOfMonth.toString();
        setDay(newDay);
      }
    } else {
      newYear = value;
      setYear(value);
    }
    
    const newDate = new Date(
      parseInt(newYear),
      parseInt(newMonth) - 1,
      parseInt(newDay)
    );
    
    onDateSelect(newDate);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select 
        value={day} 
        onValueChange={(value) => handleDateChange('day', value)}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Dia" />
        </SelectTrigger>
        <SelectContent>
          {days.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={month} 
        onValueChange={(value) => handleDateChange('month', value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m} value={m}>
              {getMonthName(m)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={year} 
        onValueChange={(value) => handleDateChange('year', value)}
      >
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}