import {
  Camera,
  PencilLine
} from "lucide-react";

export default function EntryMethodSelector({
  onManual,
  onCamera
}) {
  return (
    <div className="flex flex-col gap-4">

      <p className="text-sm text-muted">
        How would you like to log your meal?
      </p>

      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          onClick={onManual}
          className="flex flex-col items-center
            justify-center gap-3 rounded-2xl
            border border-border bg-background
            px-3 py-7 hover:border-primary
            transition-colors"
        >

          <div className="flex items-center
            justify-center w-14 h-14
            rounded-2xl bg-peach/30">

            <PencilLine
              size={27}
              className="text-primary"
            />

          </div>

          <span className="font-semibold">
            Manual
          </span>

          <span className="text-xs text-muted">
            Enter values
          </span>

        </button>

        <button
          type="button"
          onClick={onCamera}
          className="flex flex-col items-center
            justify-center gap-3 rounded-2xl
            border border-border bg-background
            px-3 py-7 hover:border-primary
            transition-colors"
        >

          <div className="flex items-center
            justify-center w-14 h-14
            rounded-2xl bg-sage/30">

            <Camera
              size={27}
              className="text-primary"
            />

          </div>

          <span className="font-semibold">
            Camera
          </span>

          <span className="text-xs text-muted">
            Calculate with AI
          </span>

        </button>

      </div>

    </div>
  );
}