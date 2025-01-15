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

interface PageProps {
  params: { id: string };
}

export default function DeleteBannerRoute({ params }: PageProps) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this banner?</CardTitle>
          <CardDescription>
            This action Will permanently delete this banner
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-5">
            <Link href={"/dashboard/banners"}>
              <SubmitButtons text="Cancel" variant={"outline"} />
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <form action={deleteBanner}>
              <input type="hidden" name="bannerId" value={params.id} />
              <SubmitButtons text="Delete" variant={"destructive"} />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
