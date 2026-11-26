import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry
}) {
  return (
    <div className="bg-white border border-[#EAE7E1] rounded-2xl p-6 text-center">

      <AlertCircle
        size={32}
        className="mx-auto text-red-400"
      />

      <h3 className="mt-3 font-semibold text-[#354F40]">
        Something went wrong
      </h3>

      <p className="mt-2 text-sm text-[#858780]">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[#354F40] text-white text-sm"
        >
          <RefreshCw size={15} />

          Try again
        </button>
      )}

    </div>
  );
}