import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import Input from '../ui/Input/Input'


function AddNewProjectModal({ onClose }) {
  // project status
  const projectStatuses = [
    { value: "Active" },
    { value: "Completed" },
    { value: "On Hold" },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const [optionSelect, setOptionSelect] = useState("Active")

  return (
    <div className='fixed top-1/8 left-1/3 z-50 text-black border max-w-sm p-4 bg-background space-y-2'>
      <div>
        <button className='absolute right-4 top-4' onClick={onClose}><X size={24} /></button>
        <h1 className='text-center text-2xl'>Add Project</h1>
        <div className='flex flex-col gap-2'>
          <Input type="text" label="Project Name" />
          <Input type="text" label="description" />

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
              <input id='progress' type="text" className='border border-border ' />
            </div>

          </div>
          <div className='flex items-center gap-2'>
            <h2>Due Date</h2>
            <p>Aug 20 2026</p>
          </div>
          <div className=''>
            <h2>Members</h2>
            <div className='grid grid-cols-3 space-x-2'>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
              <span className='space-x-2'>
                <input type="checkbox" name="" id="Saikiran" />
                <label htmlFor="Saikiran">Saikiran</label>
              </span>
            </div>
          </div>
        </div>

        {/* tasks */}
        <Input type="text" label="Total Tasks" />
      </div>
    </div>

  )
}

export default AddNewProjectModal