import type { ReactElement } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

import { Dashboard } from "@/layout";
import { Private } from "./private";
import { Public } from "./public";
import SignIn from "@/pages/auth/sign-in";

const HomeRouter = lazy(() =>
  import("@/pages/dashboard/home/router").then((module) => ({
    default: module.Router,
  })),
);

const InvoicesRouter = lazy(() =>
  import("@/pages/dashboard/invoices/router").then((module) => ({
    default: module.Router,
  })),
);

export function Router(): ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center bg-gray-900/10">
          <CgSpinnerTwo className="animate-spin text-6xl" />
        </div>
      }
    >
      <Routes>
        <Route element={<Public />}>
          <Route index element={<Navigate to="/sign-in" />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>

        <Route element={<Private />}>
          <Route element={<Dashboard />}>
            <Route path="home/*" element={<HomeRouter />} />
            <Route path="invoices/*" element={<InvoicesRouter />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
