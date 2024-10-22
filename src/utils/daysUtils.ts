import {
  addDays,
  format,
  getDay,
  getDaysInMonth,
  isToday,
  startOfMonth,
} from "date-fns";

export interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

export const generateDays = (date: Date): Day[] => {
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
