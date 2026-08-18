import { Header } from "@/components/header";

export const metadata = {
  title: "تسویه حساب | سولاستایل",
  description: "تکمیل سفارش و پرداخت.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">تسویه حساب</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          اطلاعات تحویل و پرداخت خود را وارد کنید.
        </p>
      </main>
    </>
  );
}
