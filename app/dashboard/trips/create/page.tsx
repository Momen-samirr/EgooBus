import CreateTrip from "@/app/components/dashboard/CreateTrip";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

export default async function CreateTripRoute() {
  const dbUser = await getUserData();
  return <CreateTrip data={dbUser} />;
}
