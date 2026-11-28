import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import {
  Ruler
} from "lucide-react";

import {
  formatChange
} from "../../../utils/bodyProgress";

export default function MeasurementChart({
  measurements,
  unit
}) {

  const [selected, setSelected] = useState("waist");

  const measurement = measurements.find(
    item => item.key === selected
  );

  const history = measurement?.history || [];

  return (

    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <div className="flex flex-wrap
        items-center justify-between gap-3">

        <div className="flex items-center gap-2">

          <Ruler size={20} />

          <h2 className="font-heading
            font-bold text-lg">

            Body measurements

          </h2>

        </div>

        <select
          value={selected}
          onChange={event =>
            setSelected(event.target.value)
          }
          className="rounded-xl border border-border
          bg-background px-3 py-2 text-sm
          text-primary outline-none"
        >

          {measurements.map(item => (

            <option
              key={item.key}
              value={item.key}
            >
              {item.label}
            </option>

          ))}

        </select>

      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">

        <div>

          <p className="text-xs text-muted">
            Starting
          </p>

          <p className="mt-1 font-heading
            text-lg font-bold">

            {measurement?.initial == null
              ? "—"
              : `${measurement.initial} ${unit}`}

          </p>

        </div>

        <div>

          <p className="text-xs text-muted">
            Latest
          </p>

          <p className="mt-1 font-heading
            text-lg font-bold">

            {measurement?.latest == null
              ? "—"
              : `${measurement.latest} ${unit}`}

          </p>

        </div>

        <div>

          <p className="text-xs text-muted">
            Total change
          </p>

          <p className="mt-1 font-heading
            text-lg font-bold">

            {formatChange(
              measurement?.change,
              unit
            )}

          </p>

        </div>

      </div>

      {!history.length ? (

        <div className="py-12 text-center
          text-sm text-muted">

          No measurements recorded for{" "}
          {measurement?.label?.toLowerCase()}.

        </div>

      ) : (

        <div className="mt-6 h-64 w-full min-w-0">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={history}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0
              }}
            >

              <CartesianGrid
                stroke="#EAE7E1"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 11,
                  fill: "#858780"
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
              />

              <YAxis
                domain={[
                  min => Math.max(0, Math.floor(min - 1)),
                  max => Math.ceil(max + 1)
                ]}
                tick={{
                  fontSize: 11,
                  fill: "#858780"
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={value => [
                  `${Number(value).toFixed(1)} ${unit}`,
                  measurement?.label
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #EAE7E1",
                  background: "#FFFFFF",
                  fontSize: "13px"
                }}
              />

              <Line
                type="linear"
                dataKey="value"
                stroke="#354F40"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#354F40",
                  strokeWidth: 0
                }}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      )}

      {history.length === 1 && (

        <p className="mt-3 text-center
          text-xs text-muted">

          At least two measurements are
          needed to calculate a change.

        </p>

      )}

    </section>

  );
}