import PageHeader from "../../components/common/PageHeader";

import useSettings from "../../hooks/useSettings";

import HabitManager from "./components/HabitManager";
import NutritionSettings from "./components/NutritionSettings";

function Settings() {
  const {
    settings,
    saving,
    error,
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

        {error && (
          <p
            role="alert"
            className="text-sm text-red-600 bg-red-50 rounded-xl p-3"
          >
            {error}
          </p>
        )}

        <NutritionSettings
          targets={settings.targets}
          onSave={updateTargets}
          saving={saving}
        />

        <HabitManager
          habits={settings.habits}
          onAdd={addHabit}
          onUpdate={updateHabit}
          onDelete={deleteHabit}
          saving={saving}
        />

      </div>
    </>
  );
}

export default Settings;