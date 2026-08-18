"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
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

const heartVariants = {
  liked: { scale: [0.4, 1.15, 1] },
  unliked: { scale: 1 },
};

export function ShoeCard({ shoe }: { shoe: Shoe }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState(0);
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const discount = Math.round((1 - shoe.price / shoe.originalPrice) * 100);
  const currentImage = shoe.gallery[activeColor] ?? shoe.image;

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
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative"
    >
      <div className="pointer-events-none absolute -inset-1 rounded-[1.6rem] bg-gradient-to-tr from-primary/35 via-amber-400/35 to-primary/35 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <Card className="relative h-full rounded-3xl border-0 bg-white p-0 shadow-sm ring-foreground/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/10 dark:bg-zinc-900">
        <Link
          href={`/product/${shoe.id}`}
          aria-label={`مشاهده ${shoe.name}`}
          className="absolute inset-0 z-[1] rounded-3xl"
        />
        <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative h-full w-full"
          >
            <motion.div
              key={activeColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
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
            className="absolute top-3 right-3 z-[2] size-9 rounded-full border-0 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:bg-zinc-950"
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

          <motion.div
            variants={overlayVariants}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none absolute inset-x-4 bottom-4 z-[2]"
          >
            <motion.div whileTap={{ scale: 0.95 }} className="pointer-events-auto">
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
        </div>

        <CardContent className="flex flex-col gap-4 p-4">
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
                aria-label={color.name}
                aria-pressed={activeColor === index}
                title={color.name}
                onClick={() => setActiveColor(index)}
                className={cn(
                  "relative z-[2] size-5 rounded-full border transition-transform hover:scale-110",
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
                  whileTap={{ scale: 0.92 }}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "relative z-[2] h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition-colors",
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:border-foreground/50"
                  )}
                >
                  {faNum(size)}
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
              <span className="text-xl font-bold text-foreground">
                {formatPrice(shoe.price)}
              </span>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="relative z-[2]">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => handleAdd(selectedSize ?? SHOE_SIZES[0])}
              >
                {justAdded ? <Check /> : <ShoppingBag />}
                {justAdded ? "افزوده شد" : "افزودن به سبد"}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}