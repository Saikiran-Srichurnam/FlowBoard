import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from "../ui/Button"
import AddNewProjectModal from './AddNewProjectModal'

function ProjectHeader() {
  const [showModal, setShowModal] = useState(false)

  // handle add project btn
  const handleAddBtn = () => {
    console.log("adding project", Date.now())
    document.body.style.overflow = "hidden"
    document.body.classList.add("addModal")
    setShowModal(true)
  }

  // handle close modal button
  const handleCloseModal = () => {
    document.body.style.overflow = ""; // Restore scroll
    document.body.classList.remove("addModal");
    setShowModal(false);
  };

  return (
    <section id='ProjectHeader' className='flex justify-between items-center'>
      <div>
        <h1 className='text-heading text-lg font-semibold'>Project</h1>
        <p className='text-muted text-sm'>Manage and track all your projects</p>
      </div>
      <Button onClick={handleAddBtn}><Plus size={24} />New Project</Button>

      {/* conditional rendering of modal */}
      {showModal && <AddNewProjectModal onClose={handleCloseModal} />}
    </section >
  )
}

export default ProjectHeader