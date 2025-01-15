import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  let trips;

  if (date) {
    const startOfDay = new Date(date);
    const endOfDay = new Date(
      new Date(date).setUTCDate(new Date(date).getUTCDate() + 1)
    );

    trips = await prisma.trip.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: {
        User: true, // Include associated User data
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    trips = await prisma.trip.findMany({
      include: {
        User: true, // Include associated User data
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return NextResponse.json(trips);
}
