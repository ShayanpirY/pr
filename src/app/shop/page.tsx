import { Header } from "@/components/header";

export const metadata = {
  title: "فروشگاه | سولاستایل",
  description: "تمام کتانی‌های موجود را مرور کنید.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">فروشگاه</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          همه کتانی‌های موجود نمایش داده می‌شوند.
        </p>
      </main>
    </>
  );
}
