import { ProfilePage } from "@/app/components/storefront/EditAppNumber";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

export const getUserData = async (userId: string) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userData) {
    return notFound();
  }

  return userData;
};

export default async function ProfileRoute({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;
  const userData = await getUserData(userId);

  return (
    <>
      <ProfilePage data={userData} />
    </>
  );
}
