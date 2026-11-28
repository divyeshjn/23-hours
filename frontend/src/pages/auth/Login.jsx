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
  const [showPasscode, setShowPasscode] = useState(false);

  const submitting = useRef(false);

  const {
    login,
    saving,
    error,
    clearError
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting.current || saving || !passcode) {
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
    <div className="min-h-dvh bg-background
      flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-sm">

        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl
            bg-primary/10 mx-auto mb-5
            flex items-center justify-center">

            <div className="w-14 h-14 rounded-full
              border-2 border-primary
              flex items-center justify-center">

              <span className="text-2xl font-bold text-primary">
                23
              </span>

            </div>
          </div>

          <h1 className="text-3xl font-bold
            tracking-tight text-primary">
            23 Hours
          </h1>

          <p className="text-sm text-muted mt-2">
            A little better, every day.
          </p>

        </div>

        <div className="bg-card rounded-3xl
          border border-border p-6 sm:p-8">

          <h2 className="text-xl font-bold text-foreground">
            Welcome back
          </h2>

          <p className="text-sm text-muted mt-2 mb-7">
            Your personal wellness journey awaits.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            <div>
              <label
                htmlFor="passcode"
                className="block text-sm font-medium
                  text-foreground mb-2"
              >
                Private passcode
              </label>

              <div className="relative">

                <input
                  id="passcode"
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  disabled={saving}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your passcode"
                  onChange={e => {
                    setPasscode(e.target.value);
                    clearError();
                  }}
                  className="w-full bg-surface
                    border border-border rounded-xl
                    py-3.5 pl-4 pr-12 text-sm
                    outline-none focus:border-primary
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
                    -translate-y-1/2 text-muted"
                >
                  {showPasscode
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>

              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="bg-danger/10 border
                  border-danger/20 rounded-xl
                  p-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !passcode}
              className="w-full bg-primary
                text-background rounded-xl py-3.5
                font-bold text-sm
                flex items-center justify-center
                gap-2 transition-opacity
                hover:opacity-90 disabled:opacity-50"
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
            text-xs text-muted">

            <ShieldCheck
              size={16}
              className="text-primary"
            />

            Private and protected

          </div>
        </div>

        <p className="text-center text-xs text-muted mt-7">
          Progress, not perfection.
        </p>

      </div>
    </div>
  );
}

export default Login;