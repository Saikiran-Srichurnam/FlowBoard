
import {
  FolderKanban,
  CheckSquare,
  KanbanSquare,
  CalendarDays,
  Activity,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Create and organize projects while keeping your work structured and easy to manage.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Create, edit, and manage tasks with clear statuses and project associations.",
  },
  {
    icon: KanbanSquare,
    title: "Kanban Boards",
    description:
      "Visualize your workflow and organize tasks across different stages using drag and drop.",
  },
  {
    icon: CalendarDays,
    title: "Calendar Planning",
    description:
      "View your scheduled tasks and due dates in one convenient calendar.",
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description:
      "Keep track of recent project and task activities in your workspace.",
  },
  {
    icon: BarChart3,
    title: "Progress Overview",
    description:
      "Get a clear overview of your projects, task statuses, and overall progress.",
  },
];

function Features() {
  return (
    <section className="py-20 md:py-24 px-6 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-semibold tracking-wide">
            FEATURES
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl font-bold text-heading leading-tight">
            Everything You Need to Manage Projects
          </h2>

          <p className="mt-5 text-base md:text-lg text-body leading-relaxed">
            FlowBoard brings your projects, tasks, and workflow
            together in one organized workspace. Plan your work,
            track progress, and stay focused.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-heading">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm md:text-base text-body leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;
