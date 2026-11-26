import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

function History() {
  return (
    <>
      <PageHeader
        title="History"
        subtitle="Your daily nutrition journey"
      />

      <Card>
        <p className="text-muted">
          Previous daily records will appear here.
        </p>
      </Card>
    </>
  );
}

export default History;
