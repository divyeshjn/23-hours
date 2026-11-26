import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {
  return (
    <div className="min-h-dvh bg-background">

      <Sidebar />

      <main className="md:ml-64 min-h-dvh">
        <div className="max-w-5xl mx-auto
          px-4 sm:px-8 py-6 sm:py-10
          pb-28 md:pb-10">

          <Outlet />

        </div>
      </main>

      <BottomNav />

    </div>
  );
}

export default MainLayout;
