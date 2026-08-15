import { LayoutGrid, List } from "lucide-react";

function ProjectViewToggle({ view, setView }) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-surface p-1 shadow-sm">

      {/* Grid */}
      <button
        type="button"
        onClick={() => setView("grid")}
        className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${view === "grid"
          ? "bg-primary text-background"
          : "text-muted hover:bg-surface hover:text-heading"
          }`}
        aria-label="Grid view"
      >
        <LayoutGrid size={17} />
      </button>

      {/* List */}
      <button
        type="button"
        onClick={() => setView("list")}
        className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${view === "list"
          ? "bg-primary text-background"
          : "text-muted hover:bg-surface hover:text-heading"
          }`}
        aria-label="List view"
      >
        <List size={17} />
      </button>

    </div>
  );
}

export default ProjectViewToggle;