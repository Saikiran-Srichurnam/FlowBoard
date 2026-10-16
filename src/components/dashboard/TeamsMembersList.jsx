
import { useMemo, useState } from "react";
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
            const key = name.trim().toLowerCase();

            if (!uniqueMembers.has(key)) {
              uniqueMembers.set(key, {
                name: name.trim(),
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

  const getAssignedTasks = (memberName) =>
    tasks.filter((task) => {
      const assignees = Array.isArray(task.assignee)
        ? task.assignee
        : [task.assignee];

      return assignees.some((assignee) => {
        const name =
          typeof assignee === "string"
            ? assignee
            : assignee?.name;

        return (
          typeof name === "string" &&
          name.trim().toLowerCase() === memberName.toLowerCase()
        );
      });
    }).length;

  const MemberRow = ({ member }) => (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {member.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-heading">
            {member.name}
          </p>
          <p className="truncate text-[10px] text-muted">
            {member.role}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-[10px] text-muted">
        {getAssignedTasks(member.name)} tasks
      </span>
    </div>
  );

  return (
    <>
      <section
        id="TeamsMembersList"
        className="flex h-64 w-full flex-col rounded-md border border-border bg-surface p-5 shadow-sm"
      >
        {/* Fixed heading */}
        <div className="flex shrink-0 items-center justify-between">
          <h2 className="text-sm font-semibold text-heading">
            Team Members
          </h2>

          <Button
            variant="ghost"
            className="text-xs text-primary"
            onClick={() => setShowAll(true)}
          >
            View All
          </Button>
        </div>

        {/* Scrollable members list */}
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAll(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-members-title"
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl border border-border bg-surface p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />

                <h2
                  id="all-members-title"
                  className="text-base font-semibold text-heading"
                >
                  All Team Members
                </h2>

                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {members.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Close team members"
                className="rounded-md p-2 text-muted hover:bg-background"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-2 overflow-y-auto">
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

            <div className="mt-3 flex justify-end border-t border-border pt-3">
              <Button
                variant="ghost"
                className="text-xs text-primary"
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
