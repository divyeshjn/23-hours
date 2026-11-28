import { WifiOff } from "lucide-react";

import useOnlineStatus from "../../hooks/useOnlineStatus";

export default function OfflineBanner() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-50
        bg-peach text-primary
        px-4 py-3
        flex items-center justify-center
        gap-2 text-sm font-medium"
    >
      <WifiOff
        size={18}
        className="shrink-0"
      />

      <span>
        You're offline. Reconnect to save changes.
      </span>
    </div>
  );
}