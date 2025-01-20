import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TripsRoute from "./triproute";
import prisma from "@/app/lib/db";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering

const getUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  return dbUser;
};

export default async function DefultTripRoute() {
  const dbUser = await getUserData();
  return <TripsRoute user={dbUser} />;
}
