
import { FolderKanban } from "lucide-react";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ sortedProjects = [] }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3 sm:p-4">
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <ProjectCard
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
            />
          ))}
        </div>
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
            your filters to see more projects.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectGrid;
