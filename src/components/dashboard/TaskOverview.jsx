import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CalendarDays, ChevronDown } from "lucide-react";

import projectOverviewData from "../../data/projectOverviewData.json";

// Center Text Plugin
const centerTextPlugin = {
  id: "centerText",

  beforeDraw(chart) {
    const { ctx, chartArea } = chart;

    const total = projectOverviewData.reduce(
      (sum, item) => sum + item.Value,
      0
    );

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();

    // Total number
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#111827";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(total, centerX, centerY - 7);

    // Total Tasks
    ctx.font = "11px Arial";
    ctx.fillStyle = "#6B7280";

    ctx.fillText("Total Tasks", centerX, centerY + 13);

    ctx.restore();
  },
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  centerTextPlugin
);


function TaskOverview() {

  // Status colors
  const statusColors = {
    "To Do": "#F87171",       // red-400
    "In Progress": "#EAB308", // yellow-500
    "Review": "#3B82F6",      // blue-500
    "Done": "#22C55E",        // success
  };
  // Total tasks
  const total = projectOverviewData.reduce(
    (sum, item) => sum + item.Value,
    0
  );


  return (
    <section
      id="TaskOverview"
      className="
        h-64
        rounded-md
        border
        border-border
        bg-surface
        p-5
        shadow-sm
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between">

        <h2 className="text-sm font-medium text-heading">
          Task Overview
        </h2>


        {/* This Week */}
        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-md
            border border-gray-200
            bg-white
            px-3 py-1.5
            text-xs
            font-medium
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50
          "
        >
          <CalendarDays size={13} />

          <span>This Week</span>

          <ChevronDown size={13} />
        </button>

      </div>


      {/* Chart + Custom Legend */}
      <div className="mt-5 flex items-center justify-center gap-5">


        {/* Doughnut */}
        <div className="h-32 w-32 shrink-0">

          <Doughnut
            data={{
              labels: projectOverviewData.map(
                (item) => item.label
              ),

              datasets: [
                {
                  data: projectOverviewData.map(
                    (item) => item.Value
                  ),

                  backgroundColor:
                    projectOverviewData.map(
                      (item) => statusColors[item.label]
                    ),

                  borderColor: "#ffffff",

                  borderWidth: 2,
                },
              ],
            }}

            options={{
              cutout: "68%",

              maintainAspectRatio: false,

              plugins: {
                // IMPORTANT
                // Disable Chart.js default legend
                legend: {
                  display: false,
                },

                tooltip: {
                  enabled: true,
                },
              },
            }}
          />

        </div>


        {/* Custom Legend */}
        <div className="flex min-w-32 flex-col gap-4">

          {projectOverviewData.map((item) => {

            const percentage = Math.round(
              (item.Value / total) * 100
            );


            return (
              <div
                key={item.label}
                className="
                  grid
                  grid-cols-[10px_1fr_auto]
                  items-center
                  gap-x-2
                  text-xs
                "
              >

                {/* Color */}
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      statusColors[item.label],
                  }}
                />


                {/* Label */}
                <span className="text-gray-700">
                  {item.label}
                </span>


                {/* Value */}
                <span className="text-right font-medium text-gray-800">
                  {item.Value}
                  <span className="ml-1 text-gray-500">
                    ({percentage}%)
                  </span>
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}


export default TaskOverview;