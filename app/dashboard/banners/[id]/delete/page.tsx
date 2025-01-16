import { deleteBanner } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { use } from "react";

type Params = Promise<{ id: string }>;

export default function DeleteBannerRoute(props: { params: Params }) {
  const params = use(props.params);
  const bannerId = params.id;
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this banner?</CardTitle>
          <CardDescription>
            This action will permanently delete this banner
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/banners"}>
              <SubmitButtons text="Cancel" variant={"outline"} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <form action={deleteBanner}>
              <input type="hidden" name="bannerId" value={bannerId} />
              <SubmitButtons text="Delete Banner" variant={"destructive"} />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
