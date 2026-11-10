
import {
  DateRangePicker,
  StatsOverview,
  ProjectOverview,
  TaskOverview,
  UpCommingEvents,
  Productivity,
} from "../../components/dashboard";

import RecentActivity from "../../components/dashboard/RecentActivity";
import TeamsMembersList from "../../components/dashboard/TeamsMembersList";

function DashboardPage() {
  // Get username safely from localStorage
  let storedUserName = "User";

  try {
    storedUserName = localStorage.getItem("userName") || "User";
  } catch {
    storedUserName = "User";
  }

  return (
    <section
      id="dashboard"
      className="flex w-full min-w-0 flex-col gap-5 pb-5"
    >
      {/* Dashboard Header */}
      <header className="flex flex-col gap-3 px-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-heading">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-body">
            Welcome back, {storedUserName}! 👋
          </p>
        </div>

        <div className="relative z-20 shrink-0">
          <DateRangePicker />
        </div>
      </header>

      {/* Statistics Overview */}
      <div className="min-w-0 px-4">
        <StatsOverview />
      </div>

      {/* Project Overview and Task Insights */}
      <div className="grid min-w-0 grid-cols-1 gap-4 px-4 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-8">
          <ProjectOverview />
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:flex-row xl:col-span-4 xl:flex-col">
          <div className="min-w-0 flex-1">
            <TaskOverview />
          </div>

          <div className="min-w-0 flex-1">
            <UpCommingEvents />
          </div>
        </div>
      </div>

      {/* Recent Activity and Team Members */}
      <div className="grid min-w-0 grid-cols-1 gap-4 px-4 md:grid-cols-2">
        <div className="min-w-0">
          <RecentActivity />
        </div>

        <div className="min-w-0">
          <TeamsMembersList />
        </div>
      </div>

      {/* Productivity */}
      <div className="min-w-0 px-4">
        <Productivity />
      </div>
    </section>
  );
}

export default DashboardPage;