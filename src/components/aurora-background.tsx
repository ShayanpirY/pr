"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -top-40 -right-40 size-[42rem] rounded-full bg-purple-900/50 blur-3xl opacity-30"
        animate={{ x: [0, 120, -60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-48 size-[46rem] rounded-full bg-blue-950/50 blur-3xl opacity-30"
        animate={{ x: [0, -100, 60, 0], y: [0, -70, 50, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 right-1/4 size-[44rem] rounded-full bg-orange-500/30 blur-3xl opacity-30"
        animate={{ x: [0, 90, -100, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}