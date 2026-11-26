import { useState, useRef } from "react";
import { Dumbbell, Check } from "lucide-react";
import Card from "../../../components/common/Card";

function WorkoutCard({ workout, onChange }) {
  const [description, setDescription] = useState(workout.description || "");
  const [duration, setDuration] = useState(workout.duration ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const dirty = description !== workout.description || String(duration) !== String(workout.duration ?? "");

  async function save(patch) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const success = await onChange({
        description,
        duration: duration === "" ? null : Number(duration),
        ...patch
      });
      if (!success) setError("Could not save workout. Please try again.");
    } catch (err) {
      setError(err.message || "Request failed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  return (
    <Card>

      <div className="flex items-center
        justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="bg-sage/20 p-3 rounded-xl">
            <Dumbbell size={23} />
          </div>

          <div>
            <h2 className="font-bold">
              Today's workout
            </h2>

            <p className="text-xs text-muted">
              Movement and training
            </p>
          </div>

        </div>

        <button
          type="button"
          aria-label="Mark workout completed"
          aria-pressed={workout.completed}
          disabled={busy}
          onClick={() => save({
            completed: !workout.completed,
            restDay: false
          })}
          className={`w-7 h-7 rounded-lg border
            flex items-center justify-center
            ${workout.completed
              ? "bg-primary border-primary text-white"
              : "border-sage"}`}
        >
          {workout.completed && <Check size={17} />}
        </button>

      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">

        <button
          type="button"
          disabled={busy}
          onClick={() => save({
            restDay: false
          })}
          className={`rounded-xl py-2.5 text-sm
            ${!workout.restDay
              ? "bg-sage/30"
              : "bg-background text-muted"}`}
        >
          Training day
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => save({
            restDay: true,
            completed: false
          })}
          className={`rounded-xl py-2.5 text-sm
            ${workout.restDay
              ? "bg-sage/30"
              : "bg-background text-muted"}`}
        >
          Rest day
        </button>

      </div>

      {!workout.restDay && (
        <div className="flex flex-col gap-3">

          <textarea
            value={description}
            disabled={busy}
            onChange={e => setDescription(e.target.value)}
            placeholder="What did you train today?"
            className="w-full min-h-24 p-3
              rounded-xl border border-border
              outline-none focus:border-sage
              resize-none text-sm"
          />

          <label className="flex items-center
            justify-between gap-3">

            <span className="text-sm">
              Duration (minutes)
            </span>

            <input
              type="number"
              min="0"
              value={duration}
              disabled={busy}
              onChange={e => setDuration(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
              placeholder="60"
              className="w-24 p-2.5 border
                border-border rounded-xl
                outline-none focus:border-sage"
            />

          </label>

          <button type="button" disabled={busy || !dirty}
            onClick={() => save({})}
            className="bg-primary text-white rounded-xl py-2.5 text-sm disabled:opacity-50">
            {busy ? "Saving..." : "Save workout details"}
          </button>
          {dirty && !busy && <p className="text-xs text-muted">Unsaved workout details</p>}

        </div>
      )}

      {workout.restDay && (
        <p className="text-sm text-muted">
          Rest and recovery are part of progress.
        </p>
      )}

      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
    </Card>
  );
}

export default WorkoutCard;