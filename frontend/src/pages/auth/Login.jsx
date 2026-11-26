import { useState, useRef } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  LoaderCircle
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

function Login() {

  const [passcode, setPasscode] = useState("");

  const [showPasscode, setShowPasscode] =
    useState(false);

  const submitting = useRef(false);

  const {
    login,
    saving,
    error,
    clearError
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      submitting.current ||
      saving ||
      !passcode
    ) {
      return;
    }

    submitting.current = true;

    try {
      const success = await login(passcode);

      if (success) {
        setPasscode("");
      }

    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="min-h-dvh bg-[#FAF8F5]
      flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-sm">

        {/* BRANDING */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl
            bg-[#A8BBA2]/25 mx-auto mb-5
            flex items-center justify-center">

            <div className="w-14 h-14
              rounded-full border-2 border-[#354F40]
              flex items-center justify-center">

              <span className="text-2xl font-bold
                text-[#354F40]">
                23
              </span>

            </div>

          </div>

          <h1 className="text-3xl font-bold
            tracking-tight text-[#354F40]">
            23 Hours
          </h1>

          <p className="text-sm text-[#858780] mt-2">
            A little better, every day.
          </p>

        </div>

        {/* LOGIN CARD */}

        <div className="bg-white rounded-3xl
          border border-[#EAE7E1] p-6 sm:p-8
          shadow-sm">

          <h2 className="text-xl font-bold
            text-[#354F40]">
            Welcome back
          </h2>

          <p className="text-sm text-[#858780]
            mt-2 mb-7">
            Your personal wellness journey awaits.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* PASSCODE FIELD */}

            <div>

              <label
                htmlFor="passcode"
                className="block text-sm font-medium
                  text-[#354F40] mb-2"
              >
                Private passcode
              </label>

              <div className="relative">

                <input
                  id="passcode"
                  type={
                    showPasscode
                      ? "text"
                      : "password"
                  }
                  value={passcode}
                  disabled={saving}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your passcode"
                  onChange={e => {
                    setPasscode(e.target.value);
                    clearError();
                  }}
                  className="w-full border
                    border-[#EAE7E1] rounded-xl
                    py-3.5 pl-4 pr-12 text-sm
                    outline-none focus:border-[#A8BBA2]
                    disabled:opacity-50"
                />

                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setShowPasscode(previous => !previous)
                  }
                  aria-label={
                    showPasscode
                      ? "Hide passcode"
                      : "Show passcode"
                  }
                  className="absolute right-4 top-1/2
                    -translate-y-1/2 text-[#858780]"
                >

                  {showPasscode
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}

                </button>

              </div>

            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div
                role="alert"
                className="bg-red-50 border
                  border-red-100 rounded-xl
                  p-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={saving || !passcode}
              className="w-full bg-[#354F40]
                text-white rounded-xl py-3.5
                font-semibold text-sm
                flex items-center justify-center
                gap-2 transition-opacity
                disabled:opacity-50"
            >

              {saving ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />

                  Unlocking...
                </>
              ) : (
                <>
                  <LockKeyhole size={17} />

                  Unlock dashboard
                </>
              )}

            </button>

          </form>

          <div className="flex items-center
            justify-center gap-2 mt-6
            text-xs text-[#858780]">

            <ShieldCheck
              size={16}
              className="text-[#81947B]"
            />

            Private and protected

          </div>

        </div>

        {/* FOOTER */}

        <p className="text-center text-xs
          text-[#858780] mt-7">
          Progress, not perfection.
        </p>

      </div>

    </div>
  );
}

export default Login;