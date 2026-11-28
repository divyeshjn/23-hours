import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
        border-t border-border bg-white/95
        backdrop-blur-xl md:hidden
        pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="flex items-center justify-around h-18 px-1">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center
              gap-1 flex-1 h-full min-w-0 min-h-[52px]
              transition-colors duration-200
              ${
                isActive
                  ? "text-primary"
                  : "text-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex items-center justify-center
                    px-4 py-1.5 rounded-full
                    transition-colors duration-200
                    ${isActive ? "bg-sage/30" : ""}`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="text-[10px] sm:text-xs
                  font-medium whitespace-nowrap">
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