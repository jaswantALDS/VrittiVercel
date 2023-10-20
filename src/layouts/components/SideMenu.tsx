import { Menu } from "@/constants/menu";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu() {
  return (
    <div className="flex-1 text-sm font-medium overflow-y-scroll py-2 scrollbar-hide">
      <div className="">
        {Menu.sideMenu.map((menuGroup, index: number) => (
          <SideMenuItem
            key={index}
            index={index}
            length={Menu.sideMenu.length}
            menuGroup={menuGroup}
          />
        ))}
      </div>
    </div>
  );
}
