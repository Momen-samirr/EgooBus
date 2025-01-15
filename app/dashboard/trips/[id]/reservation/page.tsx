import { reserveTrip } from "@/app/actions";
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

export default function ReservationRoute({ params }: PageProps) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Are you want to reserve this trip</CardTitle>
          <CardDescription>
            This action Will permanently reserve this trip
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/trips"}>
              <SubmitButtons text="Cancel" variant={"outline"} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <form action={reserveTrip}>
              <input type="hidden" name="tripId" value={params.id} />
              <SubmitButtons text="Reserve" variant={"default"} />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
