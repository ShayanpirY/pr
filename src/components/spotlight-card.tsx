"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { formatPrice } from "@/lib/format";
import type { Shoe } from "@/lib/products";

export function SpotlightCard({ shoe }: { shoe: Shoe }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, black 0%, rgba(0, 0, 0, 0.9) 20%, transparent 65%)`;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            نسخه‌ی محدود
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            زیر نور چراغ‌قوه ببینید
          </h2>
        </div>
      </div>

      <div
        ref={ref}
        onMouseMove={(event) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(event.clientX - rect.left);
          my.set(event.clientY - rect.top);
        }}
        onMouseLeave={() => {
          mx.set(-300);
          my.set(-300);
        }}
        className="relative h-[70vh] min-h-[480px] overflow-hidden rounded-[2rem] bg-zinc-950"
      >
        <div className="absolute inset-0">
          <Image
            src={shoe.image}
            alt={shoe.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-contain p-6 opacity-40 grayscale"
          />
        </div>

        <motion.div
          className="absolute inset-0"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <Image
            src={shoe.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-contain p-6"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5))]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        <p className="absolute top-6 right-6 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
          نشانگر را حرکت دهید
        </p>

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-8">
          <div className="flex max-w-xl flex-col gap-3">
            <Badge className="w-fit rounded-full bg-white/10 text-white backdrop-blur">
              {shoe.category}
            </Badge>
            <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              {shoe.name}
            </h3>
            <p className="text-sm leading-6 text-zinc-300">{shoe.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white">
              {formatPrice(shoe.price)}
            </span>
            <Magnetic strength={0.25}>
              <Button size="lg" className="rounded-full">
                رزرو نسخه‌ی محدود
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}