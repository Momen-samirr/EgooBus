import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TripsRoute from "./triproute";

const getUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
};

export default async function DefultTripRoute() {
  const user = await getUserData();
  return <TripsRoute user={user} />;
}
