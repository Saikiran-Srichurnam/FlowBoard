
import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button";
import { useProjects } from "../../context/ProjectContext";

function AddNewProjectModal() {
  const projectStatuses = [
    "Active",
    "Review",
    "Completed",
    "On Hold",
  ];
  const allProjectMembers = ["Saikiran", "Rahul", "Priya", "Ankit"];

  const [isOpen, setIsOpen] = useState(false);
  const [optionSelect, setOptionSelect] = useState("Active");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectProgress, setProjectProgress] = useState(0);
  const [projectTasks, setProjectTasks] = useState(0);
  const [projectMembers, setProjectMembers] = useState([]);

  const { addProject, handleCloseModal } = useProjects();

  // Lock background scrolling and support Escape key
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

  const getDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleMemberSelection = (event) => {
    const { value, checked } = event.target;

    setProjectMembers((previousMembers) =>
      checked
        ? [...previousMembers, value]
        : previousMembers.filter((member) => member !== value)
    );
  };

  const handleSaveProjectInfo = () => {
    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    if (projectMembers.length === 0) {
      alert("Please select at least one team member");
      return;
    }

    const newProjectData = {
      id: Date.now(),
      name: projectName.trim(),
      description: projectDescription.trim() || "No description provided",
      status: optionSelect,
      progress: Math.min(100, Math.max(0, Number(projectProgress) || 0)),
      dueDate: getDueDate(),
      tasks: Math.max(0, Number(projectTasks) || 0),
      members: [...projectMembers],
    };

    addProject(newProjectData);

    setProjectName("");
    setProjectDescription("");
    setOptionSelect("Active");
    setProjectProgress(0);
    setProjectTasks(0);
    setProjectMembers([]);
    setIsOpen(false);

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
        aria-labelledby="add-project-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2
              id="add-project-title"
              className="text-lg font-semibold text-heading"
            >
              Add Project
            </h2>
            <p className="mt-1 text-xs text-muted">
              Create a project and assign your team members.
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
          {/* Project name */}
          <Input
            type="text"
            label="Project Name"
            placeholder="e.g. E-commerce Platform"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            required
          />

          {/* Description */}
          <Input
            type="text"
            label="Description"
            placeholder="Briefly describe your project"
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
          />

          {/* Status and progress */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Status */}
            <div className="min-w-0">
              <label className="mb-2 block text-xs font-medium text-body">
                Project Status
              </label>

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen((previous) => !previous)}
                  className={`${fieldClass} flex items-center justify-between`}
                >
                  <span>{optionSelect}</span>
                  <ChevronDown
                    size={17}
                    className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isOpen && (
                  <ul className="absolute left-0 right-0 top-full z-30 mt-2 rounded-lg border border-border bg-surface p-1 shadow-xl">
                    {projectStatuses.map((status) => (
                      <li key={status}>
                        <button
                          type="button"
                          onClick={() => {
                            setOptionSelect(status);
                            setIsOpen(false);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover ${optionSelect === status
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-body"
                            }`}
                        >
                          {status}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Progress */}
            <div>
              <label
                htmlFor="project-progress"
                className="mb-2 block text-xs font-medium text-body"
              >
                Progress (%)
              </label>

              <input
                id="project-progress"
                type="number"
                min="0"
                max="100"
                className={fieldClass}
                value={projectProgress}
                onChange={(event) =>
                  setProjectProgress(event.target.value)
                }
              />
            </div>
          </div>

          {/* Due date */}
          <div className="rounded-lg border border-border bg-background px-4 py-3">
            <p className="text-xs font-medium text-muted">Due Date</p>
            <p className="mt-1 text-sm font-medium text-heading">
              {getDueDate()}
            </p>
            <p className="mt-1 text-xs text-muted">
              Automatically set to 7 days from today.
            </p>
          </div>

          {/* Team members */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-medium text-body">
                Team Members
              </label>
              <span className="text-xs text-muted">
                {projectMembers.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {allProjectMembers.map((member) => {
                const isSelected = projectMembers.includes(member);

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
          </div>

          {/* Total tasks */}
          <div>
            <label
              htmlFor="project-tasks"
              className="mb-2 block text-xs font-medium text-body"
            >
              Total Tasks
            </label>

            <input
              id="project-tasks"
              type="number"
              min="0"
              className={fieldClass}
              value={projectTasks}
              onChange={(event) => setProjectTasks(event.target.value)}
            />
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

          <Button onClick={handleSaveProjectInfo}>
            Save Project
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default AddNewProjectModal;
