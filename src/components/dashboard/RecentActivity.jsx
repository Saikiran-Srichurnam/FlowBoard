
import { useState, useEffect } from "react";
import { X, Clock, Activity } from "lucide-react";
import { useActivity } from "../../context/ActivityContext";
import Button from "../ui/Button";

function RecentActivity() {
  const { activities } = useActivity();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!showAll) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showAll]);

  const getTimeAgo = (timestamp) => {
    const seconds = Math.max(
      0,
      Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const ActivityItem = ({ activity }) => (
    <div
      key={activity.id}
      className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-b-0"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />

        <div className="min-w-0">
          <p className="text-xs text-muted">
            {activity.text}{" "}
            <span className="font-semibold text-heading">
              "{activity.task}"
            </span>
          </p>
        </div>
      </div>

      <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted">
        <Clock size={12} />
        {getTimeAgo(activity.timestamp)}
      </span>
    </div>
  );

  return (
    <>
      <section
        id="RecentActivity"
        className="flex h-64 w-full flex-col rounded-md border border-border bg-surface p-5 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-heading">
          Recent Activity
        </h2>

        {/* Scrollable activity list */}
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <p className="py-4 text-xs text-muted">
              No recent activity yet.
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          className="mt-3 shrink-0 text-xs text-primary"
          onClick={() => setShowAll(true)}
        >
          View All Activity
        </Button>
      </section>

      {showAll && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAll(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-modal-title"
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl border border-border bg-surface p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                <h2
                  id="activity-modal-title"
                  className="text-base font-semibold text-heading"
                >
                  All Activities
                </h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {activities.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Close activity history"
                className="rounded-md p-2 text-muted hover:bg-background cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-2 overflow-y-auto">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted">
                  No activities recorded yet.
                </p>
              )}
            </div>

            <div className="mt-3 flex justify-end border-t border-border pt-3">
              <Button
                variant="ghost"
                className="text-xs text-primary"
                onClick={() => setShowAll(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}

export default RecentActivity;
