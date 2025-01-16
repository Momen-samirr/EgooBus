"use client";

import { use } from "react";
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

type Params = Promise<{ id: string }>;

export default function ReservationRoute({ params }: { params: Params }) {
  const resolvedParams = use(params); // Resolve the async params
  const tripId = resolvedParams.id; // Extract the trip ID

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
          {/* Cancel Button */}
          <div className="flex flex-col gap-3">
            <Link href={"/dashboard/trips"}>
              <SubmitButtons text="Cancel" variant="outline" />
            </Link>
          </div>

          {/* Reservation Form */}
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
