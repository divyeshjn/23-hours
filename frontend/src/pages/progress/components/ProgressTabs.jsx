import {
  ChartNoAxesCombined,
  Ruler
} from "lucide-react";

const tabs = [
  {
    id: "nutrition",
    label: "Nutrition",
    icon: ChartNoAxesCombined
  },
  {
    id: "body",
    label: "Body measurements",
    icon: Ruler
  }
];

export default function ProgressTabs({
  activeTab,
  onChange
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5
      rounded-2xl border border-border
      bg-card p-1.5">

      {tabs.map(({ id, label, icon: Icon }) => {

        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`flex min-w-0 items-center
              justify-center gap-2 rounded-xl
              px-2 py-3.5 sm:px-4
              text-xs sm:text-sm font-semibold
              transition-colors duration-200
              ${
                isActive
                  ? "bg-primary text-background"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
          >

            <Icon
              size={18}
              strokeWidth={isActive ? 2.3 : 1.8}
              className="shrink-0"
            />

            <span className="text-center leading-tight">
              {label}
            </span>

          </button>
        );
      })}

    </div>
  );
}