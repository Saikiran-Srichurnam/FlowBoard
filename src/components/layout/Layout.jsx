import React from "react";
import { LayoutPage, DashboardPreview, Features } from "../../pages";

function Layout() {
  return (
    <div>
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-6 lg:px-20 relative py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <LayoutPage />

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <DashboardPreview />
          </div>

        </div>
      </section>
      {/* Features */}
      <Features />
    </div>
  );
}

export default Layout;