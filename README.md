# Event Scheduler

## Overview

This is an event scheduler application built with React and Next.js, which allows users to navigate through months, view daily events, and create, update, or delete events. The application uses `date-fns` for date manipulation and Redux for state management.

## Features

- **Monthly Navigation**: Navigate between months (previous, next, or current month) with a responsive header.
- **Event Management**: Users can create, edit, or delete events for specific days.
- **Responsive Design**: The calendar adapts to different screen sizes, providing a seamless experience on both mobile and desktop.
- **Redux State Management**: Events and selected days are managed globally using Redux, ensuring that the state is shared across components.
- **Loading State**: The application includes a loading state for when days are being generated or fetched.
- **Modal for Event Editing**: A modal window appears when creating or editing an event, ensuring an intuitive user experience.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your local development environment:

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Estone6/event-scheduler.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-scheduler
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```

## Folder Structure

```bash
EVENT-SCHEDULER/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   │   ├── GeistMonoVF.woff
│   │   │   ├── GeistVF.woff
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components/
│   │   ├── Modal/
│   │   ├── Calendar.tsx
│   │   ├── CalendarHeader.tsx
│   │   ├── DayCell.tsx
│   │   ├── DayCellMobile.tsx
│   │   ├── DayOfWeekHeader.tsx
│   │   ├── Days.tsx
│   │   ├── EventList.tsx
│   │   ├── Providers.tsx
│   ├── slices/
│   │   ├── calendarSlice.ts
│   ├── styles/
│   │   ├── tailwind.css
│   ├── store.ts
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
```

### Key Components

1. **Calendar**: The main calendar component that combines navigation, day cells, and event handling.
2. **CalendarHeader**: Handles month navigation (previous, next, and current month).
3. **Days**: Displays the grid of days for the selected month, and manages event handling for each day.
4. **DayCell & DayCellMobile**: Displays individual days in desktop and mobile views.
5. **EventModal**: A modal for adding, editing, and deleting events for selected days.

### Features

1. **Month Navigation**:
   - The calendar allows users to navigate between previous and next months using buttons.
   - The Today button takes the user back to the current month.
2. **Event Management**:
   - In Desktop View, the user can click on a day cell to create an event.
   - In Mobile View, the user can select a day and click on the Add Event/Add button in the header to create an event.
   - In Desktop View, the user can click on any event to Update/Delete the event.
   - In Mobile View, the user can select the day and the event list will be shown below, and from the event list, the user can click on the Edit button to edit the respective event.
   - The events are stored in Redux, making the state globally available across the application.
3. **Loading State**:
   - While the days are being generated or loaded, a loading text is shown.
4. **Responsive Design**:
   - The calendar layout adapts to mobile and desktop screens, with a different rendering logic for day cells on smaller screens.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev` or `yarn dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start` or `yarn start`

Runs the application in production mode after it is built.

### `npm run lint` or `yarn lint`

Lints the project code using ESLint.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Next.js**: React framework for server-side rendering and routing.
- **Redux**: State management for handling states globally.
- **date-fns**: Library for handling date manipulation.
- **TailwindCSS**: CSS framework for styling components.
- **TypeScript**: For adding static types.

### Code Formatting

This project uses ESLint for code formatting and linting. Run the following command to format your code:

```bash
npm run lint
```
