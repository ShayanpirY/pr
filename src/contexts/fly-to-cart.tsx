"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Rect = { x: number; y: number; w: number; h: number };

type Flight = {
  id: number;
  image: string;
  from: Rect;
  to: Rect;
};

type FlyToCartContextValue = {
  flyToCart: (image: string, fromEl: HTMLElement) => void;
};

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const [flight, setFlight] = useState<Flight | null>(null);
  const idRef = useRef(0);

  const flyToCart = (image: string, fromEl: HTMLElement) => {
    const target = document.querySelector<HTMLElement>("[data-cart-trigger]");
    if (!target) return;
    const from = fromEl.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const id = ++idRef.current;
    setFlight({
      id,
      image,
      from: { x: from.left, y: from.top, w: from.width, h: from.height },
      to: { x: to.left + to.width / 2, y: to.top + to.height / 2, w: 0, h: 0 },
    });
  };

  return (
    <FlyToCartContext.Provider value={{ flyToCart }}>
      {children}
      <AnimatePresence>
        {flight && (
          <motion.div
            key={flight.id}
            initial={{ left: flight.from.x, top: flight.from.y, scale: 1, opacity: 1 }}
            animate={{
              left: flight.to.x,
              top: flight.to.y,
              scale: 0.12,
              opacity: 0.65,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onAnimationComplete={() => setFlight(null)}
            className="pointer-events-none fixed z-[9999] overflow-hidden rounded-full"
            style={{
              width: flight.from.w,
              height: flight.from.h,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <Image
              src={flight.image}
              alt=""
              fill
              sizes="300px"
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}
