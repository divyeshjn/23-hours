import { Camera, PencilLine } from "lucide-react";

function EntryMethodSelector({
  onManual,
  onCamera
}) {
  const methods = [
    {
      label: "Manual",
      description: "Enter values",
      icon: PencilLine,
      action: onManual
    },
    {
      label: "Camera",
      description: "Calculate with AI",
      icon: Camera,
      action: onCamera
    }
  ];

  return (
    <div className="flex flex-col gap-4">

      <p className="text-sm text-muted">
        How would you like to log your meal?
      </p>

      <div className="grid grid-cols-2 gap-3">

        {methods.map(method => {
          const Icon = method.icon;

          return (
            <button
              key={method.label}
              type="button"
              onClick={method.action}
              className="flex flex-col items-center
                justify-center gap-3 rounded-2xl
                border border-border bg-surface
                px-3 py-7
                hover:border-primary
                hover:bg-primary/5
                active:scale-[0.98]
                transition-all duration-200"
            >

              <div className="flex items-center
                justify-center w-14 h-14
                rounded-2xl bg-primary/10">

                <Icon
                  size={27}
                  strokeWidth={1.8}
                  className="text-primary"
                />

              </div>

              <span className="font-semibold text-foreground">
                {method.label}
              </span>

              <span className="text-xs text-muted">
                {method.description}
              </span>

            </button>
          );
        })}

      </div>
    </div>
  );
}

export default EntryMethodSelector;