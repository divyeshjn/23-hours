import { WifiOff } from "lucide-react";

import useOnlineStatus from "../../hooks/useOnlineStatus";

export default function OfflineBanner() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-50 mb-4
        flex items-center justify-center gap-3
        rounded-xl border border-amber-500/20
        bg-[#211C12] px-4 py-3
        text-sm font-medium text-amber-400"
    >
      <WifiOff
        size={19}
        className="shrink-0"
      />

      <span className="leading-relaxed">
        You're offline. Reconnect to save changes.
      </span>
    </div>
  );
}