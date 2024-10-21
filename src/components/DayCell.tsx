import React from "react";

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

interface DayCellProps {
  day: Day;
  events: Event[] | undefined;
  selectedDay: string | null;
  onDayClick: () => void;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  events = [],
  onDayClick,
  onEventClick,
}) => {
  return (
    <div
      className={`${day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500"} h-[120px] relative px-3 py-2 cursor-pointer`}
      onClick={onDayClick}
    >
      <time
        dateTime={day.date}
        className={`${day.isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" : ""}`}
      >
        {day.date.split("-").pop()?.replace(/^0/, "")}
      </time>

      {events.length > 0 && (
        <ol className="mt-2">
          {events.slice(0, 2).map((event) => (
            <li key={event.id}>
              <a onClick={(e) => onEventClick(event, e)} className="group flex">
                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                  {event.title}
                </p>
              </a>
            </li>
          ))}
          {events.length > 2 && (
            <li className="text-gray-500">+ {events.length - 2} more</li>
          )}
        </ol>
      )}
    </div>
  );
};

// Memoize the component to avoid unnecessary re-renders
export default React.memo(DayCell);
