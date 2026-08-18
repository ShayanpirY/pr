import {
  Flame,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FeaturedGrid } from "@/components/featured-grid";
import { Header } from "@/components/header";
import { HeroVisual } from "@/components/hero-visual";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Reveal } from "@/components/reveal";
import { ShoeCard } from "@/components/ShoeCard";
import { SkewCard } from "@/components/skew-card";
import { SpotlightCard } from "@/components/spotlight-card";
import { SHOES, TRENDING_SNEAKERS } from "@/lib/products";

const TRUST_ITEMS = [
  { icon: Truck, label: "ارسال رایگان", hint: "برای سفارش‌های بالای ۷٬۵۰۰٬۰۰۰ تومان" },
  { icon: RotateCcw, label: "بازگشت آسان", hint: "سیاست بازگشت ۳۰ روزه" },
  { icon: ShieldCheck, label: "پرداخت امن", hint: "پرداخت SSL با رمزنگاری ۲۵۶ بیتی" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent font-sans text-foreground">
      <Header />

      <main>
        <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Badge className="rounded-full px-3 py-1" variant="secondary">
                کلکسیون جدید · ۲۰۲۶
              </Badge>
              <h1 className="font-heading text-4xl leading-[1.3] font-bold tracking-tight sm:text-5xl lg:text-6xl">
                قدم به دنیای
                <span className="text-muted-foreground"> استایل بگذارید، </span>
                برای هر گام.
              </h1>
              <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                محبوب‌ترین کتانی‌های این فصل را کشف کنید؛ راحتی بی‌نظیر، طراحی
                جسورانه و قیمت‌هایی که عاشقشان می‌شوید.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.3}>
                  <Button size="lg" className="h-11 rounded-full px-6">
                    <ShoppingBag />
                    خرید از کلکسیون
                  </Button>
                </Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-6"
                >
                  کاوش در دویدن
                </Button>
              </div>
              <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  ["۲٫۴ هزار+", "مشتری راضی"],
                  ["۱۵۰+", "سبک کتانی"],
                  ["۴٫۸", "میانگین امتیاز"],
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
              <HeroVisual />
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
                  پرفروش‌ترین
                </p>
                <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  کتانی‌های ترند
                </h2>
              </div>
            </div>
            <a
              href="/shop"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-md transition-colors hover:border-white/30 hover:text-foreground"
            >
              مشاهده همه
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING_SNEAKERS.map((shoe, index) => (
              <Reveal key={shoe.id} index={index}>
                <SkewCard className="h-full">
                  <ShoeCard shoe={shoe} />
                </SkewCard>
              </Reveal>
            ))}
          </div>
        </section>

        <SpotlightCard shoe={SHOES[0]} />

        <FeaturedGrid shoes={SHOES} />

        <HorizontalScroll />

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-3 sm:p-8">
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
          <p>© ۲۰۲۶ سولاستایل. تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با Next.js، shadcn/ui و Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}