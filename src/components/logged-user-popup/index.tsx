import { PopoverContent } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

interface LoggedUserPopupProps {
  logout: () => void;
}

function LoggedUserPopup({ logout }: LoggedUserPopupProps) {
  return (
    <PopoverContent className="flex w-[150px] flex-col gap-2">
      <Link to="/" className="w-full">
        <Button className="h-[35px] w-full gap-3 bg-gray-200 text-sm text-zinc-900 hover:bg-gray-100/70">
          <HiOutlineUserCircle size={22} /> Perfil
        </Button>
      </Link>

      <Link to="/" className="w-full">
        <Button
          onClick={logout}
          className="h-[35px] w-full gap-3 text-sm font-normal"
        >
          <IoLogOutOutline size={22} /> Sair
        </Button>
      </Link>
    </PopoverContent>
  );
}

export default LoggedUserPopup;
