import { useState } from "react";

import { Link } from "react-router-dom";

import {
  ClipboardCheck,
  CalendarDays
} from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
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

    <>

      {loading ? (

        <LoadingState />

      ) : error ? (

        <ErrorState
          message={error}
          onRetry={refresh}
        />

      ) : totalCheckIns === 0 ? (

        <div className="rounded-2xl border
          border-border bg-card p-8
          text-center">

          <div className="mx-auto flex
            h-16 w-16 items-center
            justify-center rounded-2xl
            bg-sage/20">

            <ClipboardCheck
              size={30}
              className="text-primary"
            />

          </div>

          <h2 className="mt-5 text-xl
            font-heading font-bold">

            Your progress starts here

          </h2>

          <p className="mt-2 text-sm text-muted">

            Complete your first weekly check-in
            to start tracking your weight
            and body measurements.

          </p>

          <Link
            to="/weekly-checkin"
            className="mt-6 inline-flex
            rounded-xl bg-primary px-5 py-3
            text-sm font-medium text-background"
          >

            Complete first check-in

          </Link>

        </div>

      ) : (

        <div className="space-y-5">

          {/* Progress controls */}

          <div className="flex flex-wrap
            items-center justify-between gap-3">

            <div className="flex items-center
              gap-2 text-sm text-muted">

              <CalendarDays size={17} />

              {totalCheckIns} weekly{" "}

              {totalCheckIns === 1
                ? "check-in"
                : "check-ins"}

            </div>

            <div className="flex rounded-xl
              border border-border bg-card p-1">

              {["in", "cm"].map(item => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSelectedUnit(item)
                  }
                  className={`rounded-lg px-4 py-2
                    text-sm font-medium transition-colors
                    ${
                      unit === item
                        ? "bg-primary text-background"
                        : "text-muted"
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
            bg-primary px-4 py-3
            text-background font-medium"
          >
            <ClipboardCheck size={18} />
            Weekly check-in
          </Link>
        </div>
      )}
    </>
  );
}

export default BodyProgress;