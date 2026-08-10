import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import projectOverviewData from "../../data/projectOverviewData.json"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function TaskOverview() {
  return (
    <section id="TaskOverview" className="p-4 h-full">
      <h2>Task Overview</h2>
      <div className="w-48 h-48 mx-auto">
        <Doughnut
          data={{
            labels: projectOverviewData.map((item) => item.label),
            datasets: [
              {
                label: "Project Overview",
                data: projectOverviewData.map((item) => item.Value),

                backgroundColor: [
                  "#2563EB", // To Do - primary
                  "#EAB308", // In Progress - yellow-500
                  "#3B82F6", // Review - blue-500
                  "#22C55E", // Done - success
                ],

                borderWidth: 2,
              },
            ],
          }}
        // options={{
        //   maintainAspectRatio: false,
        // }}
        />
      </div>
    </section>
  )
}

export default TaskOverview