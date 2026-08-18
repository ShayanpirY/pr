"use client";

import type { ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export function SkewCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useTransform(velocity, [-1500, 1500], [3, -3], {
    clamp: true,
  });
  const skewSpring = useSpring(skew, { stiffness: 140, damping: 18 });

  return (
    <motion.div style={{ skewY: skewSpring }} className={className}>
      {children}
    </motion.div>
  );
}