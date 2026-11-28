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
    <div className="grid grid-cols-2 gap-1
      rounded-xl border border-border
      bg-card p-1">

      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex items-center
            justify-center gap-2 rounded-lg
            px-3 py-3 text-xs sm:text-sm
            font-medium transition-colors
            ${
              activeTab === id
                ? "bg-primary text-background"
                : "text-muted"
            }`}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}

    </div>
  );
}