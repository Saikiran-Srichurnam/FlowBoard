
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import AddNewProjectModal from "./AddNewProjectModal";
import { useProjects } from "../../context/ProjectContext";

function ProjectHeader() {
  const { showModal, setShowModal } = useProjects();

  const handleAddProjectBtn = () => {
    setShowModal(true);
  };

  return (
    <section
      id="ProjectHeader"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-lg font-semibold text-heading">
          Projects
        </h1>
        <p className="text-sm text-muted">
          Manage and track your projects
        </p>
      </div>

      <Button onClick={handleAddProjectBtn}>
        <Plus size={18} />
        New Project
      </Button>

      {showModal && <AddNewProjectModal />}
    </section>
  );
}

export default ProjectHeader;
