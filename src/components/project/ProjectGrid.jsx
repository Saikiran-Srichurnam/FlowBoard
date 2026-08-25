import ProjectCard from "./ProjectCard";

function ProjectGrid({ sortedProjects }) {

  return (
    <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}

export default ProjectGrid;