import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50
      border-t border-border bg-white/95
      backdrop-blur-xl md:hidden
      pb-[env(safe-area-inset-bottom)]">

      <div className="flex justify-around items-center h-18">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center
              gap-1 flex-1 h-full transition-colors
              ${isActive
                ? "text-primary"
                : "text-muted"}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`px-5 py-1.5 rounded-full
                  ${isActive ? "bg-sage/30" : ""}`}>
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-medium">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
