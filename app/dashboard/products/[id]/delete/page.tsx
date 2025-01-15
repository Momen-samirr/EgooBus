import { deleteProduct } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}
export default function DeleteProductRoute({ params }: PageProps) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this product?</CardTitle>
          <CardDescription>
            This action Will permanently delete this product
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Link href={"/dashboard/products"}>
              <SubmitButtons text="Cancel" variant={"outline"} />
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <form action={deleteProduct}>
              <input type="hidden" name="productId" value={params.id} />
              <SubmitButtons text="Delete" variant={"destructive"} />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
