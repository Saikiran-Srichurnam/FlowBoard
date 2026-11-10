
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import AddNewTaskModal from "./AddNewTaskModal";
import { useTasks } from "../../context/TasksContext";

function TasksHeader() {
  const { showModal, setShowModal } = useTasks();

  const handleAddTaskBtn = () => {
    setShowModal(true);
  };

  return (
    <section
      id="TasksHeader"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-lg font-semibold text-heading">
          Tasks
        </h1>
        <p className="text-sm text-muted">
          Manage and track your tasks
        </p>
      </div>

      <Button onClick={handleAddTaskBtn}>
        <Plus size={18} />
        New Task
      </Button>

      {showModal && (
        <AddNewTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </section>
  );
}

export default TasksHeader;
