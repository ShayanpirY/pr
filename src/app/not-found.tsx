import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="mx-auto flex max-w-md flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[6rem] font-extrabold text-primary/20">۴۰۴</span>
          <h1 className="font-heading text-3xl font-bold">مسیر اشتباه است</h1>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          صفحه‌ای که دنبالش می‌گردید وجود ندارد یا منتقل شده است.
          <br />
          از منوی سایت استفاده کنید یا به ادامه بزنید.
        </p>

        <Link href="/" passHref>
          <Button size="lg" className="rounded-full">
            <Home className="ml-2 size-4" />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
}
