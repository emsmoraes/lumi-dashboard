import type { ReactElement } from "react";
import { Suspense, lazy, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

import { Dashboard } from "@/layout";
import { Private } from "./private";
import { Public } from "./public";
import SignIn from "@/pages/auth/sign-in";
import { authStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import SignUp from "@/pages/auth/sign-up";

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
  const navigate = useNavigate();
  const location = useLocation();
  const { logged } = authStore.getState().load();

  useEffect(() => {
    if (!logged && location.pathname !== "/sign-up") {
      navigate("/sign-in", { replace: true });
    }
  }, [logged, location.pathname, navigate]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message;

          if (status === 401 && message === "Unauthorized.") {
            sessionStorage.clear();
            navigate("/sign-in", { replace: true });
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center bg-gray-900/10">
          <CgSpinnerTwo className="animate-spin text-6xl" />
        </div>
      }
    >
      <Routes>
        {!logged && (
          <Route element={<Public />}>
            <Route index element={<Navigate to="/sign-in" />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        )}

        {logged && (
          <Route element={<Private />}>
            <Route element={<Dashboard />}>
              <Route path="home/*" element={<HomeRouter />} />
              <Route path="invoices/*" element={<InvoicesRouter />} />
            </Route>
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}
