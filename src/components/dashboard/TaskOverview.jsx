import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CalendarDays, ChevronDown } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import projectOverviewData from "../../data/projectOverviewData.json";

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskOverview() {
  const { isDark } = useTheme();

  // Status colors
  const statusColors = {
    "To Do": "#F87171",
    "In Progress": "#FBBF24",
    "Review": "#818CF8",
    "Done": "#34D399",
  };

  const total = projectOverviewData.reduce(
    (sum, item) => sum + item.Value,
    0
  );

  // Theme-aware chart colors
  const chartColors = {
    centerHeading: isDark ? "#F8FAFC" : "#0F172A",
    centerBody: isDark ? "#A5B4FC" : "#64748B",
    surface: isDark ? "#111A38" : "#FFFFFF",
    tooltipBackground: isDark ? "#080D20" : "#0F172A",
    tooltipText: "#F8FAFC",
  };

  // Center Text Plugin
  const centerTextPlugin = {
    id: "centerText",

    beforeDraw(chart) {
      const { ctx, chartArea } = chart;

      if (!chartArea) return;

      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();

      // Total number
      ctx.font = "bold 24px Arial";
      ctx.fillStyle = chartColors.centerHeading;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(total, centerX, centerY - 7);

      // Total Tasks
      ctx.font = "11px Arial";
      ctx.fillStyle = chartColors.centerBody;

      ctx.fillText("Total Tasks", centerX, centerY + 13);

      ctx.restore();
    },
  };

  const chartData = {
    labels: projectOverviewData.map((item) => item.label),

    datasets: [
      {
        data: projectOverviewData.map((item) => item.Value),
        backgroundColor: projectOverviewData.map(
          (item) => statusColors[item.label]
        ),
        borderColor: chartColors.surface,
        borderWidth: 2,
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions = {
    cutout: "68%",
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
        backgroundColor: chartColors.tooltipBackground,
        titleColor: chartColors.tooltipText,
        bodyColor: chartColors.tooltipText,
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  return (
    <section
      id="TaskOverview"
      className="h-64 w-full rounded-xl border border-border bg-surface p-5 shadow-sm md:h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-heading">
          Task Overview
        </h2>

        {/* This Week */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-body shadow-sm transition-colors hover:bg-surface-hover"
        >
          <CalendarDays size={13} />
          <span>This Week</span>
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Chart + Custom Legend */}
      <div className="mt-8 flex items-center justify-center gap-4">

        {/* Doughnut */}
        <div className="h-32 w-32 shrink-0">
          <Doughnut
            key={isDark ? "dark" : "light"}
            data={chartData}
            plugins={[centerTextPlugin]}
            options={chartOptions}
          />
        </div>

        {/* Custom Legend */}
        <div className="flex min-w-32 flex-col gap-4">
          {projectOverviewData.map((item) => {
            const percentage =
              total > 0
                ? Math.round((item.Value / total) * 100)
                : 0;

            return (
              <div
                key={item.label}
                className="grid grid-cols-[10px_1fr_auto] items-center gap-x-2 text-xs"
              >
                {/* Color */}
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: statusColors[item.label],
                  }}
                />

                {/* Label */}
                <span className="text-body">
                  {item.label}
                </span>

                {/* Value */}
                <span className="text-right font-medium text-heading">
                  {item.Value}
                  <span className="ml-1 text-muted">
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