import React from 'react'
import Input from '../../components/ui/Input/Input';
import { DateRangePicker, StatsOverview, ProjectOverview, TaskOverview, UpCommingEvents } from '../../components/dashboard';
import RecentActivity from '../../components/dashboard/RecentActivity';


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

      {/* project overview, taskoverview and upcomming events*/}
      <div className='flex gap-2 w-full'>
        <ProjectOverview className="w-8/12" />
        <div className='w-4/12 flex flex-col gap-2'>
          <TaskOverview className="w-full" />
          <UpCommingEvents className="w-full" />
        </div>
      </div>

      {/* RecentActivity */}
      <div className='flex flex-row my-2 w-full gap-2'>
        <RecentActivity className="w-4/12" />
        {/* <RecentActivity className="w-4/12" />
        <RecentActivity className="w-4/12" /> */}
      </div>


    </section>
  );
}

export default Dashboard