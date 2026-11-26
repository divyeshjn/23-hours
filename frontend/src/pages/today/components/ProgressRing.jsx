import {
  calculatePercentage,
  calculateRemaining
} from "../../../utils/nutrition";

function ProgressRing({
  label,
  value,
  target,
  unit,
  color
}) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;

  const percentage = calculatePercentage(value, target);

  const progress = Math.min(
    100,
    Math.max(0, percentage)
  );

  const offset =
    circumference - (progress / 100) * circumference;

  const remaining = calculateRemaining(value, target);

  return (
    <div className="flex flex-col items-center">

      <div className="relative w-full max-w-42">

        <svg
          viewBox="0 0 150 150"
          className="w-full -rotate-90"
        >
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke="#F0F0EB"
            strokeWidth="10"
          />

          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex
          flex-col items-center justify-center">

          <span className="text-2xl sm:text-3xl
            font-heading font-extrabold">
            {Number(value.toFixed(1)).toLocaleString()}
          </span>

          <span className="text-xs text-muted">
            / {target.toLocaleString()} {unit}
          </span>

        </div>
      </div>

      <h3 className="font-semibold mt-2">
        {label}
      </h3>

      <p className="text-xs text-muted mt-1 text-center">
        {value > target
          ? `${Number((value - target).toFixed(1))} ${unit} above target`
          : `${Number(remaining.toFixed(1))} ${unit} remaining`}
      </p>

    </div>
  );
}

export default ProgressRing;
