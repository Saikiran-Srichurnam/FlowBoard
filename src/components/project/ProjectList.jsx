
import { FolderKanban } from "lucide-react";
import ProjectRow from "./ProjectRow";

function ProjectList({ sortedProjects = [] }) {
  const columns =
    "grid-cols-[minmax(220px,2fr)_minmax(110px,1fr)_minmax(140px,1.2fr)_minmax(70px,0.6fr)_minmax(120px,1fr)_minmax(140px,1.2fr)_40px]";

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      {sortedProjects.length > 0 ? (
        <>
          <div
            className={`grid ${columns} min-w-[1020px] items-center gap-3 border-b border-border bg-background px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted`}
          >
            <span>Project</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Tasks</span>
            <span>Due Date</span>
            <span>Team</span>
            <span></span>
          </div>

          {sortedProjects.map((project) => (
            <ProjectRow
              key={project.id}
              id={project.id}
              image={project.image}
              name={project.name}
              description={project.description}
              status={project.status}
              progress={project.progress}
              dueDate={project.dueDate}
              tasks={project.tasks}
              members={project.members}
              columns={columns}
            />
          ))}
        </>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderKanban size={26} />
          </div>

          <h3 className="text-base font-semibold text-heading">
            No projects found
          </h3>

          <p className="mt-1 max-w-xs text-sm leading-6 text-muted">
            No projects match your current search or filters. Try adjusting
            your filters or create a new project.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
