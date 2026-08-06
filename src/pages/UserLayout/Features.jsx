import React from "react";
import {
  FolderKanban,
  Users,
  CalendarDays,
  Bell,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <FolderKanban size={32} />,
    title: "Project Management",
    description:
      "Organize projects effortlessly with boards, lists, and milestones.",
  },
  {
    icon: <Users size={32} />,
    title: "Team Collaboration",
    description:
      "Invite teammates, assign tasks, and collaborate in real time.",
  },
  {
    icon: <CalendarDays size={32} />,
    title: "Calendar Planning",
    description:
      "Visualize deadlines, meetings, and project timelines in one place.",
  },
  {
    icon: <Bell size={32} />,
    title: "Smart Notifications",
    description:
      "Receive instant updates so you never miss important changes.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Analytics Dashboard",
    description:
      "Track project progress and team productivity with beautiful reports.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Workspace",
    description:
      "Your data is protected with authentication and secure access control.",
  },
];

function Features() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-blue-50">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-primary font-semibold">
            FEATURES
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Everything You Need to Manage Projects
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            FlowBoard helps teams plan, collaborate, track progress,
            and deliver projects faster—all from one modern workspace.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;