
import { useKanban } from "../../context/KanbanContext";
import KanbanTaskCard from "./KanbanTaskCard";
import { useDroppable } from "@dnd-kit/core";

function KanbanColumnItem({ column, filteredTasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.status,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-red-50 text-red-500";
      case "In Progress":
        return "bg-yellow-50 text-yellow-500";
      case "Review":
        return "bg-blue-50 text-blue-500";
      case "Done":
        return "bg-success/10 text-success";
      default:
        return "bg-gray-400";
    }
  };

  const columnTasks =
    filteredTasks?.filter(
      (task) => task.status === column.status
    ) || [];

  return (
    <div
      ref={setNodeRef}
      className={`w-[320px] min-w-[320px] shrink-0 sm:w-90 p-2 lg:w-auto lg:min-w-0 lg:flex-1 text-sm font-semibold border shadow-sm rounded-md transition-transform duration-200
        ${getStatusColor(column.status)}
        ${
          isOver
            ? "border-primary/20 ring-2 ring-primary/40 scale-[1.01] duration-300 transition-all"
            : "border-border"
        }`}
    >
      <div title={column.title}>
        <div className="flex items-center justify-between mb-3">
          <h1>{column.status}</h1>

          <span className="px-2 py-1 rounded-full bg-surface text-heading text-xs border border-border">
            {columnTasks.length}
          </span>
        </div>

        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <KanbanTaskCard
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              dueDate={task.dueDate}
              assignee={task.assignee}
              status={task.status}
            />
          ))
        ) : (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-4 text-center">
            <p className="text-xs font-medium text-muted">
              No tasks here
            </p>

            <p className="mt-1 text-[10px] text-muted">
              Drag a task here to move it
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({ filteredTasks }) {
  const { kanban } = useKanban();

  return (
    <div className="bg-background h-full w-full min-w-0">
      <div className="flex gap-3 overflow-x-auto p-2">
        {kanban.map((column) => (
          <KanbanColumnItem
            key={`kanban-${column.status}`}
            column={column}
            filteredTasks={filteredTasks}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
