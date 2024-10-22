"use client"; // Mark this as a client-side component

import { useState, useMemo, useEffect } from "react";
import { addMonths, subMonths, format } from "date-fns";
import { Days } from "./Days";
import { CalendarHeader } from "./CalendarHeader";
import { generateDays } from "../utils/daysUtils";

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

interface Props {
  initialDays: Day[];
  currentDate: string;
}

export default function Calendar({ initialDays, currentDate }: Props) {
  const [date, setDate] = useState(new Date(currentDate));
  const [days, setDays] = useState(initialDays);
  console.log(date);

  const generatedDays = useMemo(() => generateDays(date), [date]);

  useEffect(() => {
    setDays(generatedDays);
  }, [generatedDays]);

  const goToPreviousMonth = () => setDate(subMonths(date, 1));
  const goToNextMonth = () => setDate(addMonths(date, 1));
  const goToCurrentMonth = () => setDate(new Date());

  const formattedMonth = format(date, "MMMM yyyy");

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader
        currentMonth={formattedMonth}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        goToCurrentMonth={goToCurrentMonth}
      />
      <Days days={days} />
    </div>
  );
}
