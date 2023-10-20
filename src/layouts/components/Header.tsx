import HeaderSearch from "./HeaderSearch";
import { MdTour, MdNotificationsNone } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import DrawerToggle from "./DrawerToggle";
import ProfileBadge from "./ProfileBadge";
export default function Header() {
  return (
    <header className="w-full bg-white bg-opacity-20 flex rounded-lg shadow-sm items-center sticky top-0 bg-clip-padding backdrop-filter backdrop-blur z-50">
      <div className="flex-1">
        <HeaderSearch />
      </div>
      <div className="px-3 flex space-x-1">
        <button className="p-2 hover:bg-slate-200 transition-all rounded-lg active:bg-gray-300">
          <MdTour className="text-2xl text-orange-300" />
        </button>
        <button className="p-2 hover:bg-slate-200 transition-all rounded-lg active:bg-gray-300">
          <MdNotificationsNone className="text-2xl  text-primary" />
        </button>
        <ProfileBadge />
        <DrawerToggle isDark={true} />
      </div>
    </header>
  );
}
