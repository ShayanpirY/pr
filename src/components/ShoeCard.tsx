"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Eye, Heart, ShoppingBag, Star, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useCart } from "@/contexts/cart-context";
import { useFlyToCart } from "@/contexts/fly-to-cart";
import { faNum, formatPrice } from "@/lib/format";
import { SHOE_SIZES, type Shoe } from "@/lib/products";
import { cn } from "@/lib/utils";

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -8 },
};

const overlayVariants = {
  rest: { opacity: 0, y: 16 },
  hover: { opacity: 1, y: 0 },
};

const priceVariants = {
  rest: { opacity: 0, scale: 0.4, y: 14 },
  hover: { opacity: 1, scale: 1, y: 0 },
};

const heartVariants = {
  liked: { scale: [0.4, 1.15, 1] },
  unliked: { scale: 1 },
};

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export function ShoeCard({ shoe }: { shoe: Shoe }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState(0);
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const { addItem } = useCart();
  const { flyToCart } = useFlyToCart();
  const imageRef = useRef<HTMLDivElement>(null);

  const discount = Math.round((1 - shoe.price / shoe.originalPrice) * 100);
  const currentImage = shoe.gallery[activeColor] ?? shoe.image;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const px = useTransform(sx, [0, 1], [0, 100]);
  const py = useTransform(sy, [0, 1], [0, 100]);
  const spotlight = useMotionTemplate`radial-gradient(circle 200px at ${px}% ${py}%, rgba(255, 255, 255, 0.55), transparent 70%)`;
  const imgX = useTransform(sx, [0, 1], [14, -14]);
  const imgY = useTransform(sy, [0, 1], [10, -10]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const handleAdd = (size: number) => {
    addItem({
      id: shoe.id,
      name: shoe.name,
      category: shoe.category,
      image: currentImage,
      price: shoe.price,
      size,
      color: shoe.colors[activeColor].name,
    });
    if (imageRef.current) flyToCart(currentImage, imageRef.current);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative h-full"
    >
      <div className="pointer-events-none absolute -inset-1 rounded-[1.6rem] bg-gradient-to-tr from-primary/35 via-amber-400/35 to-primary/35 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-0 shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:border-white/30 group-hover:shadow-xl group-hover:shadow-black/40 [transform-style:preserve-3d]">
        <Link
          href={`/product/${shoe.id}`}
          aria-label={`مشاهده ${shoe.name}`}
          className="absolute inset-0 z-[1] rounded-3xl"
        />

        <div
          ref={imageRef}
          className="relative aspect-square [transform-style:preserve-3d]"
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-3xl bg-zinc-900/40"
            style={{ transform: "translateZ(70px)" }}
          >
            <motion.div
              key={`bg-${activeColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(80% 80% at 50% 45%, ${shoe.colors[activeColor].hex}30, transparent 70%)`,
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ x: imgX, y: imgY }}
              className="relative h-full w-full"
            >
              <motion.div
                key={activeColor}
                layoutId={`quickview-${shoe.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: [0, -10, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage}
                  alt={shoe.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />

            <motion.div
              variants={overlayVariants}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="pointer-events-none absolute inset-x-4 bottom-4 z-[2]"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={spring}
                className="pointer-events-auto"
              >
                <Button
                  size="sm"
                  className="w-full rounded-full bg-white text-zinc-900 shadow-lg hover:bg-white/90 dark:bg-zinc-100 dark:text-zinc-900"
                  onClick={() => handleAdd(selectedSize ?? SHOE_SIZES[0])}
                >
                  {justAdded ? (
                    <Check className="size-3.5" />
                  ) : (
                    <ShoppingBag className="size-3.5" />
                  )}
                  {justAdded ? "افزوده شد" : "افزودن سریع"}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0 z-[3] opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
          </div>

          <div className="absolute top-3 left-3 z-[2] flex flex-col items-start gap-2">
            {shoe.badge && (
              <Badge className="rounded-full bg-primary/85 text-primary-foreground backdrop-blur">
                {shoe.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="rounded-full bg-red-600 text-white shadow-md">
                {faNum(discount)}٪
              </Badge>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            onClick={() => setLiked((value) => !value)}
            className="absolute top-3 right-3 z-[2] size-9 rounded-full border-0 bg-zinc-950/60 text-zinc-100 shadow-sm backdrop-blur hover:bg-zinc-950"
          >
            <motion.span
              key={liked ? "liked" : "unliked"}
              animate={liked ? "liked" : "unliked"}
              variants={heartVariants}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex"
            >
              <Heart
                className={cn("size-4", liked && "fill-red-500 text-red-500")}
              />
            </motion.span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="پیش‌نمایش سریع"
            onClick={() => setQuickView(true)}
            className="absolute top-3 right-14 z-[2] size-9 rounded-full border-0 bg-zinc-950/60 text-zinc-100 shadow-sm backdrop-blur hover:bg-zinc-950"
          >
            <Eye className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {shoe.category}
            </p>
            <h3 className="font-heading text-lg leading-tight font-semibold text-foreground">
              {shoe.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="flex items-center gap-0.5 font-medium text-amber-500">
                <Star className="size-3.5 fill-current" />
                {faNum(shoe.rating)}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">سولاستایل</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {shoe.colors.map((color, index) => (
              <motion.button
                key={color.name}
                type="button"
                whileTap={{ scale: 0.85 }}
                transition={spring}
                aria-label={color.name}
                aria-pressed={activeColor === index}
                title={color.name}
                onClick={() => setActiveColor(index)}
                className={cn(
                  "relative z-[2] size-5 rounded-full border transition-transform hover:scale-110",
                  activeColor === index
                    ? "ring-2 ring-foreground/50 ring-offset-2 ring-offset-zinc-950"
                    : "border-black/10"
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              انتخاب سایز
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SHOE_SIZES.map((size) => (
                <motion.button
                  key={size}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "relative z-[2] h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition-colors",
                    selectedSize === size
                      ? "border-foreground text-background"
                      : "border-white/10 bg-white/5 text-foreground hover:border-foreground/50"
                  )}
                >
                  {selectedSize === size && (
                    <motion.span
                      layoutId={`activeSize-${shoe.id}`}
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-[1]">{faNum(size)}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="flex flex-col">
              {discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(shoe.originalPrice)}
                </span>
              )}
              <motion.span
                variants={priceVariants}
                transition={spring}
                className="text-xl font-bold text-foreground"
              >
                {formatPrice(shoe.price)}
              </motion.span>
            </div>

            <Magnetic className="relative z-[2]">
              <motion.div whileTap={{ scale: 0.95 }} transition={spring}>
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => handleAdd(selectedSize ?? SHOE_SIZES[0])}
                >
                  {justAdded ? <Check /> : <ShoppingBag />}
                  {justAdded ? "افزوده شد" : "افزودن به سبد"}
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.article>

      <AnimatePresence>
        {quickView && (
          <>
            <motion.div
              key="qv-backdrop"
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickView(false)}
            />
            <div
              key="qv-modal"
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl"
              >
                <motion.div
                  layoutId={`quickview-${shoe.id}`}
                  className="relative aspect-square overflow-hidden bg-zinc-900/40"
                >
                  <Image
                    src={currentImage}
                    alt={shoe.name}
                    fill
                    sizes="448px"
                    className="object-contain"
                  />
                </motion.div>
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        {shoe.category}
                      </p>
                      <h3 className="font-heading text-xl leading-tight font-semibold text-foreground">
                        {shoe.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-sm">
                        <Star className="size-3.5 fill-current text-amber-500" />
                        <span className="font-medium text-amber-500">
                          {faNum(shoe.rating)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="بستن"
                      onClick={() => setQuickView(false)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {shoe.colors.map((color, index) => (
                      <button
                        key={color.name}
                        type="button"
                        aria-label={color.name}
                        onClick={() => setActiveColor(index)}
                        className={cn(
                          "size-5 rounded-full border transition-transform hover:scale-110",
                          activeColor === index
                            ? "ring-2 ring-foreground/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900"
                            : "border-black/10"
                        )}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      انتخاب سایز
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SHOE_SIZES.map((size) => (
                        <motion.button
                          key={size}
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          transition={spring}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition-colors",
                            selectedSize === size
                              ? "border-foreground bg-foreground text-background"
                              : "border-white/10 bg-white/5 text-foreground hover:border-foreground/50"
                          )}
                        >
                          {faNum(size)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      {discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(shoe.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl font-bold text-foreground">
                        {formatPrice(shoe.price)}
                      </span>
                    </div>
                    <motion.div whileTap={{ scale: 0.95 }} transition={spring}>
                      <Button
                        size="lg"
                        className="rounded-full"
                        onClick={() => {
                          handleAdd(selectedSize ?? SHOE_SIZES[0]);
                          setQuickView(false);
                        }}
                      >
                        <ShoppingBag />
                        {justAdded ? "افزوده شد" : "افزودن به سبد"}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
