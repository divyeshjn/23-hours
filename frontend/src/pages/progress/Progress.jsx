import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ProgressTabs from "./components/ProgressTabs";
import BodyProgress from "./components/BodyProgress";

import NutritionProgress from "./nutrition/NutritionProgress";

function Progress() {
  const [activeTab, setActiveTab] =
    useState("nutrition");

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">

      <PageHeader
        title="Progress"
        subtitle="Every small step counts"
      />

      <ProgressTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="min-w-0">

        {activeTab === "nutrition"
          ? <NutritionProgress />
          : <BodyProgress />
        }

      </div>

    </div>
  );
}

export default Progress;