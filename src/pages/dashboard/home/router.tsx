import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./index";

export function Router(): ReactElement {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}
