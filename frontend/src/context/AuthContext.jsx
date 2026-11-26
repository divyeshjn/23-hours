import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";

import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState(null);

  const [sessionError, setSessionError] =
    useState(null);

  const busy = useRef(false);

  // CHECK EXISTING SESSION

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      setSessionError(null);
      setError(null);

      const data = await authService.getSession();

      setAuthenticated(
        data.authenticated === true
      );

    } catch (error) {
      setAuthenticated(false);
      setSessionError(error.message);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // HANDLE EXPIRED SESSIONS

  useEffect(() => {

    function handleUnauthorized() {
      setAuthenticated(false);

      setError(
        "Your session has expired. Please unlock again."
      );
    }

    window.addEventListener(
      "23-hours:unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "23-hours:unauthorized",
        handleUnauthorized
      );
    };

  }, []);

  // LOGIN

  async function login(passcode) {
    if (busy.current) return false;

    busy.current = true;

    setSaving(true);
    setError(null);

    try {
      const data = await authService.login(passcode);

      if (data.authenticated !== true) {
        setError("Unable to authenticate.");
        return false;
      }

      // Verify that the browser accepted
      // the authentication cookie.

      const session = await authService.getSession();

      if (session.authenticated !== true) {
        setError(
          "Session cookie was not accepted. Please check your browser settings."
        );

        return false;
      }

      setAuthenticated(true);

      return true;

    } catch (error) {
      setError(error.message);

      return false;

    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  // LOGOUT

  async function logout() {
    if (busy.current) return false;

    busy.current = true;

    setSaving(true);
    setError(null);

    try {
      await authService.logout();

      setAuthenticated(false);

      return true;

    } catch (error) {
      setError(error.message);

      return false;

    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        saving,
        error,
        sessionError,
        login,
        logout,
        checkSession,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}