// src/slices/calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  description: string;
}

interface EventFormData {
  title: string;
  description: string;
}

interface CalendarState {
  events: Record<string, Event[]>;
  selectedDay: string;
  eventFormData: EventFormData;
  isModalOpen: boolean;
  isEditMode: boolean;
  editEvent: Event | null;
}

// Initial state with modal-related states
const initialState: CalendarState = {
  events: {},
  selectedDay: format(new Date(), "yyyy-MM-dd"),
  eventFormData: { title: "", description: "" },
  isModalOpen: false,
  isEditMode: false,
  editEvent: null, // The event to edit
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (
      state,
      action: PayloadAction<{ date: string; event: Event }>,
    ) => {
      const { date, event } = action.payload;
      state.events[date] = [...(state.events[date] || []), event];
    },
    updateEvent: (
      state,
      action: PayloadAction<{ date: string; event: Event }>,
    ) => {
      const { date, event } = action.payload;
      state.events[date] = state.events[date].map((e) =>
        e.id === event.id ? event : e,
      );
    },
    deleteEvent: (
      state,
      action: PayloadAction<{ date: string; eventId: number }>,
    ) => {
      const { date, eventId } = action.payload;
      state.events[date] = state.events[date].filter(
        (event) => event.id !== eventId,
      );
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload; // Update selected day
    },
    setEventFormData: (state, action: PayloadAction<EventFormData>) => {
      state.eventFormData = action.payload; // Update form data
    },
    clearEventFormData: (state) => {
      state.eventFormData = { title: "", description: "" }; // Clear form data
    },
    openModal: (
      state,
      action: PayloadAction<{ isEditMode: boolean; editEvent: Event | null }>,
    ) => {
      state.isModalOpen = true;
      state.isEditMode = action.payload.isEditMode;
      state.editEvent = action.payload.editEvent; // Set the event to edit (if any)
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isEditMode = false;
      state.editEvent = null; // Reset edit event
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedDay,
  setEventFormData,
  clearEventFormData,
  openModal,
  closeModal,
} = calendarSlice.actions;

export default calendarSlice.reducer;
