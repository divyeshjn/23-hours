import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Make 23 Hours your own"
      />

      <Card>
        <p className="text-muted">
          Customise your goals, daily essentials
          and saved foods.
        </p>
      </Card>
    </>
  );
}

export default Settings;
