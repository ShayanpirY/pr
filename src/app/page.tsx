import Image from "next/image";
import {
  Flame,
  Heart,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoeCard, type Shoe } from "@/components/ShoeCard";
import { cn } from "@/lib/utils";

const NAV_LINKS = ["Men", "Women", "Running", "Lifestyle", "Sale"];

const SHOES: Shoe[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "Running",
    price: 189,
    originalPrice: 240,
    rating: 4.8,
    image: "/shoes/air-max-270.jpg",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light",
    category: "Running",
    price: 165,
    originalPrice: 200,
    rating: 4.7,
    image: "/shoes/ultraboost.jpg",
  },
  {
    id: 3,
    name: "Converse Chuck 70",
    category: "Lifestyle",
    price: 75,
    originalPrice: 95,
    rating: 4.6,
    image: "/shoes/chuck-70.jpg",
    badge: "New",
  },
  {
    id: 4,
    name: "Nike Pegasus 41",
    category: "Running",
    price: 130,
    originalPrice: 130,
    rating: 4.9,
    image: "/shoes/pegasus.jpg",
  },
  {
    id: 5,
    name: "Yeezy Boost 350 V2",
    category: "Streetwear",
    price: 320,
    originalPrice: 380,
    rating: 4.5,
    image: "/shoes/yeezy-350.jpg",
  },
  {
    id: 6,
    name: "Puma RS-X Toys",
    category: "Lifestyle",
    price: 110,
    originalPrice: 140,
    rating: 4.4,
    image: "/shoes/rs-x.jpg",
  },
];

const TRUST_ITEMS = [
  { icon: Truck, label: "Free shipping", hint: "On orders over $75" },
  { icon: RotateCcw, label: "Easy returns", hint: "30-day return policy" },
  { icon: ShieldCheck, label: "Secure payment", hint: "256-bit SSL checkout" },
];

const TRENDING_SNEAKERS: Shoe[] = [
  {
    id: 101,
    name: "Aero Zoom Fly",
    category: "Running",
    price: 149,
    originalPrice: 189,
    rating: 4.8,
    image: "/shoes/trending-1.png",
    badge: "Trending",
  },
  {
    id: 102,
    name: "Velocity Strike",
    category: "Running",
    price: 129,
    originalPrice: 165,
    rating: 4.7,
    image: "/shoes/trending-2.png",
  },
  {
    id: 103,
    name: "Green Court Classic",
    category: "Lifestyle",
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    image: "/shoes/trending-3.png",
  },
  {
    id: 104,
    name: "Sunset Retro High",
    category: "Streetwear",
    price: 112,
    originalPrice: 140,
    rating: 4.5,
    image: "/shoes/trending-4.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <ShoppingBag className="size-4" />
            </span>
            SoleStyle
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" className="rounded-full">
              <Search />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="rounded-full">
              <Heart />
            </Button>
            <CartDrawer />
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Badge className="rounded-full px-3 py-1" variant="secondary">
                New Season · 2026 Collection
              </Badge>
              <h1 className="font-heading text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Step into
                <span className="text-muted-foreground"> style, </span>
                built for every stride.
              </h1>
              <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                Discover the season&apos;s most wanted sneakers — premium comfort,
                bold design, and prices you&apos;ll love.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="h-11 rounded-full px-6">
                  <ShoppingBag />
                  Shop collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-6"
                >
                  Explore running
                </Button>
              </div>
              <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  ["2.4K+", "Happy customers"],
                  ["150+", "Sneaker styles"],
                  ["4.8", "Average rating"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-2xl font-bold text-foreground">{value}</dd>
                    <dd className="text-sm text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-amber-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl shadow-black/10 dark:bg-zinc-900">
                <Image
                  src="/shoes/hero.jpg"
                  alt="Featured sneaker"
                  width={1200}
                  height={900}
                  priority
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/85 p-3 shadow-lg backdrop-blur dark:bg-zinc-950/70">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
                    <Truck className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Free next-day delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      On orders over $75
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-foreground text-background">
                <Flame className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wider text-primary uppercase">
                  Best selling
                </p>
                <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Trending sneakers
                </h2>
              </div>
            </div>
            <a
              href="#"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING_SNEAKERS.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-wider text-primary uppercase">
                Trending now
              </p>
              <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Featured sneakers
              </h2>
            </div>
            <div className="flex gap-2">
              {["All", "Running", "Lifestyle", "Streetwear"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    filter === "All"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHOES.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-border/60 bg-card p-6 sm:grid-cols-3 sm:p-8">
            {TRUST_ITEMS.map(({ icon: Icon, label, hint }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 SoleStyle. All rights reserved.</p>
          <p>Made with Next.js, shadcn/ui & Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}