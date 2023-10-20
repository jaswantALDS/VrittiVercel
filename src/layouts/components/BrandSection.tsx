"use client";
import { useContext } from "react";
import DrawerToggle from "./DrawerToggle";
import { LayoutContext } from "../context";

export default function BrandSection() {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  return (
    <div className="flex w-full justify-between items-center">
      {!isDrawerCollapsed && (
        <div className="text-xl font-bold italic text-orange-400 tracking-tight">
          Flicker
        </div>
      )}

      <DrawerToggle />
    </div>
  );
}
