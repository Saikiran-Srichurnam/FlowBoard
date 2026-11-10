
import { useEffect, useMemo, useState } from "react";
import { Users, X } from "lucide-react";
import Button from "../ui/Button";
import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TasksContext";

function TeamsMembersList() {
  const { projects = [] } = useProjects();
  const { tasks = [] } = useTasks();
  const [showAll, setShowAll] = useState(false);

  const members = useMemo(() => {
    const uniqueMembers = new Map();

    projects.forEach((project) => {
      (Array.isArray(project.members) ? project.members : []).forEach(
        (member) => {
          const name =
            typeof member === "string" ? member : member?.name;

          if (typeof name === "string" && name.trim()) {
            const trimmedName = name.trim();
            const key = trimmedName.toLowerCase();

            if (!uniqueMembers.has(key)) {
              uniqueMembers.set(key, {
                name: trimmedName,
                role:
                  typeof member === "object" && member?.role
                    ? member.role
                    : "Team Member",
              });
            }
          }
        }
      );
    });

    return Array.from(uniqueMembers.values());
  }, [projects]);

  const taskCounts = useMemo(() => {
    const counts = new Map();

    tasks.forEach((task) => {
      const assignees = Array.isArray(task.assignee)
        ? task.assignee
        : [task.assignee];

      assignees.forEach((assignee) => {
        const name =
          typeof assignee === "string"
            ? assignee
            : assignee?.name;

        if (typeof name === "string" && name.trim()) {
          const key = name.trim().toLowerCase();
          counts.set(key, (counts.get(key) || 0) + 1);
        }
      });
    });

    return counts;
  }, [tasks]);

  const getAssignedTasks = (memberName) =>
    taskCounts.get(memberName.toLowerCase()) || 0;

  // Lock background scrolling and support Escape key
  useEffect(() => {
    if (!showAll) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowAll(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showAll]);

  const MemberRow = ({ member }) => (
    <div className="group flex items-center justify-between gap-3 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface-hover transition-colors">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {member.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-heading">
            {member.name}
          </p>
          <p className="truncate text-[11px] text-muted">
            {member.role}
          </p>
        </div>
      </div>

      <span className="shrink-0 rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-body">
        {getAssignedTasks(member.name)} tasks
      </span>
    </div>
  );

  return (
    <>
      <section
        id="TeamsMembersList"
        className="flex h-64 min-w-0 w-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm"
      >
        <div className="flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <h2 className="text-sm font-semibold text-heading">
              Team Members
            </h2>
          </div>

          <Button
            variant="ghost"
            className="text-xs text-primary hover:bg-primary/10"
            onClick={() => setShowAll(true)}
          >
            View All
          </Button>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
          {members.length > 0 ? (
            members.map((member) => (
              <MemberRow key={member.name} member={member} />
            ))
          ) : (
            <p className="py-6 text-center text-xs text-muted">
              No team members found.
            </p>
          )}
        </div>
      </section>

      {showAll && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowAll(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-members-title"
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-surface p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />

                <h2
                  id="all-members-title"
                  className="text-base font-semibold text-heading"
                >
                  All Team Members
                </h2>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {members.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Close team members"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-heading"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
              {members.length > 0 ? (
                members.map((member) => (
                  <MemberRow key={member.name} member={member} />
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted">
                  No team members found.
                </p>
              )}
            </div>

            <div className="mt-3 flex shrink-0 justify-end border-t border-border pt-3">
              <Button
                variant="ghost"
                className="text-xs text-primary hover:bg-primary/10"
                onClick={() => setShowAll(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamsMembersList;