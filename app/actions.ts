"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import {
  bannerSchema,
  productSchema,
  tripSchema,
  userSchema,
} from "./lib/zodSchema";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
export default async function createProduct(
  prevState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrl = submission.value.images.flatMap((imageUrl) =>
    imageUrl.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      images: flattenUrl,
      status: submission.value.status,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  return redirect("/dashboard/products");
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("productId") as string;

  const flattenUrl = submission.value.images.flatMap((imageUrl) =>
    imageUrl.split(",").map((url) => url.trim())
  );

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      category: submission.value.category,
      images: flattenUrl,
      isFeatured: submission.value.isFeatured,
    },
  });

  return redirect(`/dashboard/products`);
}

export async function deleteProduct(fromData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: fromData.get("productId") as string,
    },
  });

  return redirect("/dashboard/products");
}

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  console.log("user", user);

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });
  console.log("submission", submission);

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  return redirect("/dashboard/banners");
}

export async function deleteBanner(fromData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: fromData.get("bannerId") as string,
    },
  });

  return redirect("/dashboard/banners");
}

export async function createTrip(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: tripSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.trip.create({
    data: {
      title: submission.value.title,
      date: submission.value.date,
      time: submission.value.time,
      type: submission.value.type,
      status: submission.value.status || "Available",
      userId: user.id,
    },
  });
  return redirect("/dashboard/trips");
}

export async function reserveTrip(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const tripId = formData.get("tripId") as string;

  const tripToReserve = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!tripToReserve) {
    throw new Error("Trip not found");
  }

  const userTripsOnSameDate = await prisma.trip.findMany({
    where: {
      userId: user.id,
      status: "Reserved",
      date: {
        gte: new Date(tripToReserve.date.toISOString().split("T")[0]),
        lt: new Date(
          new Date(tripToReserve.date.toISOString().split("T")[0]).setDate(
            new Date(tripToReserve.date).getDate() + 1
          )
        ),
      },
    },
  });

  if (userTripsOnSameDate.length >= 3) {
    return redirect("/dashboard");
  }

  // Reserve the trip
  await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      status: "Reserved",
      userId: user.id,
    },
  });

  return redirect("/dashboard/trips");
}

export async function getTripDetails(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }
  const trip = await prisma.trip.findUnique({
    where: {
      id: formData.get("tripId") as string,
    },
  });

  const userTrip = await prisma.user.findUnique({
    where: {
      id: trip?.userId,
    },
  });

  return {
    trip,
    userTrip,
  };
}

export async function cancelReservation(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  const tripId = formData.get("tripId") as string;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (trip?.userId !== user.id) {
    return redirect("/dashboard/trips");
  }

  await prisma.trip.update({
    where: {
      id: formData.get("tripId") as string,
    },
    data: {
      status: "Available",
      userId: "kp_28594facd47147fdb0d57935ff6552d3",
    },
  });

  return redirect("/dashboard/trips");
}

export async function deleteAllTrips() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user === null || !user.id) {
    return redirect("/");
  }

  await prisma.trip.deleteMany({
    where: {
      userId: user.id,
      AND: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    },
  });
}

export async function updateApplicationNumber(
  prevState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user.id) {
    return { error: { general: ["Unauthorized. Please log in."] } };
  }

  const submission = parseWithZod(formData, {
    schema: userSchema,
  });

  if (submission.status !== "success") {
    return {
      error: {
        general: ["Invalid input. Please check the Application Number."],
      },
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return { error: { general: ["User not found."] } };
  }

  const existingApplicationNumber = await prisma.user.findFirst({
    where: {
      applicationNumber: submission.value.applicationNumber,
    },
  });

  if (existingApplicationNumber) {
    return { error: { general: ["Application number already exists."] } };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { applicationNumber: submission.value.applicationNumber },
    });

    return {
      success: true,
      message: "Application Number updated successfully.",
    };
  } catch (error) {
    console.error("Error updating application number:", error);
    return {
      error: {
        general: ["Failed to update Application Number. Please try again."],
      },
    };
  }
}
