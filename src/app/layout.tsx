import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { CartProvider } from "@/contexts/cart-context";
import { FlyToCartProvider } from "@/contexts/fly-to-cart";
import { AuroraBackground } from "@/components/aurora-background";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "سولاستایل — فروشگاه کتانی",
  description:
    "محبوب‌ترین کتانی‌های فصل را کشف کنید؛ با راحتی بی‌نظیر، طراحی جسورانه و ارسال رایگان.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className={`${vazirmatn.variable} min-h-full flex flex-col`}>
        <AuroraBackground />
        <FlyToCartProvider>
          <CartProvider>{children}</CartProvider>
        </FlyToCartProvider>
      </body>
    </html>
  );
}