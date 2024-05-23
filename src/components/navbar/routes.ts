import type { Route } from "@/models";
import { BiSolidDashboard } from "react-icons/bi";
import { HiMiniCurrencyDollar } from "react-icons/hi2";

export const Routes: Route[] = [
  {
    icon: BiSolidDashboard,
    pathname: "home",
    label: "Resumo",
  },
  {
    icon: HiMiniCurrencyDollar,
    pathname: "invoices",
    label: "Faturas",
  },
];
