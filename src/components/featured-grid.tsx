"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ShoeCard } from "@/components/ShoeCard";
import { SkewCard } from "@/components/skew-card";
import type { Shoe } from "@/lib/products";
import { cn } from "@/lib/utils";

const FILTERS = ["همه", "دویدن", "لایف‌استایل", "استریت‌ور"] as const;

type Filter = (typeof FILTERS)[number];

export function FeaturedGrid({ shoes }: { shoes: Shoe[] }) {
  const [active, setActive] = useState<Filter>("همه");

  const filtered =
    active === "همه" ? shoes : shoes.filter((shoe) => shoe.category === active);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            در حال ترند
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            کتانی‌های منتخب
          </h2>
        </div>
        <div className="flex gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === filter
                  ? "border-foreground text-background"
                  : "border-white/10 bg-white/5 text-muted-foreground backdrop-blur-md hover:text-foreground"
              )}
            >
              {active === filter && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-[1]">{filter}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((shoe) => (
            <motion.div
              key={shoe.id}
              layout
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)", scale: 1.2 }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="h-full"
            >
              <SkewCard className="h-full">
                <ShoeCard shoe={shoe} />
              </SkewCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}