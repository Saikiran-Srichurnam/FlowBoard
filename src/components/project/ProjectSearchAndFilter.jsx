
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Input from "../ui/Input/Input";
import ProjectViewToggle from "./ProjectViewToggle";

function ProjectSearchAndFilter({
  search,
  setSearch,
  selectedOption,
  setSelectedOption,
  selectedSortOption,
  setSelectedSortOption,
  view,
  setView,
}) {
  const projectStatuses = ["All", "Active", "Completed", "On Hold"];
  const sortOrder = ["Latest", "Alphabetical", "Oldest"];

  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const statusRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const buttonBaseClass =
    "flex h-10 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-heading transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  const menuClass =
    "absolute top-full z-50 mt-2 rounded-lg border border-border bg-surface p-1 text-xs shadow-xl";

  const optionClass =
    "w-full rounded-md px-3 py-2.5 text-left text-body transition-colors hover:bg-surface-hover hover:text-heading";

  return (
    <section
      id="ProjectSearchAndFilter"
      className="flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Search and status */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="min-w-0 flex-1">
          <Input
            name="search"
            id="search"
            type="text"
            placeholder="Search projects..."
            className="h-10 w-full px-3 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative shrink-0" ref={statusRef}>
          <button
            type="button"
            aria-label="Filter projects by status"
            aria-expanded={isOpen}
            aria-haspopup="menu"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setIsSortOpen(false);
            }}
            className={`${buttonBaseClass} w-28 sm:w-32`}
          >
            <span className="truncate">{selectedOption}</span>
            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul
              role="menu"
              className={`${menuClass} left-0 w-32`}
            >
              {projectStatuses.map((status) => (
                <li key={status}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setSelectedOption(status);
                      setIsOpen(false);
                    }}
                    className={`${optionClass} ${
                      selectedOption === status
                        ? "bg-primary/10 font-semibold text-primary"
                        : ""
                    }`}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sort and view */}
      <div className="flex shrink-0 items-center justify-between gap-2">
        <div className="relative shrink-0" ref={sortRef}>
          <button
            type="button"
            aria-label="Sort projects"
            aria-expanded={isSortOpen}
            aria-haspopup="menu"
            onClick={() => {
              setIsSortOpen((prev) => !prev);
              setIsOpen(false);
            }}
            className={`${buttonBaseClass} w-32 sm:w-36`}
          >
            <span className="truncate">{selectedSortOption}</span>
            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform duration-200 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <ul
              role="menu"
              className={`${menuClass} right-0 w-36`}
            >
              {sortOrder.map((order) => (
                <li key={order}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setSelectedSortOption(order);
                      setIsSortOpen(false);
                    }}
                    className={`${optionClass} ${
                      selectedSortOption === order
                        ? "bg-primary/10 font-semibold text-primary"
                        : ""
                    }`}
                  >
                    {order}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ProjectViewToggle view={view} setView={setView} />
      </div>
    </section>
  );
}

export default ProjectSearchAndFilter;
