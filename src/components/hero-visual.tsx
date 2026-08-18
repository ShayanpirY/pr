"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck } from "lucide-react";

const TICKER = "سولاستایل • قدم در استایل • ";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-md"
    >
      <motion.div
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              aria-hidden
              className="font-heading text-[15vw] leading-none font-black text-white/5"
            >
              {TICKER.repeat(3)}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yImage }} className="relative">
        <motion.div
          initial={{ rotate: -50, y: -50, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 6,
            mass: 2.5,
            duration: 2,
          }}
          style={{ transformOrigin: "top center" }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="z-20 size-3 rounded-full bg-orange-500 shadow-lg" />
          <div className="h-[120px] w-[2px] bg-gradient-to-b from-orange-500 to-zinc-600" />
          <div className="relative w-full">
            <Image
              src="/shoes/hero.jpg"
              alt="کتانی برجسته"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full scale-[1.06] object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute right-0 bottom-2 left-0 mx-auto h-5 w-2/3 rounded-[50%] bg-black/20 blur-md"
        animate={{ scaleX: [1, 0.78, 1], opacity: [0.55, 0.25, 0.55] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg backdrop-blur-md">
        <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Truck className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            ارسال رایگان فردا
          </p>
          <p className="text-xs text-muted-foreground">
            برای سفارش‌های بالای ۷٬۵۰۰٬۰۰۰ تومان
          </p>
        </div>
      </div>
    </div>
  );
}