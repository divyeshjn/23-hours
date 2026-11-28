import {
  formatChange
} from "../../../utils/bodyProgress";

export default function MeasurementComparison({
  measurements,
  unit
}) {
  return (
    <section className="min-w-0 rounded-2xl
      border border-border bg-card p-4 sm:p-6">

      <h2 className="font-heading text-lg
        font-bold text-foreground">

        Measurement comparison

      </h2>

      <p className="mt-1 text-sm text-muted">

        First and latest recorded values ({unit})

      </p>

      <div className="mt-5 overflow-x-auto
        rounded-xl border border-border">

        <table className="w-full text-left text-sm">

          <thead className="bg-surface">

            <tr className="border-b border-border
              text-xs text-muted">

              <th
                scope="col"
                className="px-3 py-3 font-semibold
                  sm:px-4"
              >
                Measurement
              </th>

              <th
                scope="col"
                className="px-2 py-3 text-right
                  font-semibold"
              >
                Initial
              </th>

              <th
                scope="col"
                className="px-2 py-3 text-right
                  font-semibold"
              >
                Latest
              </th>

              <th
                scope="col"
                className="px-3 py-3 text-right
                  font-semibold sm:px-4"
              >
                Change
              </th>

            </tr>

          </thead>

          <tbody>

            {measurements.map(item => (

              <tr
                key={item.key}
                className="border-b border-border
                  last:border-0 transition-colors
                  hover:bg-surface/50"
              >

                <td className="px-3 py-4
                  text-xs font-medium
                  text-foreground sm:px-4
                  sm:text-sm">

                  {item.label}

                </td>

                <td className="px-2 py-4
                  text-right tabular-nums
                  whitespace-nowrap text-muted">

                  {item.initial ?? "—"}

                </td>

                <td className={`px-2 py-4
                  text-right font-semibold
                  tabular-nums whitespace-nowrap ${
                    item.latest == null
                      ? "text-muted"
                      : "text-primary"
                  }`}>

                  {item.latest ?? "—"}

                </td>

                <td className="px-3 py-4
                  text-right sm:px-4">

                  <span className={`inline-block
                    rounded-lg px-2 py-1
                    text-xs font-medium
                    tabular-nums whitespace-nowrap
                    sm:text-sm ${
                      item.change == null
                        ? "text-muted"
                        : "bg-surface text-foreground"
                    }`}>

                    {formatChange(item.change)}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}