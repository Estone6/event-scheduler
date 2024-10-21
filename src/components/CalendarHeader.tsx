import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { openModal } from "src/slices/calendarSlice";

interface CalendarHeaderProps {
  currentMonth: string;
  goToPreviousMonth: () => void;
  goToCurrentMonth: () => void;
  goToNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  goToPreviousMonth,
  goToCurrentMonth,
  goToNextMonth,
}) => {
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch(openModal({ isEditMode: false, editEvent: null })); // Open modal in create mode
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime={currentMonth}>{currentMonth}</time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToCurrentMonth}
            className="flex h-9 items-center justify-center border border-gray-300 px-3 text-gray-900 hover:text-gray-800 focus:relative md:hover:bg-gray-50"
          >
            <span className="font-semibold">Today</span>
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <button
          onClick={handleAddEvent}
          className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 lg:hidden"
        >
          Add <span className="sr-only sm:not-sr-only">event</span>
        </button>
      </div>
    </header>
  );
};
