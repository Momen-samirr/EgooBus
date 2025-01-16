import { cancelReservation } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface PageProps {
  params: { id: string };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Extract the trip ID from params
  return {
    props: {
      params: { id },
    },
  };
};

export default function CancelReservationRoute({ params }: PageProps) {
  const tripId = params.id;

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
