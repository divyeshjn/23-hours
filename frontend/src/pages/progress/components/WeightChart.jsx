import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { Scale } from "lucide-react";

export default function WeightChart({ history }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">

      <div className="flex items-center gap-2">
        <Scale
          size={20}
          className="text-primary"
        />

        <h2 className="font-heading font-bold text-lg text-foreground">
          Weight trend
        </h2>
      </div>

      <p className="mt-1 text-sm text-muted">
        Your recorded body weight over time
      </p>

      {!history.length ? (

        <div className="py-12 text-center text-sm text-muted">
          No weight measurements recorded yet.
        </div>

      ) : (

        <div className="mt-6 h-64 w-full min-w-0">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={history}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0
              }}
            >

              <defs>
                <linearGradient
                  id="weightGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#25D366"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#25D366"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#292929"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 11,
                  fill: "#A0A0A0"
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
                  fill: "#A0A0A0"
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={value => [
                  `${Number(value).toFixed(1)} kg`,
                  "Weight"
                ]}
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
                cursor={{
                  stroke: "#555555",
                  strokeDasharray: "4 4"
                }}
              />

              <Area
                type="linear"
                dataKey="value"
                stroke="#25D366"
                strokeWidth={2.5}
                fill="url(#weightGradient)"
                dot={{
                  r: 4,
                  fill: "#25D366",
                  stroke: "#161616",
                  strokeWidth: 2
                }}
                activeDot={{
                  r: 6,
                  fill: "#25D366",
                  stroke: "#161616",
                  strokeWidth: 2
                }}
                baseValue="dataMin"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      )}

      {history.length === 1 && (
        <p className="mt-3 text-center text-xs text-muted">
          Record another weekly check-in
          to start seeing your trend.
        </p>
      )}

    </section>
  );
}