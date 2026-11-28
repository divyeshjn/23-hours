import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ClipboardCheck,
  CalendarDays
} from "lucide-react";

import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";

import useSettings from "../../../hooks/useSettings";
import useBodyProgress from "../hooks/useBodyProgress";

import ProgressOverview from "./ProgressOverview";
import WeightChart from "./WeightChart";
import MeasurementChart from "./MeasurementChart";
import MeasurementComparison from "./MeasurementComparison";

function BodyProgress() {

  const { settings } = useSettings();

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const unit =
    selectedUnit ??
    settings?.measurementUnit ??
    "in";

  const {
    totalCheckIns,

    weightHistory,
    weightSummary,

    measurements,
    waistSummary,

    loading,
    error,
    refresh

  } = useBodyProgress(unit);

  return (

    <div className="min-w-0">

      {loading ? (

        <LoadingState
          message="Loading your body progress..."
        />

      ) : error ? (

        <ErrorState
          message={error}
          onRetry={refresh}
        />

      ) : totalCheckIns === 0 ? (

        <div className="rounded-2xl border
          border-border bg-card px-5 py-10
          text-center sm:p-10">

          <div className="mx-auto flex
            h-20 w-20 items-center
            justify-center rounded-3xl
            border border-primary/15
            bg-primary/10">

            <ClipboardCheck
              size={34}
              className="text-primary"
            />

          </div>

          <h2 className="mt-5 text-xl
            font-heading font-bold
            text-foreground">

            Your progress starts here

          </h2>

          <p className="mx-auto mt-2 max-w-sm
            text-sm leading-relaxed text-muted">

            Complete your first weekly check-in
            to start tracking your weight
            and body measurements.

          </p>

          <Link
            to="/weekly-checkin"
            className="mt-6 inline-flex
              items-center justify-center gap-2
              rounded-xl bg-primary px-5 py-3
              text-sm font-bold text-background
              transition-opacity hover:opacity-90"
          >

            <ClipboardCheck size={18} />

            Complete first check-in

          </Link>

        </div>

      ) : (

        <div className="min-w-0 space-y-5 sm:space-y-6">

          {/* Progress controls */}

          <div className="flex flex-wrap
            items-center justify-between gap-3
            rounded-2xl border border-border
            bg-card p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10
                shrink-0 items-center justify-center
                rounded-xl bg-primary/10">

                <CalendarDays
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <p className="text-xs text-muted">
                  Recorded progress
                </p>

                <p className="mt-0.5 text-sm
                  font-semibold text-foreground">

                  {totalCheckIns} weekly{" "}

                  {totalCheckIns === 1
                    ? "check-in"
                    : "check-ins"}

                </p>

              </div>

            </div>

            <div className="flex rounded-xl
              border border-border bg-surface p-1">

              {["in", "cm"].map(item => (

                <button
                  key={item}
                  type="button"
                  aria-pressed={unit === item}
                  onClick={() =>
                    setSelectedUnit(item)
                  }
                  className={`rounded-lg px-4 py-2
                    text-sm font-semibold
                    transition-colors duration-200
                    ${
                      unit === item
                        ? "bg-primary text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          {/* Summary cards */}

          <ProgressOverview
            weightSummary={weightSummary}
            waistSummary={waistSummary}
            unit={unit}
          />

          {/* Weight chart */}

          <WeightChart
            history={weightHistory}
          />

          {/* Individual measurement chart */}

          <MeasurementChart
            measurements={measurements}
            unit={unit}
          />

          {/* Comparison table */}

          <MeasurementComparison
            measurements={measurements}
            unit={unit}
          />

          {/* New check-in */}

          <Link
            to="/weekly-checkin"
            className="flex w-full items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 py-3.5
              text-sm font-bold text-background
              transition-opacity hover:opacity-90"
          >

            <ClipboardCheck size={19} />

            Weekly check-in

          </Link>

        </div>

      )}

    </div>

  );
}

export default BodyProgress;