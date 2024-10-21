import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addEvent,
  clearEventFormData,
  closeModal,
  deleteEvent,
  setEventFormData,
  updateEvent,
} from "../../slices/calendarSlice";
import { RootState } from "../../store";

export const EventModal: React.FC = () => {
  const dispatch = useDispatch();

  // Access modal-related state from Redux
  const { isModalOpen, isEditMode, eventFormData, editEvent, selectedDay } =
    useSelector((state: RootState) => state.calendar);

  // Populate the inputs based on mode (Add/Edit)
  useEffect(() => {
    if (isEditMode && editEvent) {
      dispatch(
        setEventFormData({
          title: editEvent.title,
          description: editEvent.description,
        }),
      );
    } else {
      dispatch(clearEventFormData());
    }
  }, [isEditMode, editEvent, dispatch]);

  const handleSave = () => {
    if (
      eventFormData.title.trim() &&
      eventFormData.description.trim() &&
      selectedDay
    ) {
      const newEvent = {
        id: Date.now(),
        title: eventFormData.title,
        description: eventFormData.description,
      };
      dispatch(addEvent({ date: selectedDay, event: newEvent }));
      handleClose(); // Close the modal after saving
    }
  };

  const handleUpdate = () => {
    if (
      editEvent &&
      selectedDay &&
      eventFormData.title.trim() &&
      eventFormData.description.trim()
    ) {
      const updatedEvent = {
        ...editEvent,
        title: eventFormData.title,
        description: eventFormData.description,
      };
      dispatch(updateEvent({ date: selectedDay, event: updatedEvent }));
      handleClose(); // Close the modal after updating
    }
  };

  const handleDelete = () => {
    if (editEvent && selectedDay) {
      dispatch(deleteEvent({ date: selectedDay, eventId: editEvent.id }));
      handleClose(); // Close the modal after deleting
    }
  };

  const handleClose = () => {
    dispatch(closeModal()); // Dispatch action to close the modal
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEditMode ? "Update Event" : "Create Event"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={eventFormData.title}
              onChange={(e) =>
                dispatch(
                  setEventFormData({ ...eventFormData, title: e.target.value }),
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={eventFormData.description}
              onChange={(e) =>
                dispatch(
                  setEventFormData({
                    ...eventFormData,
                    description: e.target.value,
                  }),
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Enter event description"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer - Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          {isEditMode ? (
            <div className="space-x-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
            </div>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
