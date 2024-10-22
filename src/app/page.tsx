import { generateDays } from "../utils/daysUtils";
import Calendar from "../components/Calendar"; // Import the Client Component

export default async function Home() {
  const currentDate = new Date();

  const initialDays = generateDays(currentDate);

  return (
    <div>
      <Calendar
        initialDays={initialDays}
        currentDate={currentDate.toISOString()}
      />
    </div>
  );
}
