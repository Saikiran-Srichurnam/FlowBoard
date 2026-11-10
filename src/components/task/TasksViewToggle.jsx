
import { LayoutGrid, List } from "lucide-react";

function TasksViewToggle({ view, setView }) {
  const buttonClass = (isActive) =>
    `flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "text-muted hover:bg-surface-hover hover:text-heading"
    }`;

  return (
    <div
      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-surface p-1 shadow-sm"
      role="group"
      aria-label="Task view options"
    >
      {/* Grid View */}
      <button
        type="button"
        onClick={() => setView("grid")}
        className={buttonClass(view === "grid")}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
        title="Grid view"
      >
        <LayoutGrid size={17} strokeWidth={2} />
      </button>

      {/* List View */}
      <button
        type="button"
        onClick={() => setView("list")}
        className={buttonClass(view === "list")}
        aria-label="List view"
        aria-pressed={view === "list"}
        title="List view"
      >
        <List size={18} strokeWidth={2} />
      </button>
    </div>
  );
}

export default TasksViewToggle;
