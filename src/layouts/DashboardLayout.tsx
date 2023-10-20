"use client";
import { ReactNode, useContext } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LayoutContextProvider, { LayoutContext } from "./context";
import DrawerToggle from "./components/DrawerToggle";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Main({ children }: { children: ReactNode }) {
  const { isDrawerCollapsed } = useContext(LayoutContext);
  const pathName = usePathname();

  return (
    <>
      {isDrawerCollapsed && (
        <div className="block md:hidden fixed top-0 left-0">
          <DrawerToggle />
        </div>
      )}
      <div className="flex w-full p-2 h-screen justify-between overflow-hidden">
        <div
          className={`${
            isDrawerCollapsed
              ? "opacity-0 w-[0%] md:opacity-100 md:w-[4%]"
              : "opacity-1 w-full md:w-[15%]"
          } transition-all`}
        >
          <Sidebar />
        </div>
        <main
          className={`${
            isDrawerCollapsed
              ? "w-full  md:w[95%] md:px-2"
              : "opacity-10 md:opacity-100 w-0 md:w-[84%] md:px-0 "
          } transition-all px-4 md:py-1 overflow-y-scroll scrollbar-hide relative`}
        >
          <Header />
          <AnimatePresence mode="wait" initial={true}>
            <motion.div className="relative">
              <motion.div
                key={pathName}
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutContextProvider>
      <Main>{children}</Main>
    </LayoutContextProvider>
  );
}
