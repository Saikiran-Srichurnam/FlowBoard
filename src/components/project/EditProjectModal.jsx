import React, { useState, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'
import Input from '../ui/Input/Input'
import Button from '../ui/Button';

// importing useProjects from the file of project context
import { useProjects } from '../../context/ProjectContext';

function EditProjectModal({ projectId }) {

  const { handleCloseEditModal, projects, updateProject } = useProjects()

  // extracting project details of the edit project id 
  const projectDetails = projects.find((p) => p.id === projectId)


  // project status
  const projectStatuses = [
    { value: "Active" },
    { value: "Completed" },
    { value: "On Hold" },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const [optionSelect, setOptionSelect] = useState(projectDetails.status)

  //Modal Data
  const [projectName, setProjectName] = useState(projectDetails.name)
  const [projectDescription, setProjectDescription] = useState(projectDetails.description)
  const [projectProgress, setProjectProgress] = useState(projectDetails.progress || 0)
  const [projectTasks, setProjectTasks] = useState(projectDetails.tasks || 0)

  // total members present in development team
  const allProjectMembers = ["Saikiran", "Rahul", "Priya", "Ankit"]
  const [projectMembers, setProjectMembers] = useState(projectDetails?.members || [])

  // handling checkbox of selecting project members
  const pickSelectedProjectMember = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let newMembers;
    if (isChecked) {
      // add to the project members array if checked
      newMembers = [...projectMembers, value]
    } else {
      newMembers = projectMembers.filter(member => member !== value)
    }
    setProjectMembers(newMembers)
    // console.log(projectMembers)
  }


  // Helper function to get date + 1 week
  const getDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Add 7 days
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }


  // save the information to project data file (as object)
  const handleSaveProjectInfo = () => {
    // Validate
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    if (projectMembers.length === 0) {
      alert('Please select at least one team member');
      return;
    }

    const updatedProjectData = {
      name: projectName.trim(),
      description: projectDescription.trim() || 'No description provided',
      status: optionSelect,
      progress: Number(projectProgress) || 0,
      tasks: Number(projectTasks) || 0,
      members: [...projectMembers],
    }

    updateProject(projectId, updatedProjectData);

    setProjectName("")
    setProjectDescription("")
    setOptionSelect("Active")
    setProjectProgress(0)
    setProjectTasks(0)

    handleCloseEditModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[6vh]">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={handleCloseEditModal}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm px-6 py-4 text-black bg-background border rounded-lg shadow-xl space-y-2 overflow-hidden text-sm">

        <button className='absolute right-4 top-4' onClick={handleCloseEditModal}><X size={24} /></button>
        <h1 className='text-center text-2xl'>Add Project</h1>
        <div className='flex flex-col gap-2'>
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
            label="description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />

          <div className='flex justify-between items-center gap-6'>
            <div className="flex justify-center items-center gap-2">
              {/* status button */}
              <h2 >Status</h2>
              <div>
                {/* Selected value */}
                <button id='All Projects' onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-between items-center h-10 text-heading text-xs md:text-sm bg-background w-24 lg:w-32 focus-visible:bg-background rounded-md border border-primary/30 outline-none px-4 py-2 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 cursor-pointer"
                >
                  <span>{optionSelect}</span>
                  <ChevronDown size={24} className={`transition-transform transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <ul
                    className="absolute mt-2 w-48 flex flex-col z-50 rounded-md border border-primary/10 bg-background shadow-md
          ">
                    {
                      projectStatuses.map((projectStatus => (
                        <li key={projectStatus.value} value={projectStatus.value} className=" text-primary/60 pl-2 py-1 hover:bg-primary/10 hover:text-primary hover:font-semibold duration-300 cursor-pointer"
                          onClick={() => {
                            setOptionSelect(projectStatus.value)
                            setIsOpen(false)
                          }}>{projectStatus.value}</li>
                      )))
                    }
                  </ul>
                )}
              </div>
            </div>

            {/* progress */}
            <div className='flex justify-center items-center gap-2'>
              <label htmlFor="progress">Progress</label>
              <input
                id='progress'
                type="text"
                min={0}
                max={100}
                className='border border-border'
                value={projectProgress}
                onChange={(e) => setProjectProgress(Number(e.target.value))}
              />
            </div>

          </div>
          <div className='flex items-center gap-2'>
            <h2>Due Date</h2>
            <p>{getDueDate()}</p>
          </div>
          <div className=''>
            <h2>Members</h2>
            <div className='grid grid-cols-3 space-x-2'>
              {allProjectMembers && allProjectMembers.map((member) => (
                <span key={member} className='space-x-2'>
                  <input
                    type="checkbox"
                    name=""
                    id={member}
                    value={member}
                    onChange={pickSelectedProjectMember}
                    checked={projectMembers.includes(member)}
                  />
                  <label htmlFor={member}>{member}</label>
                </span>
              ))}
              {/* Show selected members */}
              {projectMembers.length > 0 && (
                <p className='text-xs text-muted-foreground mt-1'>
                  Selected: {projectMembers.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* tasks */}
        <Input
          type="text"
          label="Total Tasks"
          min={0}
          placeholder={0}
          value={projectTasks}
          onChange={(e) => setProjectTasks(Number(e.target.value))}
          required
        />
        <Button className="w-full mt-2" onClick={handleSaveProjectInfo}>Save</Button>
      </div>
    </div>

  )
}

export default EditProjectModal