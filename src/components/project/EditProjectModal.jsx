
import { useEffect, useState } from "react";
import { X, ChevronDown, Users, FolderKanban } from 'lucide-react'
import Input from '../ui/Input/Input'
import Button from '../ui/Button'
import { useProjects } from '../../context/ProjectContext'

function EditProjectModal({ projectId }) {
  const { handleCloseEditModal, projects, updateProject } = useProjects()

  const projectDetails = projects.find((p) => p.id === projectId)

  const projectStatuses = [
    { value: "Active" },
    { value: "Review" },
    { value: "Completed" },
    { value: "On Hold" },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const [optionSelect, setOptionSelect] = useState(projectDetails.status)

  const [projectName, setProjectName] = useState(projectDetails.name)
  const [projectDescription, setProjectDescription] = useState(projectDetails.description)
  const [projectProgress, setProjectProgress] = useState(projectDetails.progress || 0)
  const [projectTasks, setProjectTasks] = useState(projectDetails.tasks || 0)

  const allProjectMembers = ["Saikiran", "Rahul", "Priya", "Ankit", "Vamshi", "Ram", "Paru"]
  const [projectMembers, setProjectMembers] = useState(projectDetails?.members || [])

  const pickSelectedProjectMember = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked

    let newMembers

    if (isChecked) {
      newMembers = [...projectMembers, value]
    } else {
      newMembers = projectMembers.filter(member => member !== value)
    }

    setProjectMembers(newMembers)
  }

  const getDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleSaveProjectInfo = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name')
      return
    }

    if (projectMembers.length === 0) {
      alert('Please select at least one team member')
      return
    }

    const updatedProjectData = {
      name: projectName.trim(),
      description: projectDescription.trim() || 'No description provided',
      status: optionSelect,
      progress: Number(projectProgress) || 0,
      tasks: Number(projectTasks) || 0,
      members: [...projectMembers],
    }

    updateProject(projectId, updatedProjectData)

    setProjectName("")
    setProjectDescription("")
    setOptionSelect("Active")
    setProjectProgress(0)
    setProjectTasks(0)

    handleCloseEditModal()
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleCloseEditModal}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderKanban size={20} />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-heading">
                Edit Project
              </h1>
              <p className="text-xs text-muted">
                Update your project information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseEditModal}
            aria-label="Close modal"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-heading"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">

          {/* Project Details */}
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-heading">
                Project Details
              </h2>
              <p className="mt-1 text-xs text-muted">
                Basic information about your project
              </p>
            </div>

            <Input
              type="text"
              label="Project Name"
              placeholder="Eg: E-commerce Platform"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />

            <Input
              type="text"
              label="Description"
              placeholder="Describe your project..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </section>

          <div className="border-t border-border" />

          {/* Project Status */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-heading">
              Project Overview
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-body">
                  Status
                </label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm text-heading transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <span>{optionSelect}</span>
                    <ChevronDown
                      size={18}
                      className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-xl">
                      {projectStatuses.map((status) => (
                        <li key={status.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setOptionSelect(status.value)
                              setIsOpen(false)
                            }}
                            className={`w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover ${optionSelect === status.value
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-body"
                              }`}
                          >
                            {status.value}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <label htmlFor="progress" className="text-xs font-medium text-body">
                  Progress (%)
                </label>

                <input
                  id="progress"
                  type="number"
                  min={0}
                  max={100}
                  value={projectProgress}
                  onChange={(e) => setProjectProgress(Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
              <span className="text-xs font-medium text-body">
                Due Date
              </span>
              <span className="text-sm font-medium text-heading">
                {getDueDate()}
              </span>
            </div>

            {/* Total Tasks */}
            <Input
              type="number"
              label="Total Tasks"
              min={0}
              placeholder="0"
              value={projectTasks}
              onChange={(e) => setProjectTasks(Number(e.target.value))}
              required
            />
          </section>

          <div className="border-t border-border" />

          {/* Team Members */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <Users size={16} />
                  Team Members
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Select members working on this project
                </p>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {projectMembers.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {allProjectMembers.map((member) => {
                const selected = projectMembers.includes(member)

                return (
                  <label
                    key={member}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-3 text-sm transition-colors ${selected
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-background text-body hover:bg-surface-hover"
                      }`}
                  >
                    <input
                      type="checkbox"
                      value={member}
                      checked={selected}
                      onChange={pickSelectedProjectMember}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="truncate font-medium">{member}</span>
                  </label>
                )
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-background/50 px-6 py-4">
          <button
            type="button"
            onClick={handleCloseEditModal}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-body transition-colors hover:bg-surface-hover hover:text-heading"
          >
            Cancel
          </button>

          <Button className="px-5" onClick={handleSaveProjectInfo}>
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  )
}

export default EditProjectModal
