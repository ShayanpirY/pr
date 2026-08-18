"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { faNum, formatPrice } from "@/lib/format";
import { SHOE_SIZES, type Shoe } from "@/lib/products";
import { cn } from "@/lib/utils";

type Tab = "overview" | "specs" | "shipping";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "بررسی" },
  { id: "specs", label: "مشخصات فنی" },
  { id: "shipping", label: "ارسال" },
];

export function ProductView({ product }: { product: Shoe }) {
  const [activeColor, setActiveColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.gallery[activeColor],
      price: product.price,
      size: selectedSize ?? SHOE_SIZES[0],
      color: product.colors[activeColor].name,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav
        aria-label="مسیر راهنما"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          خانه
        </Link>
        <ChevronLeft className="size-4" />
        <span className="transition-colors hover:text-foreground">
          {product.category}
        </span>
        <ChevronLeft className="size-4" />
        <span className="truncate font-medium text-foreground">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeColor}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src={product.gallery[activeColor]}
                  alt={`${product.name} در رنگ ${product.colors[activeColor].name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-3">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`مشاهده تصویر ${faNum(index + 1)}`}
                onClick={() => setActiveColor(index)}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 ring-2 transition-all dark:bg-zinc-900",
                  activeColor === index
                    ? "ring-foreground"
                    : "ring-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {product.category}
              </Badge>
              {product.badge && (
                <Badge className="rounded-full">{product.badge}</Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {faNum(discount)}٪ تخفیف
                </Badge>
              )}
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 font-medium text-amber-500">
                <Star className="size-4 fill-current" />
                {faNum(product.rating)}
              </span>
              <span className="text-muted-foreground">
                · {faNum(Math.round(product.rating * 21))} نظر
              </span>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="pb-1 text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">رنگ</p>
              <p className="text-sm text-muted-foreground">
                {product.colors[activeColor].name}
              </p>
            </div>
            <div className="mt-3 flex gap-2.5">
              {product.colors.map((color, index) => (
                <motion.button
                  key={color.name}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  aria-label={`انتخاب ${color.name}`}
                  aria-pressed={activeColor === index}
                  onClick={() => setActiveColor(index)}
                  className={cn(
                    "size-9 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                    activeColor === index
                      ? "ring-foreground"
                      : "ring-transparent hover:ring-border"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                انتخاب سایز
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedSize
                  ? `سایز ${faNum(selectedSize)}`
                  : "سایزهای اروپایی"}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SHOE_SIZES.map((size) => (
                <motion.button
                  key={size}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "h-10 min-w-10 rounded-full border px-3 text-sm font-medium transition-colors",
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

          <div className="flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                size="lg"
                className="w-full rounded-full"
                onClick={handleAdd}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {justAdded ? (
                    <motion.span
                      key="added"
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Check />
                      به سبد اضافه شد
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag />
                      افزودن به سبد
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                aria-label="افزودن به علاقه‌مندی‌ها"
                className="size-11 rounded-full"
                onClick={() => setLiked((value) => !value)}
              >
                <Heart
                  className={cn("size-4", liked && "fill-red-500 text-red-500")}
                />
              </Button>
            </motion.div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-3">
            {[
              { icon: Truck, label: "ارسال رایگان", hint: "بالای ۷٬۵۰۰٬۰۰۰ تومان" },
              { icon: RotateCcw, label: "بازگشت آسان", hint: "۳۰ روز" },
              { icon: ShieldCheck, label: "پرداخت امن", hint: "SSL" },
            ].map(({ icon: Icon, label, hint }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <Icon className="size-4" />
                </span>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-muted-foreground">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-1 border-b border-border">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "relative -mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                tab === id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="py-6"
          >
            {tab === "overview" && (
              <div className="max-w-2xl space-y-4 text-sm leading-7 text-muted-foreground">
                <p>{product.description}</p>
                <p>
                  این {product.category} محبوب با امتیاز {faNum(product.rating)} از ۵
                  از سوی مشتریان، با متریال ممتاز برای راحتی ماندگار ساخته
                  شده است. سایزبندی دقیق است — همان سایز اروپایی همیشگی‌تان را
                  سفارش دهید.
                </p>
              </div>
            )}

            {tab === "specs" && (
              <div className="max-w-2xl overflow-hidden rounded-2xl border border-border">
                {product.specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={cn(
                      "flex items-center justify-between gap-4 px-4 py-3 text-sm",
                      index % 2 === 0 && "bg-muted/40"
                    )}
                  >
                    <span className="font-medium text-foreground">
                      {spec.label}
                    </span>
                    <span className="text-left text-muted-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === "shipping" && (
              <div className="max-w-2xl space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  از ارسال استاندارد رایگان برای سفارش‌های بالای ۷٬۵۰۰٬۰۰۰
                  تومان لذت ببرید. تحویل معمولاً ۲ تا ۴ روز کاری طول می‌کشد.
                </p>
                <p>
                  اندازه مناسب نبود؟ هر جفت پوشیده‌نشده را تا ۳۰ روز با
                  بازگشت کامل وجه پس بدهید — بازگشت همیشه رایگان است.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}