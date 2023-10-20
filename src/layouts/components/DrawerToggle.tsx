"use client";
import { useContext } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { LayoutContext } from "../context";

export default function DrawerToggle({ isDark = false }) {
  const { toggleDrawer, isDrawerCollapsed } = useContext(LayoutContext);
  return (
    <button
      className={`flex items-center justify-center transition-all py-2 rounded-lg ${
        isDark
          ? "hover:bg-slate-200 active:bg-gray-300"
          : "hover:bg-gray-800 active:bg-gray-700"
      }`}
      onClick={toggleDrawer}
    >
      <CgMenuLeftAlt
        className={`text-2xl ${isDark ? "text-primary" : "text-slate-200"} `}
      />
    </button>
  );
}
