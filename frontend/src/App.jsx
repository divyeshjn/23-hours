import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  SettingsProvider
} from "./context/SettingsContext";

import useAuth from "./hooks/useAuth";
import useSettings from "./hooks/useSettings";

import LoadingState from "./components/common/LoadingState";
import ErrorState from "./components/common/ErrorState";

import Login from "./pages/auth/Login";
import Today from "./pages/today/Today";
import History from "./pages/history/History";
import Progress from "./pages/progress/Progress";
import Settings from "./pages/settings/Settings";
import WeeklyCheckIn from "./pages/weekly-checkin/WeeklyCheckIn";
// FULL SCREEN LOADING

function FullScreenLoading({ message }) {
  return (
    <div className="min-h-dvh bg-[#FAF8F5]
      flex items-center justify-center">

      <LoadingState message={message} />

    </div>
  );
}

// FULL SCREEN ERROR

function FullScreenError({ message, onRetry }) {
  return (
    <div className="min-h-dvh bg-[#FAF8F5]
      flex items-center justify-center p-5">

      <div className="w-full max-w-sm">

        <ErrorState
          message={message}
          onRetry={onRetry}
        />

      </div>

    </div>
  );
}

// PROTECTED DASHBOARD ROUTES

function DashboardRoutes() {

  const {
    settings,
    loading,
    error,
    loadSettings
  } = useSettings();

  if (loading) {
    return (
      <FullScreenLoading
        message="Loading your dashboard..."
      />
    );
  }

  if (!settings) {
    return (
      <FullScreenError
        message={
          error || "Could not load your settings."
        }
        onRetry={loadSettings}
      />
    );
  }

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route index element={<Today />} />
        <Route path="history" element={<History />} />
        <Route path="progress" element={<Progress />} />
        <Route path="weekly-checkin" element={<WeeklyCheckIn />} />
        <Route path="settings" element={<Settings />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Route>

    </Routes>
  );
}

// AUTHENTICATION GATE

function AuthGate() {

  const {
    authenticated,
    loading,
    sessionError,
    checkSession
  } = useAuth();

  if (loading) {
    return (
      <FullScreenLoading
        message="Checking your session..."
      />
    );
  }

  if (sessionError) {
    return (
      <FullScreenError
        message={sessionError}
        onRetry={checkSession}
      />
    );
  }

  if (!authenticated) {
    return <Login />;
  }

  return (
    <SettingsProvider>
      <DashboardRoutes />
    </SettingsProvider>
  );
}

// ROOT APPLICATION

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <AuthGate />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;