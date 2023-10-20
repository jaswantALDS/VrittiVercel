"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function CardPrototype({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      // key={pathName}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1, opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 0.12, 0.11, 0.11],
      }}
      className={`bg-white px-4 py-6 rounded-2xl shadow-md w-full h-full overflow-x-hidden hover:scale-[101%]  transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}
