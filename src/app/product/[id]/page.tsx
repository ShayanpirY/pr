import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductView } from "@/components/ProductView";
import { getProductById, PRODUCTS } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    return { title: "محصول یافت نشد | سولاستایل" };
  }

  return {
    title: `${product.name} | سولاستایل`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}