import { EditProduct } from "@/app/components/dashboard/EditProduct";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

export async function getProductData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function ProductRoute({
  params,
}: {
  params: { id: string };
}) {
  const productData = await getProductData(params.id);
  return (
    <>
      <EditProduct productData={productData} />
    </>
  );
}
