import AppBar from "@/components/app-bar";
import PageHeader from "@/components/page-header";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="block gap-8 laptop:flex laptop:h-screen">
      <AppBar />
      <div className="w-full pb-20 pl-5 pr-5 pt-5 laptop:h-full laptop:overflow-y-scroll laptop:pl-0 laptop:pr-16 laptop:pt-10">
        <div className="mb-10 w-full">
          <PageHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
