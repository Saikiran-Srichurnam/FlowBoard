
import React from "react";
import {
  CheckCircle2,
  FolderKanban,
  CheckSquare,
  CalendarDays,
} from "lucide-react";

function DashboardPreview() {
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-2 md:p-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-primary">
            FlowBoard
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Project Management Dashboard
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-primary">
          Illustrative Preview
        </span>
      </div>

      {/* Sample Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2 md:p-4">

        <div className="rounded-2xl bg-blue-50 p-4">
          <FolderKanban className="text-primary mb-2" size={22} />
          <h3 className="text-2xl md:text-3xl font-bold">03</h3>
          <p className="text-xs md:text-sm text-gray-500">
            Sample Projects
          </p>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <CheckSquare className="text-green-600 mb-2" size={22} />
          <h3 className="text-2xl md:text-3xl font-bold">08</h3>
          <p className="text-xs md:text-sm text-gray-500">
            Sample Tasks
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4">
          <CalendarDays className="text-yellow-600 mb-2" size={22} />
          <h3 className="text-2xl md:text-3xl font-bold">05</h3>
          <p className="text-xs md:text-sm text-gray-500">
            Upcoming Tasks
          </p>
        </div>

      </div>

      {/* Sample Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 md:p-4">

        {/* To Do */}
        <div className="rounded-2xl bg-gray-100 p-4">
          <h3 className="mb-4 font-semibold">To Do</h3>

          <div className="space-y-3">
            <div className="rounded-xl bg-white p-3 shadow">
              <h4 className="font-medium text-sm md:text-base">
                Design Dashboard
              </h4>
              <p className="text-xs text-gray-500">
                UI Development
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow">
              <h4 className="font-medium text-sm md:text-base">
                Create Task Modal
              </h4>
              <p className="text-xs text-gray-500">
                Task Management
              </p>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-2xl bg-blue-50 p-4">
          <h3 className="mb-4 font-semibold text-blue-700">
            In Progress
          </h3>

          <div className="space-y-3">
            <div className="rounded-xl bg-white p-3 shadow">
              <h4 className="font-medium text-sm md:text-base">
                Build Kanban Board
              </h4>

              <div className="mt-3 h-2 rounded bg-gray-200">
                <div className="h-2 w-3/4 rounded bg-primary"></div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow">
              <h4 className="font-medium text-sm md:text-base">
                Calendar Integration
              </h4>

              <div className="mt-3 h-2 rounded bg-gray-200">
                <div className="h-2 w-1/2 rounded bg-primary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl bg-green-50 p-4">
          <h3 className="mb-4 font-semibold text-green-700">
            Completed
          </h3>

          <div className="space-y-3">
            <div className="rounded-xl bg-white p-3 shadow flex items-center justify-between">
              <span className="text-sm md:text-base">
                Project Setup
              </span>

              <CheckCircle2 className="text-green-600" size={18} />
            </div>

            <div className="rounded-xl bg-white p-3 shadow flex items-center justify-between">
              <span className="text-sm md:text-base">
                Sidebar Design
              </span>

              <CheckCircle2 className="text-green-600" size={18} />
            </div>
          </div>
        </div>

      </div>

      <p className="px-4 pb-4 text-center text-xs text-gray-500">
        Sample data shown for demonstration purposes.
      </p>

    </div>
  );
}

export default DashboardPreview;
