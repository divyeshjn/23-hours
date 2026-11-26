import { Droplets, CheckCircle2 } from "lucide-react";
import Card from "../../../components/common/Card";

function WaterTracker({ water, target, onChange }) {
  const percentage = Math.min(
    water / target * 100,
    100
  );

  return (
    <Card>

      <div className="flex items-center
        justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="p-3 rounded-xl bg-blue-50
            text-blue-400">

            <Droplets size={23} />

          </div>

          <div>
            <h2 className="font-bold">
              Water intake
            </h2>

            <p className="text-xs text-muted">
              Daily hydration
            </p>
          </div>

        </div>

        {water >= target && (
          <CheckCircle2
            size={22}
            className="text-primary"
          />
        )}

      </div>

      <div className="flex items-end gap-2 mb-3">

        <span className="text-3xl font-heading
          font-extrabold">

          {Number((water / 1000).toFixed(2))} L

        </span>

        <span className="text-sm text-muted pb-1">
          / {target / 1000} L
        </span>

      </div>

      <div className="h-3 bg-blue-50
        rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-300 rounded-full
            transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="text-xs text-muted mt-2">

        {water >= target
          ? "Hydration goal reached"
          : `${target - water} ml remaining`}

      </p>

      <div className="grid grid-cols-3 gap-2 mt-5">

        {[-250, 250, 500].map(amount => (
          <button
            key={amount}
            type="button"
            disabled={amount < 0 && water === 0}
            onClick={() => onChange(amount)}
            className="py-3 rounded-xl border
              border-border text-sm font-medium
              hover:bg-blue-50 disabled:opacity-40"
          >
            {amount > 0 ? "+" : ""}
            {amount} ml
          </button>
        ))}

      </div>

    </Card>
  );
}

export default WaterTracker;