import { CalendarDays, ChevronDown } from "lucide-react";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

import productivityData from "../../data/productivityData.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

function Productivity() {
  const data = {
    labels: productivityData.labels,

    datasets: [
      {
        data: productivityData.values,

        borderColor: "#2563EB",
        borderWidth: 2,

        tension: 0.45,

        fill: true,

        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(
            0,
            "rgba(37, 99, 235, 0.20)"
          );

          gradient.addColorStop(
            1,
            "rgba(37, 99, 235, 0)"
          );

          return gradient;
        },

        pointRadius: 3,
        pointHoverRadius: 5,

        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#2563EB",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#64748B",

          font: {
            size: 11,
          },
        },
      },

      y: {
        min: 0,
        max: 100,

        ticks: {
          stepSize: 25,
          color: "#64748B",

          font: {
            size: 10,
          },
        },

        grid: {
          color: "#E5E7EB",
          drawTicks: false,
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <section
      id="Productivity"
      className="h-64 w-full rounded-md border border-border bg-surface p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-heading">
          Productivity
        </h2>

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

      {/* Chart */}
      <div
        id="chart"
        className="mt-5 h-42 w-full"
      >
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default Productivity;