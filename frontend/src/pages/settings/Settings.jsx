import PageHeader from "../../components/common/PageHeader";

import useSettings from "../../hooks/useSettings";

import HabitManager from "./components/HabitManager";
import NutritionSettings from "./components/NutritionSettings";

function Settings() {
  const {
    settings,
    updateTargets,
    addHabit,
    updateHabit,
    deleteHabit
  } = useSettings();

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Make 23 Hours your own"
      />

      <div className="flex flex-col gap-6">

        <NutritionSettings
          targets={settings.targets}
          onSave={updateTargets}
        />

        <HabitManager
          habits={settings.habits}
          onAdd={addHabit}
          onUpdate={updateHabit}
          onDelete={deleteHabit}
        />

      </div>
    </>
  );
}

export default Settings;