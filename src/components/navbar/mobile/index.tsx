import { Dispatch } from "react";
import { Routes } from "../routes";
import LinkButton from "./link-button";

interface MobileProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function Mobile({ setOpen }: MobileProps) {
  return (
    <div className="flex h-full flex-col justify-between px-3 pb-7">
      <div className="flex flex-col gap-4">
        {Routes.map((route) => (
          <LinkButton setOpen={setOpen} key={route.pathname} route={route} />
        ))}
      </div>
    </div>
  );
}
