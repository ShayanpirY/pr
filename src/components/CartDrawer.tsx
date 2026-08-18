"use client";

import Image from "next/image";
import { ArrowRight, Minus, PackageOpen, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;

export function CartDrawer() {
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open shopping bag"
            className="relative rounded-full"
          />
        }
      >
        <ShoppingBag />
        {itemCount > 0 && (
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
            {itemCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="size-4" />
            Shopping bag
          </SheetTitle>
          <SheetDescription>
            {itemCount > 0
              ? `${itemCount} item${itemCount === 1 ? "" : "s"} · Free shipping over $75`
              : "Your bag is empty"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <PackageOpen className="size-6" />
              </span>
              <p className="font-medium text-foreground">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">
                Add your favourite sneakers to get started.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Size {item.size}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-base font-bold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <Button size="lg" className="w-full rounded-full">
              Checkout
              <ArrowRight />
            </Button>
            <SheetClose
              render={<Button variant="ghost" className="w-full rounded-full" />}
            >
              Continue shopping
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}