"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";

export type Shoe = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  badge?: string;
};

export const SHOE_SIZES = [40, 41, 42, 43, 44] as const;

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

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
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const discount = Math.round((1 - shoe.price / shoe.originalPrice) * 100);

  const handleAdd = (size: number) => {
    addItem({
      id: shoe.id,
      name: shoe.name,
      category: shoe.category,
      image: shoe.image,
      price: shoe.price,
      size,
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
      className="group"
    >
      <Card className="h-full rounded-3xl border-0 bg-white p-0 shadow-sm ring-foreground/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/10 dark:bg-zinc-900">
        <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={shoe.image}
            alt={shoe.name}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/15 to-transparent" />

          {shoe.badge && (
            <Badge className="absolute left-3 top-3 bg-primary/85 text-primary-foreground backdrop-blur">
              {shoe.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute bottom-3 left-3 backdrop-blur"
            >
              -{discount}%
            </Badge>
          )}

          <Button
            variant="outline"
            size="icon"
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => setLiked((value) => !value)}
            className="absolute right-3 top-3 size-9 rounded-full border-0 bg-white/80 text-zinc-900 shadow-sm backdrop-blur hover:bg-white dark:bg-zinc-950/60 dark:text-zinc-100 dark:hover:bg-zinc-950"
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
            className="pointer-events-none absolute inset-x-4 bottom-4"
          >
            <Button
              size="sm"
              className="pointer-events-auto w-full rounded-full bg-white text-zinc-900 shadow-lg hover:bg-white/90 dark:bg-zinc-100 dark:text-zinc-900"
              onClick={() => handleAdd(selectedSize ?? SHOE_SIZES[0])}
            >
              {justAdded ? (
                <Check className="size-3.5" />
              ) : (
                <ShoppingBag className="size-3.5" />
              )}
              {justAdded ? "Added" : "Quick add"}
            </Button>
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
                {shoe.rating}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">SoleStyle</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Select size
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
                    "h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition-colors",
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:border-foreground/50"
                  )}
                >
                  {size}
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

            <Button
              size="lg"
              className="rounded-full"
              onClick={() => handleAdd(selectedSize ?? SHOE_SIZES[0])}
            >
              {justAdded ? (
                <Check />
              ) : (
                <ShoppingBag />
              )}
              {justAdded ? "Added" : "Add to cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}