import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

export default function NutritionChart({
  title,
  subtitle,
  days,
  metric,
  target,
  unit,
  divisor = 1,
  icon: Icon
}) {
  const data = days.map(day => ({
    ...day,

    value:
      day.future || day[metric] === null
        ? null
        : day[metric] / divisor
  }));

  const hasData = data.some(
    day => day.value !== null
  );

  return (
    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <div className="flex items-center gap-2">

        {Icon && (
          <Icon
            size={20}
            className="text-primary"
          />
        )}

        <h2 className="font-heading
          font-bold text-lg">
          {title}
        </h2>

      </div>

      <p className="mt-1 text-sm text-muted">
        {subtitle}
      </p>

      {!hasData ? (
        <div className="py-12 text-center
          text-sm text-muted">
          No data recorded for this week.
        </div>
      ) : (
        <>
          <div className="mt-6 h-64 w-full min-w-0">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 15,
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
                    fontSize: 10,
                    fill: "#858780"
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />

                <YAxis
                  domain={[
                    0,
                    max => Math.max(
                      max,
                      (target || 0) / divisor
                    ) * 1.15
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
                    `${Number(value).toFixed(
                      divisor === 1 ? 0 : 2
                    )} ${unit}`,
                    title
                  ]}
                  cursor={{
                    fill: "#A8BBA220"
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #EAE7E1",
                    background: "#FFFFFF",
                    fontSize: "13px"
                  }}
                />

                {target > 0 && (
                  <ReferenceLine
                    y={target / divisor}
                    stroke="#354F40"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    ifOverflow="extendDomain"
                  />
                )}

                <Bar
                  dataKey="value"
                  fill="#81947B"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={42}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="mt-4 flex flex-wrap
            justify-center gap-5
            text-xs text-muted">

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded
                bg-[#81947B]" />
              Recorded intake
            </span>

            {target > 0 && (
              <span className="flex items-center gap-2">
                <span className="w-5 border-t-2
                  border-dashed border-primary" />
                Current target
              </span>
            )}

          </div>
        </>
      )}

    </section>
  );
}