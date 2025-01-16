import { cancelReservation } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import prisma from "@/app/lib/db";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface PageProps {
  params: { id: string }; // Automatically injected by the App Router
}

// This function is now asynchronous because it's a server component
export default async function CancelReservationRoute({ params }: PageProps) {
  const tripId = params.id;

  // Fetch trip details from the database (if needed)
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Trip Not Found</CardTitle>
            <CardDescription>
              We couldn’t find the trip you’re trying to cancel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Are you sure you want to cancel this reservation?
          </CardTitle>
          <CardDescription>
            This action will permanently cancel this reservation.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/trips"}>
              <SubmitButtons text="Back to Dashboard" variant="outline" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <form action={cancelReservation}>
              <input type="hidden" name="tripId" value={tripId} />
              <SubmitButtons text="Cancel Reservation" variant="destructive" />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
