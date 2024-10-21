import React from "react";

interface Event {
  id: number;
  title: string;
  description: string;
}

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:hidden">
      <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
        {events.map((event) => (
          <li
            key={event.id}
            className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
          >
            <div className="flex-auto">
              <p className="font-semibold text-gray-900">{event.title}</p>
            </div>
            <button
              onClick={(e) => onEventClick(event, e)}
              className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
            >
              Edit<span className="sr-only">, {event.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default React.memo(EventList);
