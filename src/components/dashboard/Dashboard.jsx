import React from 'react'
import Input from '../ui/Input/Input';
import DateRangePicker from './DateRangePicker';
import StatsOverview from './StatsOverview';
import ProjectOverview from '../project/ProjectsOverview';

function Dashboard() {

  // get the username from the local storage
  const storedUserName = localStorage.getItem("userName")

  return (
    <section id="dashboard" >
      <div className='flex justify-between items-center'>
        {/* welcome message and username */}
        <div>
          <h1 className='font-semibold text-black text-lg'>Dashboard</h1>
          <h1 className='text-body text-lg'>Welcome back, {storedUserName || "User"}! 👋</h1>
        </div>

        {/* calender with date range picker */}
        <div className='relative overflow-visible'>
          <DateRangePicker />
        </div>
      </div>

      {/* stats overview */}
      <div className='mt-4 mb-6'>
        <StatsOverview />
      </div>

      {/* project overview */}
      <div>
        <ProjectOverview />
      </div>

    </section>
  );
}

export default Dashboard