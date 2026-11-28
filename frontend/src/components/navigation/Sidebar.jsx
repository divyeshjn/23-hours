import { NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";
import { navigation } from "../../constants/navigation";

function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0
      h-dvh w-64 bg-card border-r border-border
      flex-col px-6 py-8">

      <div className="flex items-center gap-3 mb-12">
        <div className="bg-primary text-background p-3 rounded-2xl">
          <Leaf size={23} />
        </div>

        <div>
          <h1 className="font-heading font-extrabold text-xl text-primary">
            23 Hours
          </h1>

          <p className="text-xs text-muted">
            Your wellness space
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5
              rounded-xl font-medium transition-colors
              ${isActive
                ? "bg-primary/15 text-primary"
                : "text-muted hover:bg-surface hover:text-foreground"}`
            }
          >
            <Icon size={21} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto text-xs text-muted leading-relaxed">
        Small steps.<br />
        Sustainable progress.
      </div>

    </aside>
  );
}

export default Sidebar;