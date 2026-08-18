"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";

import { faNum } from "@/lib/format";
import { SHOES } from "@/lib/products";

export function HorizontalScroll() {
  const x = useMotionValue("0%");
  const marqueeControls = useRef<{
    play: () => void;
    pause: () => void;
    stop: () => void;
  } | null>(null);

  const shoes = SHOES;
  const count = shoes.length;
  const duplicatedShoes = [...shoes, ...shoes];

  useEffect(() => {
    marqueeControls.current = animate(x, ["0%", "-50%"], {
      repeat: Infinity,
      ease: "linear",
      duration: 30,
    });
    return () => marqueeControls.current?.stop();
  }, [x]);

  return (
    <section className="bg-transparent py-24">
      <div className="mb-10 px-6 sm:px-8 lg:px-16">
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">
          روایت برند
        </p>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
          سه نماد، یک سبک
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden bg-transparent">
        <motion.div
          style={{ x }}
          onMouseEnter={() => marqueeControls.current?.pause()}
          onMouseLeave={() => marqueeControls.current?.play()}
          className="flex w-max flex-nowrap shrink-0 gap-6 px-3"
        >
          {duplicatedShoes.map((shoe, index) => (
            <motion.div
              key={`${shoe.id}-${index}`}
              className="relative flex h-[62vh] w-[300px] shrink-0 flex-none flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md md:w-[350px]"
            >
              <span className="pointer-events-none absolute -bottom-4 left-4 z-0 font-bold text-[12rem] leading-none text-white/5 select-none">
                {faNum((index % count) + 1)}
              </span>

              <div className="relative z-10 flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={shoe.image}
                    alt={shoe.name}
                    fill
                    sizes="(min-width: 768px) 350px, 300px"
                    className="object-contain p-6"
                  />
                </motion.div>
              </div>

              <div className="relative z-10 mt-auto flex w-full flex-col gap-1 border-t border-white/10 p-6 text-right">
                <p className="text-sm text-zinc-400">{shoe.category}</p>
                <h3 className="font-heading text-2xl font-semibold text-white">
                  {shoe.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
