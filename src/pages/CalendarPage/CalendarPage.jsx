
import { useState } from "react";
import { useTasks } from "../../context";

function CalendarPage() {
  const { tasks } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  return (
    <div className="w-full min-w-0 p-3 sm:p-6">
      {/* Calendar Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => changeMonth(-1)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-hover"
        >
          Previous
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-heading sm:text-xl">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>

          <button
            onClick={() => {
              setCurrentDate(new Date());
              setSelectedDate(null);
            }}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Today
          </button>
        </div>

        <button
          onClick={() => changeMonth(1)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-hover"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="rounded-lg py-2 text-center text-xs font-semibold text-muted sm:text-sm"
            >
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

          const isToday = dateString === todayString;
          const isSelected = selectedDate === dateString;

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateString)}
              className={`group min-h-24 min-w-0 cursor-pointer overflow-hidden rounded-lg border border-border p-1.5 transition-colors hover:bg-surface-hover sm:p-2 ${
                isSelected
                  ? "border-primary bg-primary/10 font-semibold text-primary"
                  : isToday
                    ? "border-primary/50 bg-primary/5"
                    : "bg-surface"
              }`}
            >
              <p
                className={`font-medium ${
                  isToday || isSelected
                    ? "font-semibold text-primary"
                    : "text-heading"
                }`}
              >
                {day}
                {isToday && (
                  <span className="ml-1 text-[10px] font-semibold">
                    Today
                  </span>
                )}
              </p>

              {/* Responsive Task Labels */}
              {dayTasks.map((task) => (
                <p
                  key={task.id}
                  title={task.title}
                  className="mt-1 min-w-0 line-clamp-2 whitespace-normal break-words rounded-md bg-primary/10 px-1 py-1 text-[9px] font-medium leading-tight text-primary transition-colors group-hover:bg-primary/15 sm:px-2 sm:text-sm sm:leading-normal"
                >
                  {task.title}
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <div className="mt-6 rounded-xl border border-border bg-surface p-4">
          <h2 className="mb-4 text-lg font-semibold text-heading">
            Tasks for {selectedDate}
          </h2>

          {tasks.filter((task) => task.dueDate === selectedDate).length === 0 ? (
            <p className="text-sm text-muted">
              No tasks scheduled for this date.
            </p>
          ) : (
            <div className="space-y-3">
              {tasks
                .filter((task) => task.dueDate === selectedDate)
                .map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-border bg-background p-3 transition-colors hover:bg-surface-hover"
                  >
                    <p className="font-medium text-heading">{task.title}</p>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
                      <span>Status: {task.status}</span>
                      <span>Priority: {task.priority}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
