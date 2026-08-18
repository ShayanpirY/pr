"use client";

import { useRef, useState } from "react";
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
import { Magnetic } from "@/components/ui/magnetic";
import { useCart } from "@/contexts/cart-context";
import { useFlyToCart } from "@/contexts/fly-to-cart";
import { faNum, formatPrice } from "@/lib/format";
import { SHOE_SIZES, type Shoe } from "@/lib/products";
import { cn } from "@/lib/utils";

type Tab = "overview" | "specs" | "shipping";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "بررسی" },
  { id: "specs", label: "مشخصات فنی" },
  { id: "shipping", label: "ارسال" },
];

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

const HOTSPOTS = [
  {
    x: "22%",
    y: "38%",
    side: "right" as const,
    title: "کفی هوشمند",
    desc: "پد فوم بادوام برای راحتی در طول روز",
  },
  {
    x: "78%",
    y: "62%",
    side: "left" as const,
    title: "رویه تنفس‌پذیر",
    desc: "پارچه بافتنی سبک و انعطاف‌پذیر",
  },
];

export function ProductView({ product }: { product: Shoe }) {
  const [activeColor, setActiveColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [hotspot, setHotspot] = useState<number | null>(null);
  const { addItem } = useCart();
  const { flyToCart } = useFlyToCart();
  const galleryRef = useRef<HTMLDivElement>(null);

  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  const handleAdd = () => {
    const image = product.gallery[activeColor];
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image,
      price: product.price,
      size: selectedSize ?? SHOE_SIZES[0],
      color: product.colors[activeColor].name,
    });
    if (galleryRef.current) flyToCart(image, galleryRef.current);
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
          <div
            ref={galleryRef}
            className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-900/40"
          >
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

            {HOTSPOTS.map((spot, index) => (
              <div
                key={spot.title}
                className="absolute z-[5]"
                style={{ left: spot.x, top: spot.y }}
              >
                <div
                  className="relative size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onMouseEnter={() => setHotspot(index)}
                  onMouseLeave={() => setHotspot(null)}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-primary/50"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-lg ring-2 ring-white" />
                </div>

                <motion.span
                  aria-hidden
                  animate={
                    hotspot === index
                      ? { opacity: 1, scaleX: 1 }
                      : { opacity: 0, scaleX: 0 }
                  }
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "absolute h-px w-4 bg-gradient-to-l from-primary/70 to-transparent",
                    spot.side === "right" ? "right-5" : "left-5 origin-left bg-gradient-to-r"
                  )}
                  style={{ top: "50%", translateY: "-50%" }}
                />

                <div
                  className={cn(
                    "pointer-events-none absolute top-1/2 w-44 -translate-y-1/2",
                    spot.side === "right" ? "right-9" : "left-9"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={
                      hotspot === index
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 4, scale: 0.92 }
                    }
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="rounded-2xl border border-white/10 bg-zinc-950/80 p-3 shadow-xl backdrop-blur-md"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {spot.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {spot.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`مشاهده تصویر ${faNum(index + 1)}`}
                onClick={() => setActiveColor(index)}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-900/40 ring-2 transition-all",
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
                  transition={spring}
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
                  transition={spring}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "relative h-10 min-w-10 rounded-full border px-3 text-sm font-medium transition-colors",
                    selectedSize === size
                      ? "border-foreground text-background"
                      : "border-white/10 bg-white/5 text-foreground hover:border-foreground/50"
                  )}
                >
                  {selectedSize === size && (
                    <motion.span
                      layoutId="activeSize"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-[1]">{faNum(size)}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.3} className="flex-1">
              <motion.div whileTap={{ scale: 0.95 }} transition={spring} className="w-full">
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
            </Magnetic>
            <motion.div whileTap={{ scale: 0.9 }} transition={spring}>
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

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:grid-cols-3">
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