import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

function Today() {
  const date = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Kolkata"
  }).format(new Date());

  return (
    <>
      <PageHeader
        title="Today"
        subtitle={date}
      />

      <Card>
        <h2 className="text-lg font-bold">
          Daily nutrition
        </h2>

        <p className="text-muted text-sm mt-2">
          Your calorie and protein overview.
        </p>
      </Card>
    </>
  );
}

export default Today;
