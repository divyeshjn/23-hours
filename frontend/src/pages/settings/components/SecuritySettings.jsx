import { useState } from "react";

import {
  ShieldCheck,
  LogOut,
  LockKeyhole,
  LoaderCircle
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
    <section className="bg-white rounded-2xl
      border border-[#EAE7E1] p-5">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-11 h-11 rounded-xl
          bg-[#A8BBA2]/20 flex items-center
          justify-center">

          <ShieldCheck
            size={22}
            className="text-[#354F40]"
          />

        </div>

        <div>
          <h2 className="font-semibold text-[#354F40]">
            Privacy & Security
          </h2>

          <p className="text-xs text-[#858780] mt-1">
            Manage your private session
          </p>
        </div>

      </div>

      {/* SESSION STATUS */}

      <div className="flex items-center gap-3
        bg-[#FAF8F5] rounded-xl p-4">

        <LockKeyhole
          size={20}
          className="text-[#81947B]"
        />

        <div className="flex-1">

          <p className="text-sm font-medium
            text-[#354F40]">
            Private passcode enabled
          </p>

          <p className="text-xs text-[#858780] mt-1">
            Your account is protected
          </p>

        </div>

        <span className="w-2.5 h-2.5
          rounded-full bg-[#81947B]" />

      </div>

      {/* LOGOUT BUTTON */}

      <button
        type="button"
        disabled={saving}
        onClick={() => {
          setError("");
          setConfirmLogout(true);
        }}
        className="w-full mt-5 flex items-center
          justify-center gap-2 border border-red-200
          text-red-600 rounded-xl py-3 text-sm
          font-medium hover:bg-red-50
          transition-colors disabled:opacity-50"
      >

        <LogOut size={17} />

        Log out

      </button>

      {/* CONFIRMATION MODAL */}

      {confirmLogout && (

        <div className="fixed inset-0 z-50
          bg-black/30 backdrop-blur-sm
          flex items-center justify-center p-5">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="bg-white rounded-2xl
              p-6 w-full max-w-sm shadow-xl"
          >

            <div className="w-12 h-12 rounded-xl
              bg-red-50 flex items-center
              justify-center mb-4">

              <LogOut
                size={22}
                className="text-red-600"
              />

            </div>

            <h3
              id="logout-title"
              className="text-lg font-semibold
                text-[#354F40]"
            >
              Log out?
            </h3>

            <p className="text-sm text-[#858780]
              mt-2 leading-relaxed">

              Your nutrition records will remain saved.
              You will need your private passcode to
              access the dashboard again.

            </p>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 mt-3"
              >
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  setConfirmLogout(false)
                }
                className="flex-1 border
                  border-[#EAE7E1] rounded-xl
                  py-3 text-sm font-medium
                  text-[#354F40] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleLogout}
                className="flex-1 bg-red-600
                  text-white rounded-xl py-3
                  text-sm font-medium
                  flex items-center justify-center
                  gap-2 disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Logging out...
                  </>
                ) : (
                  "Log out"
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