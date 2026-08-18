"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const revealVariants = (index: number): Variants => ({
  hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
  show: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: index * 0.08,
    },
  },
});

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={revealVariants(index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}
