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
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">

      <div className="flex items-center gap-2">

        {Icon && (
          <Icon
            size={20}
            className="text-primary"
          />
        )}

        <h2 className="font-heading font-bold text-lg text-foreground">
          {title}
        </h2>

      </div>

      <p className="mt-1 text-sm text-muted">
        {subtitle}
      </p>

      {!hasData ? (

        <div className="py-12 text-center text-sm text-muted">
          No data recorded for this period.
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
                  stroke="#292929"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  tick={{
                    fontSize: 10,
                    fill: "#A0A0A0"
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                  minTickGap={15}
                />

                <YAxis
                  tickFormatter={value=>Number(Number(value).toFixed(2)).toString()}
                  domain={[
                    0,
                    max => Math.max(
                      max,
                      (target || 0) / divisor
                    ) * 1.15
                  ]}
                  tick={{
                    fontSize: 11,
                    fill: "#A0A0A0"
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
                    fill: "rgba(37, 211, 102, 0.08)"
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #353535",
                    background: "#202020",
                    fontSize: "13px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                  }}
                  labelStyle={{
                    color: "#F5F5F5",
                    fontWeight: 600,
                    marginBottom: "4px"
                  }}
                  itemStyle={{
                    color: "#25D366"
                  }}
                />

                {target > 0 && (
                  <ReferenceLine
                    y={target / divisor}
                    stroke="#A0A0A0"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    ifOverflow="extendDomain"
                  />
                )}

                <Bar
                  dataKey="value"
                  fill="#25D366"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={42}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="mt-4 flex flex-wrap
            justify-center gap-5 text-xs text-muted">

            <span className="flex items-center gap-2">

              <span className="h-3 w-3 rounded bg-primary" />

              Recorded intake / daily average

            </span>

            {target > 0 && (
              <span className="flex items-center gap-2">

                <span className="w-5 border-t-2
                  border-dashed border-muted" />

                Current target

              </span>
            )}

          </div>
        </>
      )}

    </section>
  );
}