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

// Define the props type
interface PageProps {
  params: { id: string }; // params object injected by the App Router
}

// This is an async server component
export default async function CancelReservationRoute({ params }: PageProps) {
  const tripId = params.id; // Extract trip ID from the params

  // Fetch trip details from the database (optional, for validation)
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  // If the trip doesn't exist, show a "not found" message
  if (!trip) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Trip Not Found</CardTitle>
            <CardDescription>
              We couldn’t find the trip you’re trying to cancel. Please check
              the URL and try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Render the cancellation confirmation page
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Are you sure you want to cancel this reservation?
          </CardTitle>
          <CardDescription>
            This action will permanently cancel this reservation. This cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          {/* Back to Dashboard button */}
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/trips"}>
              <SubmitButtons text="Back to Dashboard" variant="outline" />
            </Link>
          </div>

          {/* Cancel Reservation form */}
          <div className="flex flex-col gap-3">
            <form action={cancelReservation}>
              {/* Hidden input to pass the trip ID */}
              <input type="hidden" name="tripId" value={tripId} />
              <SubmitButtons text="Cancel Reservation" variant="destructive" />
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
