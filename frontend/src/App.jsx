import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import {
  SettingsProvider
} from "./context/SettingsContext";

import useSettings from "./hooks/useSettings";

import Today from "./pages/today/Today";
import History from "./pages/history/History";
import Progress from "./pages/progress/Progress";
import Settings from "./pages/settings/Settings";

function AppRoutes() {
  const {
    settings,
    loading,
    error,
    loadSettings
  } = useSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-sage border-t-primary rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm text-muted">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full">

          <h2 className="font-semibold text-primary text-xl">
            Unable to connect
          </h2>

          <p className="text-sm text-muted mt-2">
            {error || "Could not load your settings."}
          </p>

          <button
            onClick={loadSettings}
            className="mt-5 px-5 py-3 rounded-xl bg-primary text-white"
          >
            Try again
          </button>

        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Today />} />
          <Route path="history" element={<History />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppRoutes />
    </SettingsProvider>
  );
}

export default App;