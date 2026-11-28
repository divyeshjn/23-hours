import { Link } from "react-router-dom";
import { Settings2, Check } from "lucide-react";

import Card from "../../../components/common/Card";

function EssentialsSection({
  habits,
  completedHabits,
  onToggle
}) {
  const requiredHabits = habits.filter(
    habit => habit.required
  );

  const completed = requiredHabits.filter(
    habit => completedHabits[habit.id]
  ).length;

  const percentage = requiredHabits.length
    ? completed / requiredHabits.length * 100
    : 0;

  return (
    <Card>
      <div className="flex items-center
        justify-between mb-4">

        <div>
          <h2 className="text-lg font-bold">
            Daily essentials
          </h2>

          <p className="text-xs text-muted mt-1">
            {completed}/{requiredHabits.length}
            {" "}daily goals completed
          </p>
        </div>

        <Link
          to="/settings"
          aria-label="Manage daily essentials"
          className="p-2.5 bg-background rounded-xl"
        >
          <Settings2 size={20} />
        </Link>

      </div>

      <div className="h-2 bg-background
        rounded-full overflow-hidden mb-5">

        <div
          className="h-full bg-primary rounded-full
            transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <div className="divide-y divide-border">

        {habits.map(habit => {
          const logged = completedHabits[habit.id];
          const item = logged || habit;

          return (
            <button
              key={habit.id}
              type="button"
              aria-pressed={Boolean(logged)}
              onClick={() => onToggle(habit)}
              className="flex items-center gap-3
                w-full text-left py-4"
            >

              <span className="text-2xl">
                {habit.icon}
              </span>

              <div className="flex-1 min-w-0">

                <h3 className="font-semibold text-sm">
                  {habit.name}

                  {!habit.required && (
                    <span className="ml-2 text-xs
                      font-normal text-muted">
                      Optional
                    </span>
                  )}
                </h3>

                <p className="text-xs text-muted mt-1">
                  {item.quantity}
                </p>

                {item.calories == null ||
                 item.protein == null ? (
                  <p className="text-xs text-muted mt-1">
                    Nutrition not verified
                  </p>
                ) : (
                  (item.calories > 0 ||
                   item.protein > 0) && (
                    <p className="text-xs mt-1">
                      {item.calories} kcal ·
                      {" "}{item.protein} g protein
                    </p>
                  )
                )}

              </div>

              <div className={`w-6 h-6 rounded-lg
                border flex items-center justify-center
                transition-colors shrink-0
                ${logged
                  ? "bg-primary border-primary text-background"
                  : "border-muted"}`}>

                {logged && <Check size={15} />}

              </div>

            </button>
          );
        })}

      </div>

      {!habits.length && (
        <p className="text-sm text-muted">
          Add your daily essentials in Settings.
        </p>
      )}

    </Card>
  );
}

export default EssentialsSection;