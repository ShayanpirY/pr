import { Heart, Search, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";

const NAV_LINKS = ["مردانه", "زنانه", "دویدن", "لایف‌استایل", "تخفیف‌ها"];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <ShoppingBag className="size-4" />
          </span>
          سولاستایل
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
          <Button variant="ghost" size="icon" aria-label="جستجو" className="rounded-full">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" aria-label="علاقه‌مندی‌ها" className="rounded-full">
            <Heart />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}