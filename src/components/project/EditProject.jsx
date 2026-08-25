import { X } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';

function EditProject({ projectId }) {

  const { handleCloseEditModal } = useProjects()

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[6vh]">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={handleCloseEditModal}
      />
      <div className="relative z-10 w-full max-w-sm px-6 py-4 h-40 text-black bg-background border rounded-lg shadow-xl space-y-2 overflow-hidden text-sm">

        <button className='absolute right-4 top-4' onClick={handleCloseEditModal}><X size={24} /></button>
        <h1 className='text-4xl'>Edit functionality</h1>
        <p>Project ID: {projectId}</p>
      </div>
    </div>


  )
}

export default EditProject