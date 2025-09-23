import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const AppLayout = () => {
  return (
    <div className=" flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable content area */}
      <div className="flex h-[100vh] overflow-hidden">
        {/* Sidebar (fixed height as well) */}
        <SideBar />

        {/* Main content scrollable area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
