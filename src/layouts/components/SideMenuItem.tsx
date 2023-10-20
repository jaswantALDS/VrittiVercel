"use client";
import { TMenu, TMenuGroup } from "@/constants/menu";
import Link from "next/link";
import { useContext } from "react";
import { LayoutContext } from "../context";
import { CgMenuLeftAlt } from "react-icons/cg";
import { signOut } from "next-auth/react";

type TSideMenuItem = {
  menuGroup: TMenuGroup;
  index: number;
  length: number;
};

export default function SideMenuItem({
  menuGroup,
  index,
  length,
}: TSideMenuItem) {
  const { isDrawerCollapsed } = useContext(LayoutContext);

  const renderMenuItems = (menu: TMenu, index: number) => {
    const Icon = menu.icon;
    return (
      <li
        key={index}
        className="hover:bg-gray-900 transition-all rounded-md cursor-pointer line-clamp-1 mb-2 font-medium text-sm"
        title={menu.menuItem}
      >
        <Link
          href={menu.href}
          className={`flex space-x-1 items-center w-full px-2 py-2 ${
            isDrawerCollapsed && "justify-center"
          }`}
        >
          <Icon className={`${isDrawerCollapsed ? "text-xl " : "text-base"}`} />
          {!isDrawerCollapsed && <p>{menu.menuItem}</p>}
        </Link>
      </li>
    );
  };

  return (
    <div className="mt-4">
      {menuGroup.showGroupTitle && (
        <span className="text-xs text-gray-300 tracking-wider font-bold pl-1 line-clamp-1">
          {menuGroup.title}
        </span>
      )}

      <ul
        className={`mb-2 ${index < length - 1 && "border-b border-b-gray-600"}`}
      >
        {menuGroup.menu.map((menu, index) => renderMenuItems(menu, index))}
      </ul>
      <li className="hover:bg-gray-900 transition-all rounded-md cursor-pointer line-clamp-1 mb-2 font-medium text-sm">
        <div
          className={`flex space-x-1 items-center w-full px-2 py-2 ${
            isDrawerCollapsed && "justify-center"
          }`}
          onClick={() => {
            signOut();
          }}
        >
          <CgMenuLeftAlt
            className={`${isDrawerCollapsed ? "text-xl " : "text-base"}`}
          />
          {!isDrawerCollapsed && <p>Logout</p>}
        </div>
      </li>
    </div>
  );
}
