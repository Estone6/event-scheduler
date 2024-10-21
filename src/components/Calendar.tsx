"use client";
import { addMonths, format, subMonths } from "date-fns";
import { useMemo, useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { Days } from "./Days";
import { EventModal } from "./Modal/EventModal";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Handles month navigation based on the direction passed
  const handleMonthChange = (direction: "previous" | "current" | "next") => {
    setCurrentDate((prevDate) => {
      switch (direction) {
        case "previous":
          return subMonths(prevDate, 1);
        case "next":
          return addMonths(prevDate, 1);
        case "current":
        default:
          return new Date();
      }
    });
  };

  // Memoize the formatted current month to avoid reformatting unnecessarily
  const currentMonth = useMemo(
    () => format(currentDate, "MMMM yyyy"),
    [currentDate],
  );

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader
        currentMonth={currentMonth}
        goToPreviousMonth={() => handleMonthChange("previous")}
        goToCurrentMonth={() => handleMonthChange("current")}
        goToNextMonth={() => handleMonthChange("next")}
      />
      <Days currentDate={currentDate} />
      <EventModal />
    </div>
  );
}
