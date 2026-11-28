import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

import EntryMethodSelector from "./EntryMethodSelector";
import FoodScanner from "./FoodScanner";
import NutritionEntryForm from "./NutritionEntryForm";

export default function NutritionEntryModal({
  title,
  entry,
  onClose,
  onSave,
  onDelete,
  requireName=false
}) {
  const [mode, setMode] = useState(
    entry ? "manual" : "choose"
  );

  const [calories, setCalories] = useState(
    entry?.calories ?? ""
  );

  const [name, setName] = useState(
    entry?.name ?? ""
  );

  const [protein, setProtein] = useState(
    entry?.protein ?? ""
  );

  const [estimated, setEstimated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const lock = useRef(false);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  // Close modal using Escape on desktop
  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.key === "Escape" &&
        !lock.current
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  // Handle save and delete operations
  async function run(operation) {
    if (lock.current) return;

    lock.current = true;

    setBusy(true);
    setError("");

    try {
      const success = await operation();

      if (!success) {
        setError(
          "Could not save changes. Please try again."
        );
      }

    } catch (err) {
      setError(
        err.message || "Request failed."
      );

    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  // Receive estimated nutrition from Gemini
  function handleResult(result) {
    setCalories(result.calories);
    setProtein(result.protein);

    setEstimated(true);
    setError("");
    setMode("manual");
  }

  // Open manual entry
  function handleManual() {
    setEstimated(false);
    setError("");
    setMode("manual");
  }

  // Return to entry method selection
  function handleBack() {
    setError("");
    setEstimated(false);
    setMode("choose");
  }

  // Validate and save nutrition values
  function handleSave() {
    const cal = Number(calories);
    const pro = Number(protein);

    if (requireName && !name.trim()) {
      setError("Please enter the food name.");
      return;
    }

    if (
      String(calories).trim() === "" ||
      String(protein).trim() === "" ||
      !Number.isFinite(cal) ||
      !Number.isFinite(pro) ||
      cal < 0 ||
      pro < 0
    ) {
      setError(
        "Please enter valid nutrition values."
      );

      return;
    }

    run(() =>
      onSave({
        name: name.trim(),
        calories: cal,
        protein: pro
      })
    );
  }

  function handleClose() {
    if (!lock.current) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-100
        bg-black/75 backdrop-blur-sm
        flex items-end sm:items-center
        justify-center sm:p-4"
    >

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bg-card border border-border w-full sm:max-w-md
          rounded-t-3xl sm:rounded-3xl
          px-6 pt-6
          pb-[calc(24px+env(safe-area-inset-bottom,0px))]
          sm:pb-6
          max-h-[90dvh]
          overflow-y-auto
          overscroll-contain"
      >

        {/* Mobile bottom sheet handle */}

        <div
          aria-hidden="true"
          className="w-10 h-1 rounded-full
            bg-muted/40 mx-auto mb-5 sm:hidden"
        />

        {/* Modal header */}

        <div
          className="flex items-center
            justify-between gap-3 mb-6"
        >

          <h2
            className="text-xl font-heading
              font-bold text-foreground"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={busy}
            aria-label="Close"
            className="flex items-center
              justify-center w-10 h-10
              rounded-full bg-surface
              text-muted hover:text-primary
              transition-colors
              disabled:opacity-50"
          >
            <X size={22} />
          </button>

        </div>

        {/* Manual or camera selection */}

        {mode === "choose" && (
          <EntryMethodSelector
            onManual={handleManual}
            onCamera={() => setMode("camera")}
          />
        )}

        {/* AI camera scanner */}

        {mode === "camera" && (
          <FoodScanner
            onResult={handleResult}
            onBack={handleBack}
          />
        )}

        {/* Nutrition entry form */}

        {mode === "manual" && (
          <NutritionEntryForm
            requireName={requireName}
            name={name}
            setName={setName}
            calories={calories}
            protein={protein}
            setCalories={setCalories}
            setProtein={setProtein}
            estimated={estimated}
            busy={busy}
            error={error}
            editing={Boolean(entry)}
            onSubmit={handleSave}
            onDelete={() => run(onDelete)}
            onBack={handleBack}
          />
        )}

      </div>

    </div>
  );
}