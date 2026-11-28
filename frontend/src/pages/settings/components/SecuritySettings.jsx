import { useState } from "react";

import {
  ShieldCheck,
  LogOut,
  LockKeyhole,
  LoaderCircle,
  AlertCircle
} from "lucide-react";

import useAuth from "../../../hooks/useAuth";

function SecuritySettings() {

  const { logout, saving } = useAuth();

  const [confirmLogout, setConfirmLogout] =
    useState(false);

  const [error, setError] = useState("");

  async function handleLogout() {

    if (saving) return;

    setError("");

    const success = await logout();

    if (!success) {
      setError(
        "Unable to log out. Please try again."
      );
    }
  }

  return (
    <section className="rounded-2xl
      border border-border bg-card p-5 sm:p-6">

      {/* HEADER */}

      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-12 w-12
          shrink-0 items-center justify-center
          rounded-xl border border-primary/15
          bg-primary/10">

          <ShieldCheck
            size={24}
            className="text-primary"
          />

        </div>

        <div>

          <h2 className="font-heading text-lg
            font-bold text-foreground">

            Privacy & Security

          </h2>

          <p className="mt-1 text-xs text-muted">
            Manage your private session
          </p>

        </div>

      </div>

      {/* SESSION STATUS */}

      <div className="flex items-center gap-3
        rounded-xl border border-border
        bg-surface p-4">

        <LockKeyhole
          size={20}
          className="shrink-0 text-primary"
        />

        <div className="min-w-0 flex-1">

          <p className="text-sm font-semibold
            text-foreground">

            Private passcode enabled

          </p>

          <p className="mt-1 text-xs text-muted">
            Your account is protected
          </p>

        </div>

        <span className="h-2.5 w-2.5
          shrink-0 rounded-full bg-primary" />

      </div>

      {/* LOGOUT BUTTON */}

      <button
        type="button"
        disabled={saving}
        onClick={() => {
          setError("");
          setConfirmLogout(true);
        }}
        className="mt-5 flex w-full items-center
          justify-center gap-2 rounded-xl
          border border-danger/25
          bg-danger/5 px-4 py-3.5
          text-sm font-semibold text-red-400
          transition-colors hover:bg-danger/10
          hover:border-danger/50
          disabled:opacity-50"
      >

        <LogOut size={18} />

        Log out

      </button>

      {/* CONFIRMATION MODAL */}

      {confirmLogout && (

        <div className="fixed inset-0 z-100
          flex items-center justify-center
          bg-black/75 p-5 backdrop-blur-sm">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm
              max-h-[90dvh] overflow-y-auto
              rounded-3xl border border-border
              bg-card p-6 shadow-2xl"
          >

            <div className="mb-4 flex h-14 w-14
              items-center justify-center
              rounded-2xl border border-danger/15
              bg-danger/10">

              <LogOut
                size={25}
                className="text-red-400"
              />

            </div>

            <h3
              id="logout-title"
              className="font-heading text-xl
                font-bold text-foreground"
            >

              Log out?

            </h3>

            <p className="mt-3 text-sm
              leading-relaxed text-muted">

              Your nutrition records will remain saved.
              You will need your private passcode to
              access the dashboard again.

            </p>

            {error && (

              <div
                role="alert"
                className="mt-4 flex items-start
                  gap-2 rounded-xl
                  border border-danger/20
                  bg-danger/10 p-3
                  text-sm text-red-400"
              >

                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>

              </div>

            )}

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  setConfirmLogout(false)
                }
                className="flex-1 rounded-xl
                  border border-border bg-surface
                  px-3 py-3.5 text-sm font-semibold
                  text-foreground transition-colors
                  hover:border-muted
                  disabled:opacity-50"
              >

                Cancel

              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleLogout}
                className="flex flex-1 items-center
                  justify-center gap-2 rounded-xl
                  bg-red-600 px-3 py-3.5
                  text-sm font-semibold text-white
                  transition-colors hover:bg-red-700
                  disabled:opacity-50"
              >

                {saving ? (

                  <>
                    <LoaderCircle
                      size={16}
                      className="shrink-0 animate-spin"
                    />

                    Logging out...
                  </>

                ) : (

                  <>
                    <LogOut size={16} />

                    Log out
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default SecuritySettings;