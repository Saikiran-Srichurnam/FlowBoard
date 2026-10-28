import { useState } from "react";
import { useTasks } from "../../context"

function CalendarPage() {
  const { tasks } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full min-w-0 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => changeMonth(-1)}>
          Previous
        </button>

        <h1 className="text-xl font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <button onClick={() => changeMonth(1)}>
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          )
        )}

        {Array.from({ length: firstDay }, (_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;

          const dateString = [
            year,
            String(month + 1).padStart(2, "0"),
            String(day).padStart(2, "0"),
          ].join("-");

          const dayTasks = tasks.filter(
            (task) => task.dueDate === dateString
          );

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateString)}
              className={`group min-h-24 cursor-pointer rounded-lg border p-2 transition-colors hover:bg-primary/5 ${selectedDate === dateString
                ? "border-primary bg-primary/10 font-semibold text-primary"
                : ""
                }`}
            >
              <p className="font-medium">{day}</p>

              {dayTasks.map((task) => (
                <p
                  key={task.id}
                  className="group-hover:text-primary mt-1 rounded p-2 text-md"
                >
                  {task.title}
                </p>
              ))}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-6 rounded-xl border p-4">
          <h2 className="mb-3 text-lg font-semibold">
            Tasks for {selectedDate}
          </h2>

          {tasks.filter((task) => task.dueDate === selectedDate).length === 0 ? (
            <p className="text-gray-500">
              No tasks scheduled for this date.
            </p>
          ) : (
            tasks
              .filter((task) => task.dueDate === selectedDate)
              .map((task) => (
                <div key={task.id} className="mb-2 rounded-lg bg-primary/10 p-3">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm">Status: {task.status}</p>
                  <p className="text-sm">Priority: {task.priority}</p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;