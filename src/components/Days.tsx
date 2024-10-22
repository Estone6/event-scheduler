import { useDispatch, useSelector } from "react-redux";
import { clearEventFormData, openModal, setSelectedDay } from "src/slices/calendarSlice";
import { RootState } from "src/store";

import DayCell from "./DayCell";
import DayCellMobile from "./DayCellMobile";
import DayOfWeekHeader from "./DayOfWeekHeader";
import EventList from "./EventList";

interface Day {
  date: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

interface DaysProps {
  days: Day[];
}

interface Event {
  id: number;
  title: string;
  description: string;
}

export const Days: React.FC<DaysProps> = ({ days }) => {
  const dispatch = useDispatch();
  const { events, selectedDay } = useSelector(
    (state: RootState) => state.calendar,
  );

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
