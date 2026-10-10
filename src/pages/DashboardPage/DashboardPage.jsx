import {
  DateRangePicker,
  StatsOverview,
  ProjectOverview,
  TaskOverview,
  UpCommingEvents,
  Productivity
} from '../../components/dashboard';
import RecentActivity from '../../components/dashboard/RecentActivity';
import TeamsMembersList from '../../components/dashboard/TeamsMembersList';


function DashboardPage() {

  // get the username from the local storage
  const storedUserName = localStorage.getItem("userName")

  return (
    <section id="dashboard" className="w-full min-w-0">
      <div className='flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between'>
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
      <div className='mt-4 mb-6 min-w-0'>
        <StatsOverview />
      </div>

      {/* project overview, taskoverview and upcomming events*/}
      <div className='flex min-w-0 flex-col gap-3 xl:flex-row'>
        <div className="w-full min-w-0 xl:w-8/12">
          <ProjectOverview />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row xl:w-4/12 xl:flex-col ">
          <TaskOverview/>
          <UpCommingEvents />
        </div>
      </div>

      {/* Recent Activity and Team Members */}
      <div className="my-2 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <RecentActivity />
        <TeamsMembersList />
      </div>

      {/* Productivity */}
      <div className="mt-3 min-w-0 w-full">
        <Productivity />
      </div>


    </section>
  );
}

export default DashboardPage