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

interface DayCellMobileProps {
  day: Day;
  events: Event[] | undefined;
  selectedDay: string | null;
  onDayClick: () => void;
}

const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const DayCellMobile: React.FC<DayCellMobileProps> = ({
  day,
  events = [],
  selectedDay,
  onDayClick,
}) => {
  return (
    <button
      key={day.date}
      onClick={onDayClick}
      type="button"
      className={classNames(
        day.isCurrentMonth ? "bg-white" : "bg-gray-50",
        day.isToday && "font-semibold",
        "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
      )}
    >
      <time
        dateTime={day.date}
        className={classNames(
          day.date === selectedDay &&
            "flex h-6 w-6 items-center justify-center rounded-full text-white",
          day.date === selectedDay && day.isToday && "bg-indigo-600",
          day.date === selectedDay && !day.isToday && "bg-gray-900",
          day.date !== selectedDay && day.isToday && "text-indigo-600",
          "ml-auto",
        )}
      >
        {day.date.split("-").pop()?.replace(/^0/, "")}
      </time>
      <span className="sr-only">{events?.length} events</span>
      {events?.length > 0 && (
        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
          {events.map((event) => (
            <span
              key={event.id}
              className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
            />
          ))}
        </span>
      )}
    </button>
  );
};

export default React.memo(DayCellMobile);
