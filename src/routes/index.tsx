import type { ReactElement } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Dashboard } from "@/layout";

const HomeRouter = lazy(() =>
  import("@/pages/dashboard/home/router").then((module) => ({
    default: module.Router,
  })),
);

export function Router(): ReactElement {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route element={<Dashboard />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home/*" element={<HomeRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
