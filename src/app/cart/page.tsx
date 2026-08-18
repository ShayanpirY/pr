import { Header } from "@/components/header";

export const metadata = {
  title: "سبد خرید | سولاستایل",
  description: "کالاهای انتخابی‌تان در سبد خرید.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">سبد خرید</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          هنوز کالایی به سبد خرید نیاورده‌اید.
        </p>
      </main>
    </>
  );
}
