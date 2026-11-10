
import { useEffect, useRef, useState } from "react";
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
  const pickerRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return "Select date";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const isRangeComplete = Boolean(range?.from && range?.to);

  return (
    <div ref={pickerRef} className="relative">
      {/* Date range button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-body shadow-sm transition-colors hover:bg-surface-hover hover:text-heading"
      >
        <CalendarDays size={14} className="text-primary" />

        <span>
          {formatDate(range.from)} – {formatDate(range.to)}
        </span>

        <ChevronDown
          size={13}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          role="dialog"
          aria-label="Select date range"
          className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-border bg-surface p-3 shadow-xl"
        >
          {/* Calendar */}
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            defaultMonth={range.from || oneWeekAgo}
            showOutsideDays
            className="flowboard-calendar"
          />

          {/* Selected range */}
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted">
                From
              </span>

              <span className="text-[11px] font-medium text-heading">
                {formatDate(range.from)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-muted">
                To
              </span>

              <span className="text-[11px] font-medium text-heading">
                {formatDate(range.to)}
              </span>
            </div>
          </div>

          {/* Apply */}
          <button
            type="button"
            disabled={!isRangeComplete}
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
