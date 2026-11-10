import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  KanbanSquare,
  CalendarDays,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function SideBar() {
  const sideBarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      symbol: <LayoutDashboard size={22} />,
    },
    {
      name: "Projects",
      path: "/projects",
      symbol: <FolderKanban size={22} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      symbol: <CheckSquare size={22} />,
    },
    {
      name: "Kanban Board",
      path: "/kanban-Board",
      symbol: <KanbanSquare size={22} />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      symbol: <CalendarDays size={22} />,
    },
  ];

  const sideBarClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-white shadow-sm font-semibold"
        : "text-body hover:bg-surface-hover hover:text-heading"
    }`;

  return (
    <aside className="left-0 top-0 h-full overflow-y-auto bg-surface z-20 shadow-md shrink-0 flex flex-col border-r border-border rounded-l-2xl">
      {/* Logo */}
      <div className="flex justify-center items-center mx-auto gap-2 px-3">
        <img
          src="/src/assets/flowboard-logo.png"
          alt="FlowBoard logo"
          className="size-16 object-contain"
        />

        <h1 className="my-6 mx-auto text-2xl font-semibold text-heading">
          FlowBoard
        </h1>
      </div>

      {/* Navigation */}
      <ul className="p-4 flex flex-col gap-2">
        {sideBarItems.map((item) => (
          <li key={item.name} className="w-full">
            <NavLink to={item.path} className={sideBarClass}>
              {item.symbol}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;