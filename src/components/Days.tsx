import {
  addDays,
  format,
  getDay,
  getDaysInMonth,
  isToday,
  startOfMonth,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEventFormData,
  openModal,
  setSelectedDay,
} from "src/slices/calendarSlice";
import { RootState } from "src/store";

import DayCell from "./DayCell";
import DayCellMobile from "./DayCellMobile";
import DayOfWeekHeader from "./DayOfWeekHeader";
import EventList from "./EventList";

interface DaysProps {
  currentDate: Date;
}

interface Event {
  id: number;
  title: string;
  description: string;
}

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

export const Days: React.FC<DaysProps> = ({ currentDate }) => {
  const dispatch = useDispatch();
  const { events, selectedDay } = useSelector(
    (state: RootState) => state.calendar,
  );
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<Day[]>([]);

  // Memoize the generated days to avoid recalculating them unnecessarily
  const generatedDays = useMemo(() => generateDays(currentDate), [currentDate]);

  useEffect(() => {
    setDays(generatedDays);
    setLoading(false);
  }, [generatedDays]);

  const handleDaySelectMobile = (day: Day) => {
    dispatch(setSelectedDay(day.date));
  };

  const handleDayClick = (day: Day) => {
    dispatch(setSelectedDay(day.date));
    dispatch(openModal({ isEditMode: false, editEvent: null })); // Open modal in create mode
    dispatch(clearEventFormData());
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the day click
    dispatch(openModal({ isEditMode: true, editEvent: event })); // Open modal in edit mode
  };

  // Render a loading spinner or skeleton when the days are being generated
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        {/* Replace this with your preferred loading spinner or skeleton */}
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      {/* Day of the week headers */}
      <DayOfWeekHeader />

      {/* Day cells */}
      <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
          {days.map((day) => (
            <DayCell
              key={day.date}
              day={day}
              events={events[day.date]}
              selectedDay={selectedDay}
              onDayClick={() => handleDayClick(day)}
              onEventClick={handleEventClick}
            />
          ))}
        </div>
        {/* Mobile Day Cells */}
        <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
          {days.map((day) => (
            <DayCellMobile
              key={day.date}
              day={day}
              events={events[day.date]}
              selectedDay={selectedDay}
              onDayClick={() => handleDaySelectMobile(day)}
            />
          ))}
        </div>
      </div>

      {/* Event list for the selected day */}
      {selectedDay && events[selectedDay]?.length > 0 && (
        <EventList
          events={events[selectedDay]}
          onEventClick={handleEventClick}
        />
      )}
    </div>
  );
};

// Generate days for the current month
const generateDays = (date: Date): Day[] => {
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = startOfMonth(date);
  const dayOfWeekOfFirstDay = getDay(firstDayOfMonth);

  const daysArray: Day[] = [];
  const previousMonthDays = [];
  const nextMonthDays = [];

  // Generate previous month's trailing days
  for (let i = 0; i < dayOfWeekOfFirstDay; i++) {
    const previousDay = addDays(firstDayOfMonth, i - dayOfWeekOfFirstDay);
    previousMonthDays.push({
      date: format(previousDay, "yyyy-MM-dd"),
      isCurrentMonth: false,
    });
  }

  // Generate days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = addDays(firstDayOfMonth, i - 1);
    daysArray.push({
      date: format(day, "yyyy-MM-dd"),
      isCurrentMonth: true,
      isToday: isToday(day),
    });
  }

  // Fill up the remaining cells with next month's days
  const remainingCells = 35 - (previousMonthDays.length + daysArray.length);
  for (let i = 0; i < remainingCells; i++) {
    const nextDay = addDays(firstDayOfMonth, daysInMonth + i);
    nextMonthDays.push({
      date: format(nextDay, "yyyy-MM-dd"),
      isCurrentMonth: false,
    });
  }

  return [...previousMonthDays, ...daysArray, ...nextMonthDays];
};
