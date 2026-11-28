export default function LoadingState({
  message = "Loading..."
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center
        justify-center gap-4 py-20"
    >

      <div
        aria-hidden="true"
        className="h-10 w-10 rounded-full
          border-[3px] border-primary/15
          border-t-primary animate-spin
          motion-reduce:animate-none"
      />

      <p className="text-sm font-medium text-muted">
        {message}
      </p>

    </div>
  );
}