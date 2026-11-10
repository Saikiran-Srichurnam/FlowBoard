
import { CalendarDays, ChevronDown } from "lucide-react";
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
import { useTheme } from "../../context/ThemeContext";

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
  const { isDark } = useTheme();

  const colors = {
    primary: isDark ? "#818CF8" : "#2563EB",
    label: isDark ? "#A5B4FC" : "#64748B",
    grid: isDark ? "#26345C" : "#E2E8F0",
    surface: isDark ? "#111A38" : "#FFFFFF",
    buttonText: isDark ? "#C7D2FE" : "#475569",
    buttonBorder: isDark ? "#26345C" : "#E2E8F0",
    gradientStart: isDark
      ? "rgba(129, 140, 248, 0.25)"
      : "rgba(37, 99, 235, 0.20)",
  };

  const data = {
    labels: productivityData.labels,

    datasets: [
      {
        data: productivityData.values,

        borderColor: colors.primary,
        borderWidth: 2,
        tension: 0.45,
        fill: true,

        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;

          if (!chartArea) return "transparent";

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );

          gradient.addColorStop(0, colors.gradientStart);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          return gradient;
        },

        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.primary,
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
        enabled: true,
        backgroundColor: colors.surface,
        titleColor: isDark ? "#F8FAFC" : "#0F172A",
        bodyColor: colors.buttonText,
        borderColor: colors.buttonBorder,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
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
          color: colors.label,

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
          color: colors.label,

          font: {
            size: 10,
          },
        },

        grid: {
          color: colors.grid,
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
      className="flex h-64 w-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between">
        <h2 className="text-sm font-semibold text-heading">
          Productivity
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-body shadow-sm transition-colors hover:bg-surface-hover hover:text-heading"
        >
          <CalendarDays size={13} />
          <span>This Week</span>
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Chart */}
      <div className="mt-4 min-h-0 flex-1 w-full">
        <Line
          key={isDark ? "dark" : "light"}
          data={data}
          options={options}
        />
      </div>
    </section>
  );
}

export default Productivity;
