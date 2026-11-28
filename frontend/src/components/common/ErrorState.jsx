import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-border
        bg-card p-6 sm:p-8 text-center"
    >

      <div className="mx-auto flex h-16 w-16
        items-center justify-center rounded-2xl
        border border-danger/20 bg-danger/10">

        <AlertCircle
          size={30}
          className="text-red-400"
        />

      </div>

      <h3 className="mt-4 font-heading text-lg
        font-bold text-foreground">
        Something went wrong
      </h3>

      <p className="mx-auto mt-2 max-w-sm
        break-words text-sm leading-relaxed text-muted">
        {message}
      </p>

      {onRetry && (

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center
            justify-center gap-2 rounded-xl
            bg-primary px-5 py-3
            text-sm font-bold text-background
            transition-opacity hover:opacity-90"
        >

          <RefreshCw size={16} />

          Try again

        </button>

      )}

    </div>
  );
}