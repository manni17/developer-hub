import { Link, useLocation } from "react-router-dom";
import { navGroups } from "@/config/site";

interface DocSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DocSidebar = ({ open, onClose }: DocSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 bottom-0 left-0 z-40 w-[260px] bg-sidebar border-r overflow-y-auto
          transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                {group.label}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`
                          block px-2 py-1.5 rounded-md text-sm transition-colors
                          ${active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
                          }
                        `}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DocSidebar;
