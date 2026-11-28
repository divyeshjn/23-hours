import { AlertCircle } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import useSettings from "../../hooks/useSettings";

import SecuritySettings from "./components/SecuritySettings";
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
    <div className="min-w-0">

      <PageHeader
        title="Settings"
        subtitle="Make 23 Hours your own"
      />

      <div className="flex min-w-0 flex-col
        gap-5 sm:gap-6">

        {error && (

          <div
            role="alert"
            className="flex items-start gap-3
              rounded-xl border border-danger/20
              bg-danger/10 p-4
              text-sm text-red-400"
          >

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p className="min-w-0 wrap-break-words">
              {error}
            </p>

          </div>

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

        <SecuritySettings />

      </div>

    </div>
  );
}

export default Settings;