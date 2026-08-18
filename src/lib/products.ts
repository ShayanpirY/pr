export type ProductColor = {
  name: string;
  hex: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Shoe = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  badge?: string;
  colors: ProductColor[];
  gallery: string[];
  description: string;
  specs: Spec[];
};

export const SHOE_SIZES = [40, 41, 42, 43, 44] as const;

type Base = Omit<Shoe, "colors" | "gallery" | "description" | "specs">;

function buildProduct(
  base: Base,
  colors: ProductColor[],
  gallerySuffix: string[],
  description: string,
  specs: Spec[]
): Shoe {
  return {
    ...base,
    colors,
    gallery: [base.image, ...gallerySuffix],
    description,
    specs,
  };
}

const runningSpecs = (weight: string, drop: string) => [
  { label: "جنس رویه", value: "توری مهندسی‌شده" },
  { label: "زیره", value: "لاستیک با شیارهای منعطف" },
  { label: "راحتی و فوم", value: "زیره میانی فومی واکنش‌گرا" },
  { label: "وزن", value: weight },
  { label: "افت پاشنه", value: drop },
  { label: "سایزبندی", value: "مطابق سایز" },
];

const lifestyleSpecs = (weight: string, material: string) => [
  { label: "جنس رویه", value: material },
  { label: "زیره", value: "لاستیک ولکانیزه" },
  { label: "راحتی و فوم", value: "کفی سبک" },
  { label: "وزن", value: weight },
  { label: "بستن", value: "بنددار" },
  { label: "سایزبندی", value: "مطابق سایز" },
];

export const PRODUCTS: Shoe[] = [
  buildProduct(
    {
      id: 1,
      name: "Nike Air Max 270",
      category: "دویدن",
      price: 18900000,
      originalPrice: 24000000,
      rating: 4.8,
      image: "/shoes/air-max-270.png",
      badge: "پرفروش",
    },
    [
      { name: "سفید ابری", hex: "#3b82f6" },
      { name: "مشکی نیمه‌شب", hex: "#0f172a" },
      { name: "زرشکی", hex: "#dc2626" },
    ],
    ["/shoes/gallery/1-2.png", "/shoes/gallery/1-3.png"],
    "فناوری معروف Air در کنار رویه‌ی بافت‌خورده و سبک؛ ساخته‌شده برای راحتی تمام‌روز، هم در پیست و هم بیرون از آن.",
    runningSpecs("۳۱۰ گرم", "۸ میلی‌متر"),
  ),
  buildProduct(
    {
      id: 2,
      name: "Adidas Ultraboost Light",
      category: "دویدن",
      price: 16500000,
      originalPrice: 20000000,
      rating: 4.7,
      image: "/shoes/ultraboost.png",
    },
    [
      { name: "مشکی", hex: "#1e293b" },
      { name: "قرمز خورشیدی", hex: "#ef4444" },
      { name: "سفید ابری", hex: "#f1f5f9" },
    ],
    ["/shoes/gallery/2-2.png", "/shoes/gallery/2-3.png"],
    "سبک‌ترین Ultraboost تاریخ، با زیره میانی Boost برای بازگشت انرژی و گام‌هایی فنری و پرانرژی.",
    runningSpecs("۲۹۹ گرم", "۱۰ میلی‌متر"),
  ),
  buildProduct(
    {
      id: 3,
      name: "Converse Chuck 70",
      category: "لایف‌استایل",
      price: 7500000,
      originalPrice: 9500000,
      rating: 4.6,
      image: "/shoes/chuck-70.png",
      badge: "جدید",
    },
    [
      { name: "سفید گچی", hex: "#f5f5f4" },
      { name: "مشکی وینتیج", hex: "#1c1917" },
      { name: "قهوه‌ای رزینی", hex: "#92400e" },
    ],
    ["/shoes/gallery/3-2.png", "/shoes/gallery/3-3.png"],
    "های‌تاپ بی‌زمان، با کانواس ممتاز، استایل وینتیج و کفی OrthoLite بازآفرینی شده است.",
    lifestyleSpecs("۳۸۵ گرم", "کانواس ضخیم"),
  ),
  buildProduct(
    {
      id: 4,
      name: "Nike Pegasus 41",
      category: "دویدن",
      price: 13000000,
      originalPrice: 13000000,
      rating: 4.9,
      image: "/shoes/pegasus.png",
    },
    [
      { name: "خاکستری", hex: "#a1a1aa" },
      { name: "صورتی", hex: "#ec4899" },
      { name: "آبی سلطنتی", hex: "#2563eb" },
    ],
    ["/shoes/gallery/4-2.png", "/shoes/gallery/4-3.png"],
    "اسب کار روزمره؛ فوم ReactX پاسخ‌گو و رویه‌ای تنفس‌پذیر برای کیلومترهای روان و مطمئن.",
    runningSpecs("۲۸۳ گرم", "۱۰ میلی‌متر"),
  ),
  buildProduct(
    {
      id: 5,
      name: "Yeezy Boost 350 V2",
      category: "استریت‌ور",
      price: 32000000,
      originalPrice: 38000000,
      rating: 4.5,
      image: "/shoes/yeezy-350.png",
    },
    [
      { name: "کنجدی", hex: "#d6d3d1" },
      { name: "سفید مایل به خاکستری", hex: "#f8fafc" },
      { name: "مشکی", hex: "#0f172a" },
    ],
    ["/shoes/gallery/5-2.png", "/shoes/gallery/5-3.png"],
    "رویه پرایم‌نیت روی زیره Boost؛ همان چسبندگی جوراب‌مانند و سیلوئت آماده‌ی خیابان.",
    lifestyleSpecs("۳۵۰ گرم", "پرایم‌نیت"),
  ),
  buildProduct(
    {
      id: 6,
      name: "Puma RS-X Toys",
      category: "لایف‌استایل",
      price: 11000000,
      originalPrice: 14000000,
      rating: 4.4,
      image: "/shoes/rs-x.png",
    },
    [
      { name: "خاکستری", hex: "#94a3b8" },
      { name: "سرمه‌ای", hex: "#1e3a8a" },
      { name: "قرمز", hex: "#dc2626" },
    ],
    ["/shoes/gallery/6-2.png", "/shoes/gallery/6-3.png"],
    "سیلوئتی جسور و حجیم با خطوط رانینگ رترو و زیره RS نرم برای راحتی واقعی در هر روز.",
    lifestyleSpecs("۴۲۰ گرم", "ترکیب توری و چرم"),
  ),
  buildProduct(
    {
      id: 101,
      name: "Aero Zoom Fly",
      category: "دویدن",
      price: 14900000,
      originalPrice: 18900000,
      rating: 4.8,
      image: "/shoes/trending-1.png",
      badge: "ترند",
    },
    [
      { name: "آبی اقیانوسی", hex: "#3b82f6" },
      { name: "بنفش سلطنتی", hex: "#7c3aed" },
      { name: "فیروزه‌ای", hex: "#06b6d4" },
    ],
    ["/shoes/gallery/101-2.png", "/shoes/gallery/101-3.png"],
    "توری فوق‌سبک مهندسی‌شده با صفحه کربنی برای تمرین‌های سریع و پرقدرت.",
    runningSpecs("۲۴۰ گرم", "۸ میلی‌متر"),
  ),
  buildProduct(
    {
      id: 102,
      name: "Velocity Strike",
      category: "دویدن",
      price: 12900000,
      originalPrice: 16500000,
      rating: 4.7,
      image: "/shoes/trending-2.png",
    },
    [
      { name: "قرمز داغ", hex: "#ef4444" },
      { name: "کهربایی", hex: "#f59e0b" },
      { name: "صورتی", hex: "#f43f5e" },
    ],
    ["/shoes/gallery/102-2.png", "/shoes/gallery/102-3.png"],
    "انرژی روز مسابقه در یک کفش روزمره؛ فوم فنری، زیره‌ای چسبنده و سایز کاملاً ثابت.",
    runningSpecs("۲۵۵ گرم", "۹ میلی‌متر"),
  ),
  buildProduct(
    {
      id: 103,
      name: "Green Court Classic",
      category: "لایف‌استایل",
      price: 9500000,
      originalPrice: 12000000,
      rating: 4.6,
      image: "/shoes/trending-3.png",
    },
    [
      { name: "زمردی", hex: "#10b981" },
      { name: "سبز جنگلی", hex: "#047857" },
      { name: "سبز آبی", hex: "#14b8a6" },
    ],
    ["/shoes/gallery/103-2.png", "/shoes/gallery/103-3.png"],
    "سیلوئت کلین کورت با جیر ممتاز و زیره رزینی؛ استایلی بی‌زحمت از روز تا شب.",
    lifestyleSpecs("۳۳۰ گرم", "جیر ممتاز"),
  ),
  buildProduct(
    {
      id: 104,
      name: "Sunset Retro High",
      category: "استریت‌ور",
      price: 11200000,
      originalPrice: 14000000,
      rating: 4.5,
      image: "/shoes/trending-4.png",
    },
    [
      { name: "نارنجی غروب", hex: "#f59e0b" },
      { name: "مرجانی", hex: "#fb7185" },
      { name: "لیمویی", hex: "#eab308" },
    ],
    ["/shoes/gallery/104-2.png", "/shoes/gallery/104-3.png"],
    "های‌تاپ الهام‌گرفته از دهه ۹۰ با ترکیب رنگی جسور و زیره رترو نرم.",
    lifestyleSpecs("۴۰۰ گرم", "نوبوک و توری"),
  ),
];

export const SHOES = PRODUCTS.filter((product) => product.id <= 6);
export const TRENDING_SNEAKERS = PRODUCTS.filter((product) => product.id >= 101);

export function getProductById(id: number) {
  return PRODUCTS.find((product) => product.id === id);
}