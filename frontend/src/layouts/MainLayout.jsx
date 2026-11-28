import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import BottomNav from "../components/navigation/BottomNav";
import OfflineBanner from "../components/common/OfflineBanner";

function MainLayout() {
  return (
    <div className="min-h-dvh bg-background">

      <Sidebar />

      <main className="md:ml-64 min-h-dvh min-w-0">

        <div
          className="max-w-5xl mx-auto min-w-0
            px-4 sm:px-8
            pt-[calc(24px+env(safe-area-inset-top,0px))]
            pb-[calc(96px+env(safe-area-inset-bottom,0px))]
            md:pt-10 md:pb-10"
        >

          <OfflineBanner />

          <Outlet />

        </div>

      </main>

      <BottomNav />

    </div>
  );
}

export default MainLayout;