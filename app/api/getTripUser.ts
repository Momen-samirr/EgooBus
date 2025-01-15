import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { tripId } = req.query;

  if (!tripId || typeof tripId !== "string") {
    return res.status(400).json({ error: "Invalid or missing trip ID" });
  }

  try {
    // Fetch the trip details
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Fetch the user associated with the trip
    const tripUser = await prisma.user.findUnique({
      where: { id: trip.userId },
    });

    if (!tripUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user details
    return res.status(200).json(tripUser);
  } catch (error) {
    console.error("Error fetching trip user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
