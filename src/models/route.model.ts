import { IconType } from "react-icons/lib";

export type RoutePath = "home" | "invoices";

export interface Route {
  pathname: RoutePath;
  icon: IconType;
  label: string;
}
