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
  params: { id: string } | Promise<{ id: string }>;
}

export default function ReservationRoute({ params }: PageProps) {
  let tripId = "";

  // Handle both synchronous and Promise-based params
  if (params instanceof Promise) {
    params.then((resolvedParams) => {
      tripId = resolvedParams.id;
    });
  } else {
    tripId = params.id;
  }

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to reserve this trip?</CardTitle>
          <CardDescription>
            This action will permanently reserve this trip.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/trips"}>
              <SubmitButtons text="Cancel" variant="outline" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <form action={reserveTrip}>
              <input type="hidden" name="tripId" value={tripId} />
              <SubmitButtons text="Reserve" variant="default" />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
