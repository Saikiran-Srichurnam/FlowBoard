
import { useMemo, useState } from "react";

import {
  ProjectHeader,
  ProjectSearchAndFilter,
  ProjectGrid,
  ProjectList,
  EditProjectModal,
} from "../../components/project";

import { useProjects } from "../../context/ProjectContext";

function ProjectPage() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedSortOption, setSelectedSortOption] = useState("Latest");

  const { projects = [], editProjectId } = useProjects();

  // Search and filter projects
  const sortedProjects = useMemo(() => {
    const filteredProjects = projects.filter((project) => {
      const projectName = project.name || "";

      const matchedSearch = projectName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchedStatus =
        selectedOption === "All" ||
        project.status === selectedOption;

      return matchedSearch && matchedStatus;
    });

    return [...filteredProjects].sort((a, b) => {
      if (selectedSortOption === "Alphabetical") {
        return (a.name || "").localeCompare(b.name || "");
      }

      if (selectedSortOption === "Latest") {
        return Number(b.id) - Number(a.id);
      }

      if (selectedSortOption === "Oldest") {
        return Number(a.id) - Number(b.id);
      }

      return 0;
    });
  }, [projects, search, selectedOption, selectedSortOption]);

  return (
    <section
      id="ProjectPage"
      className="flex min-h-full w-full min-w-0 flex-col gap-6 px-4 py-5 sm:px-6"
    >
      {/* Projects Header */}
      <ProjectHeader />

      {/* Search, Filter and View Controls */}
      <div className="min-w-0">
        <ProjectSearchAndFilter
          search={search}
          setSearch={setSearch}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
          view={view}
          setView={setView}
        />
      </div>

      {/* Projects Display */}
      <div className="min-w-0 flex-1">
        {view === "grid" ? (
          <ProjectGrid sortedProjects={sortedProjects} />
        ) : (
          <ProjectList sortedProjects={sortedProjects} />
        )}
      </div>

      {/* Edit Project Modal */}
      {editProjectId !== null && (
        <EditProjectModal projectId={editProjectId} />
      )}
    </section>
  );
}

export default ProjectPage;
