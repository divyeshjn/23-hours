import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ProgressTabs from "./components/ProgressTabs";
import BodyProgress from "./components/BodyProgress";

import NutritionProgress from "./nutrition/NutritionProgress";

function Progress() {
  const [activeTab, setActiveTab] =
    useState("nutrition");

  return (
    <div className="space-y-5">

      <PageHeader
        title="Progress"
        subtitle="Every small step counts"
      />

      <ProgressTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "nutrition"
        ? <NutritionProgress />
        : <BodyProgress />
      }

    </div>
  );
}

export default Progress;