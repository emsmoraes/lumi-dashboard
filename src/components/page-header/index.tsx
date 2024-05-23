import { useLocation } from "react-router-dom";
import { Routes } from "../navbar/routes";

const PageHeader = () => {
  const location = useLocation().pathname.split("/")[1];

  return (
    location && (
      <div className="flex w-full flex-wrap items-center justify-start gap-2 laptop:gap-0">
        <h1 className="text-3xl font-semibold text-black">
          {Routes.filter((route) => route.pathname === `${location}`)[0].label}
        </h1>
      </div>
    )
  );
};

export default PageHeader;
