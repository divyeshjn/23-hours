import {
  formatChange
} from "../../../utils/bodyProgress";

export default function MeasurementComparison({
  measurements,
  unit
}) {

  return (

    <section className="rounded-2xl border
      border-border bg-card p-4 sm:p-6">

      <h2 className="font-heading
        font-bold text-lg">

        Measurement comparison

      </h2>

      <p className="mt-1 text-sm text-muted">

        First and latest recorded values
        ({unit})

      </p>

      <div className="mt-5 overflow-x-auto">

        <table className="w-full
          text-sm text-left">

          <thead>

            <tr className="border-b border-border
              text-xs text-muted">

              <th className="pb-3 pr-3 font-medium">
                Measurement
              </th>

              <th className="pb-3 px-2
                text-right font-medium">
                Initial
              </th>

              <th className="pb-3 px-2
                text-right font-medium">
                Latest
              </th>

              <th className="pb-3 pl-2
                text-right font-medium">
                Change
              </th>

            </tr>

          </thead>

          <tbody>

            {measurements.map(item => (

              <tr
                key={item.key}
                className="border-b border-border
                last:border-0"
              >

                <td className="py-4 pr-3
                  font-medium text-primary">

                  {item.label}

                </td>

                <td className="py-4 px-2
                  text-right tabular-nums">

                  {item.initial ?? "—"}

                </td>

                <td className="py-4 px-2
                  text-right tabular-nums">

                  {item.latest ?? "—"}

                </td>

                <td className="py-4 pl-2
                  text-right font-medium
                  tabular-nums text-primary
                  whitespace-nowrap">

                  {formatChange(item.change)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );
}