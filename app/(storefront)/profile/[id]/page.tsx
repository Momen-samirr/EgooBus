import { ProfilePage } from "@/app/components/storefront/EditAppNumber";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

const getUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user === null || !user.id) {
    return notFound();
  }

  const userDetails = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return userDetails;
};

export default async function ProfileRoute() {
  const userDetails = await getUserData();
  return (
    <>
      <ProfilePage userDetails={userDetails} />
    </>
  );
}
