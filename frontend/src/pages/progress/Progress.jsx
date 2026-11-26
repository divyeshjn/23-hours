import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

function Progress() {
  return (
    <>
      <PageHeader
        title="Progress"
        subtitle="Every small step counts"
      />

      <Card>
        <p className="text-muted">
          Nutrition trends and body measurements
          will appear here.
        </p>
      </Card>
    </>
  );
}

export default Progress;
