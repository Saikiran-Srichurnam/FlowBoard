
import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button";
import { useTasks } from "../../context/TasksContext";
import { useProjects } from "../../context/ProjectContext";

function AddNewTaskModal() {
  const taskStatuses = ["To Do", "In Progress", "Review", "Done"];
  const taskPriorities = ["High", "Medium", "Low"];

  const { handleCloseModal, addTasks, } = useTasks();
  const { projects } = useProjects();

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");
  const [progress, setProgress] = useState(0);

  const [projectId, setProjectId] = useState(
    () => projects[0]?.id ?? ""
  );
  const [taskMembers, setTaskMembers] = useState([]);

  const getDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [dueDate, setDueDate] = useState(getDefaultDueDate);

  const selectedProject = projects.find(
    (project) => String(project.id) === String(projectId)
  );

  const projectMembers = selectedProject?.members || [];

  // Lock background scrolling and support Escape key.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleCloseModal]);

  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
    setTaskMembers([]);
  };

  const handleMemberSelection = (event) => {
    const { value, checked } = event.target;

    setTaskMembers((previousMembers) =>
      checked
        ? [...previousMembers, value]
        : previousMembers.filter((member) => member !== value)
    );
  };

  const handleSaveTask = () => {
    if (!taskTitle.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!projectId || !selectedProject) {
      alert("Please select a project for this task.");
      return;
    }

    if (projectMembers.length === 0) {
      alert("Please add team members to the selected project first.");
      return;
    }

    if (taskMembers.length === 0) {
      alert("Please select at least one task member.");
      return;
    }

    const newTaskData = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status,
      priority,
      progress: Math.min(100, Math.max(0, Number(progress) || 0)),
      projectId: Number(projectId),
      assignee: [...taskMembers],
      dueDate,
    };

    addTasks(newTaskData);
    handleCloseModal();
  };

  const fieldClass =
    "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-heading outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleCloseModal}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2
              id="add-task-title"
              className="text-lg font-semibold text-heading"
            >
              Add Task
            </h2>
            <p className="mt-1 text-xs text-muted">
              Create a task and assign it to your project team.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close modal"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-heading"
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          {/* Task details */}
          <Input
            type="text"
            label="Task Name"
            placeholder="e.g. Create User Login Page"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            required
          />

          <Input
            type="text"
            label="Description"
            placeholder="Briefly describe your task"
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
          />

          {/* Status and priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Status */}
            <div className="min-w-0">
              <label className="mb-2 block text-xs font-medium text-body">
                Task Status
              </label>

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isStatusOpen}
                  onClick={() => {
                    setIsStatusOpen((previous) => !previous);
                    setIsPriorityOpen(false);
                  }}
                  className={`${fieldClass} flex items-center justify-between`}
                >
                  <span>{status}</span>
                  <ChevronDown
                    size={17}
                    className={`text-muted transition-transform ${isStatusOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isStatusOpen && (
                  <ul className="absolute left-0 right-0 top-full z-30 mt-2 rounded-lg border border-border bg-surface p-1 shadow-xl">
                    {taskStatuses.map((taskStatus) => (
                      <li key={taskStatus}>
                        <button
                          type="button"
                          onClick={() => {
                            setStatus(taskStatus);
                            setIsStatusOpen(false);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover ${status === taskStatus
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-body"
                            }`}
                        >
                          {taskStatus}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Priority */}
            <div className="min-w-0">
              <label className="mb-2 block text-xs font-medium text-body">
                Task Priority
              </label>

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isPriorityOpen}
                  onClick={() => {
                    setIsPriorityOpen((previous) => !previous);
                    setIsStatusOpen(false);
                  }}
                  className={`${fieldClass} flex items-center justify-between`}
                >
                  <span>{priority}</span>
                  <ChevronDown
                    size={17}
                    className={`text-muted transition-transform ${isPriorityOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isPriorityOpen && (
                  <ul className="absolute left-0 right-0 top-full z-30 mt-2 rounded-lg border border-border bg-surface p-1 shadow-xl">
                    {taskPriorities.map((taskPriority) => (
                      <li key={taskPriority}>
                        <button
                          type="button"
                          onClick={() => {
                            setPriority(taskPriority);
                            setIsPriorityOpen(false);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover ${priority === taskPriority
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-body"
                            }`}
                        >
                          {taskPriority}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Due date and progress */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="task-due-date"
                className="mb-2 block text-xs font-medium text-body"
              >
                Due Date
              </label>

              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="task-progress"
                className="mb-2 block text-xs font-medium text-body"
              >
                Progress (%)
              </label>

              <input
                id="task-progress"
                type="number"
                min="0"
                max="100"
                className={fieldClass}
                value={progress}
                onChange={(event) => setProgress(event.target.value)}
              />
            </div>
          </div>

          {/* Related project */}
          <div>
            <label
              htmlFor="task-project"
              className="mb-2 block text-xs font-medium text-body"
            >
              Related Project
            </label>

            <select
              id="task-project"
              value={projectId}
              onChange={handleProjectChange}
              className={fieldClass}
            >
              <option value="" disabled>
                Select a project
              </option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team members */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-medium text-body">
                Assign Members
              </label>

              <span className="text-xs text-muted">
                {taskMembers.length} selected
              </span>
            </div>

            {projectMembers.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {projectMembers.map((member) => {
                  const isSelected = taskMembers.includes(member);

                  return (
                    <label
                      key={member}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${isSelected
                        ? "border-primary/50 bg-primary/5"
                        : "border-border bg-background hover:bg-surface-hover"
                        }`}
                    >
                      <input
                        type="checkbox"
                        value={member}
                        checked={isSelected}
                        onChange={handleMemberSelection}
                        className="h-4 w-4 accent-primary"
                      />

                      <span className="text-sm font-medium text-heading">
                        {member}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted">
                {selectedProject
                  ? "No team members found in this project."
                  : "Select a project to view its team members."}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 border-t border-border bg-surface px-5 py-4 sm:px-6">
          <Button
            onClick={handleCloseModal}
            className="border border-border"
          >
            Cancel
          </Button>

          <Button onClick={handleSaveTask}>
            Save Task
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default AddNewTaskModal;
