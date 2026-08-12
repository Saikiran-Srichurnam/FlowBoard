import React, { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function DateRangePicker() {
  const today = new Date();

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 6);

  const [range, setRange] = useState({
    from: oneWeekAgo,
    to: today,
  });

  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative">

      {/* Date range button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
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
        <CalendarDays size={14} />

        <span>
          {formatDate(range.from)} – {formatDate(range.to)}
        </span>

        <ChevronDown
          size={13}
          className={`transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>


      {/* Calendar dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            z-10
            mt-2
            w-80
            rounded-xl
            border
            border-gray-200
            bg-white
            p-3
            shadow-xl
          "
        >

          {/* Calendar */}
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            defaultMonth={oneWeekAgo}
            showOutsideDays
            className="flowboard-calendar"
          />


          {/* Selected range */}
          <div className="border-t border-gray-100 pt-2">

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                From
              </span>

              <span className="text-[11px] font-medium text-gray-800">
                {formatDate(range.from)}
              </span>
            </div>


            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                To
              </span>

              <span className="text-[11px] font-medium text-gray-800">
                {formatDate(range.to)}
              </span>
            </div>

          </div>


          {/* Apply */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="
              mt-3
              w-full
              rounded-md
              bg-primary
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              transition
              hover:bg-primary-hover
            "
          >
            Apply
          </button>

        </div>
      )}
    </div>
  );
}

export default DateRangePicker;