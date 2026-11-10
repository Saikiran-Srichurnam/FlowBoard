
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  Bell,
  User,
  ChevronDown,
  Menu,
  Sun,
  Moon,
  Search,
  FolderKanban,
  CheckSquare,
  ArrowUpRight,
} from "lucide-react";

import Button from "../../../components/ui/Button/index";
import { useTheme, useProjects, useTasks } from "../../../context";

function GlobalSearch({
  query,
  setQuery,
  projects,
  tasks,
  onSelect,
  onClose,
  searchOpen,
  setSearchOpen,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) return { projects: [], tasks: [], all: [] };

    const matchedProjects = projects
      .filter((project) => {
        const searchableText = [
          project.name,
          project.description,
          project.status,
          ...(project.members || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerm);
      })
      .slice(0, 5)
      .map((project) => ({
        ...project,
        resultType: "project",
      }));

    const matchedTasks = tasks
      .filter((task) => {
        const searchableText = [
          task.title,
          task.description,
          task.status,
          task.priority,
          task.dueDate,
          ...(task.assignee || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchTerm);
      })
      .slice(0, 5)
      .map((task) => ({
        ...task,
        resultType: "task",
      }));

    return {
      projects: matchedProjects,
      tasks: matchedTasks,
      all: [
        ...matchedProjects,
        ...matchedTasks,
      ],
    };
  }, [query, projects, tasks]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearchOpen(false);
      setActiveIndex(0);
      return;
    }

    if (!searchOpen || results.all.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.all.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + results.all.length) % results.all.length
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onSelect(results.all[activeIndex]);
    }
  };

  const getProjectName = (projectId) => {
    return (
      projects.find(
        (project) => String(project.id) === String(projectId)
      )?.name || "Unknown project"
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects, tasks..."
          autoComplete="off"
          aria-label="Search projects and tasks"
          aria-expanded={searchOpen && query.trim().length > 0}
          className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-10 text-sm text-heading placeholder:text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveIndex(0);
              setSearchOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-heading"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {searchOpen && query.trim() && (
        <div className="absolute left-0 top-full z-[100] mt-2 max-h-[420px] w-full min-w-[280px] overflow-y-auto rounded-xl border border-border bg-surface shadow-2xl">

          {results.all.length > 0 ? (
            <div className="p-2">

              {/* Projects */}
              {results.projects.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Projects
                  </p>

                  {results.projects.map((project) => {
                    const resultIndex = results.all.findIndex(
                      (item) =>
                        item.resultType === "project" &&
                        item.id === project.id
                    );

                    return (
                      <button
                        key={`project-${project.id}`}
                        type="button"
                        onClick={() => onSelect(project)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${activeIndex === resultIndex
                            ? "bg-surface-hover"
                            : "hover:bg-surface-hover"
                          }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FolderKanban size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-heading">
                            {project.name}
                          </p>
                          <p className="truncate text-xs text-muted">
                            Project · {project.status}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-muted"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tasks */}
              {results.tasks.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Tasks
                  </p>

                  {results.tasks.map((task) => {
                    const resultIndex = results.all.findIndex(
                      (item) =>
                        item.resultType === "task" &&
                        item.id === task.id
                    );

                    return (
                      <button
                        key={`task-${task.id}`}
                        type="button"
                        onClick={() => onSelect(task)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${activeIndex === resultIndex
                            ? "bg-surface-hover"
                            : "hover:bg-surface-hover"
                          }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                          <CheckSquare size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-heading">
                            {task.title}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {getProjectName(task.projectId)} · {task.status}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-md bg-background px-2 py-1 text-[10px] font-medium text-muted">
                          {task.priority}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <Search size={22} className="mx-auto mb-2 text-muted" />
              <p className="text-sm font-medium text-heading">
                No results found
              </p>
              <p className="mt-1 text-xs text-muted">
                Try searching with another keyword.
              </p>
            </div>
          )}

          <div className="border-t border-border px-3 py-2">
            <p className="text-[10px] text-muted">
              Use ↑ ↓ to navigate · Enter to select · Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ onMenuClick }) {
  const storedUserName = localStorage.getItem("userName");
  const { isDark, toggleTheme } = useTheme();
  const { projects = [] } = useProjects();
  const { tasks = [], handleEditTask } = useTasks();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSelect = (result) => {
    setSearchOpen(false);
    setSearchQuery("");

    if (result.resultType === "project") {
      navigate("/projects");
      return;
    }

    if (result.resultType === "task") {
      handleEditTask(result.id);
      navigate("/tasks");
    }
  };

  const searchProps = {
    query: searchQuery,
    setQuery: setSearchQuery,
    projects,
    tasks,
    onSelect: handleSearchSelect,
    onClose: () => setSearchOpen(false),
    searchOpen,
    setSearchOpen,
  };

  return (
    <header className="relative z-40 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-3 px-3 py-4 sm:px-4 lg:px-6">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface text-heading shadow-sm transition-colors hover:bg-surface-hover lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Header Actions */}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">

        {/* Desktop Search */}
        <div className="hidden min-w-0 flex-1 justify-end xl:flex">
          <div className="w-full max-w-105">
            <GlobalSearch {...searchProps} />
          </div>
        </div>

        {/* Add Button */}
        {/* <Button className="flex h-10 w-10 shrink-0 items-center justify-center cursor-pointer">
          <PlusIcon size={20} />
        </Button> */}

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-heading shadow-sm transition-colors hover:bg-surface-hover sm:h-11 sm:w-11 cursor-pointer"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface text-heading shadow-sm transition-colors hover:bg-surface-hover sm:h-11 sm:w-11"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User Card */}
        <div className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-surface px-3 py-2 shadow-sm sm:flex">
          <div className="rounded-full border border-border p-2">
            <User size={20} className="text-primary" />
          </div>

          <div className="min-w-0">
            <h3 className="max-w-28 truncate text-sm font-bold text-heading">
              {storedUserName || "User"}
            </h3>
            <h4 className="text-xs font-semibold text-body">
              Admin
            </h4>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-transparent p-2 transition-colors hover:bg-surface-hover"
            aria-label="User menu"
          >
            <ChevronDown size={18} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile and Tablet Search */}
      <div className="order-3 w-full xl:hidden">
        <GlobalSearch {...searchProps} />
      </div>
    </header>
  );
}

export default Header;
