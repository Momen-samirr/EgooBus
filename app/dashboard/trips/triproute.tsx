"use client";

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Trip = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
  userId: string;
  User: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TripsRoute({ user }: { user: any }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    status: "",
  });

  console.log("user", user);

  const fetchTrips = async (date?: Date) => {
    setIsLoading(true);
    try {
      let dateParam = null;
      if (date) {
        const utcDate = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
        dateParam = utcDate.toISOString().split("T")[0];
      }

      const response = await fetch(
        `/api/trips${dateParam ? `?date=${dateParam}` : ""}`
      );
      if (!response.ok) throw new Error("Failed to fetch trips");

      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (column: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
  };

  const filteredTrips = trips.filter((trip) =>
    Object.entries(filters).every(([key, value]) =>
      value
        ? trip[key as keyof Trip]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : true
    )
  );
  console.log("filteredTrips", filteredTrips);

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <>
      {user.email == "mow78433@gmail.com" && (
        <div className="flex items-center justify-end">
          <Button asChild>
            <Link href={"/dashboard/trips/create"}>
              <PlusCircle className="size-5" />
              <span>Create Trip</span>
            </Link>
          </Button>
        </div>
      )}
      {isLoading ? (
        <p>Loading trips...</p>
      ) : (
        <div className="mt-5">
          {trips.length === 0 ? (
            <p>No trips found for the selected date.</p>
          ) : (
            <Table>
              <TableHeader className="border-b bg-muted rounded-lg">
                <TableRow>
                  <TableHead>
                    <Input
                      type="text"
                      placeholder="Filter Title"
                      value={filters.title}
                      onChange={(e) =>
                        handleFilterChange("title", e.target.value)
                      }
                      className="border-none"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      type="date"
                      value={filters.date}
                      onChange={(e) =>
                        handleFilterChange("date", e.target.value)
                      }
                      className="border-none"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      type="text"
                      placeholder="Filter Time"
                      value={filters.time}
                      onChange={(e) =>
                        handleFilterChange("time", e.target.value)
                      }
                      className="border-none"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      type="text"
                      placeholder="Filter Type"
                      value={filters.type}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
                      className="border-none"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      type="text"
                      placeholder="Filter Status"
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="border-none"
                    />
                  </TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.title}</TableCell>
                    <TableCell className="font-medium">
                      {new Intl.DateTimeFormat("en-US").format(
                        new Date(trip.date)
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{trip.time}</TableCell>
                    <TableCell className="font-medium">{trip.type}</TableCell>
                    <TableCell className="font-medium">{trip.status}</TableCell>
                    {trip.status === "Reserved" ? (
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              {trip.userId === user.id ? "Me" : "View Driver"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col items-center gap-3">
                            <DialogHeader className="flex flex-col items-center space-y-3">
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <Avatar className="w-20 h-20 flex items-center justify-center">
                                <AvatarImage
                                  src={trip.User.profileImage}
                                  alt={trip.User.firstName}
                                />
                                <AvatarFallback>
                                  {trip.User.firstName}
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-sm text-muted-foreground">
                                {trip.User.firstName} {trip.User.lastName}
                              </p>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <p>No body</p>
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} size={"icon"}>
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {trip.status !== "Reserved" ? (
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/trips/${trip.id}/reservation`}
                              >
                                Reserve
                              </Link>
                            </DropdownMenuItem>
                          ) : (
                            <>
                              {trip.userId !== user?.id ? (
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/trips/${trip.id}/details`}
                                  >
                                    Details
                                  </Link>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/trips/${trip.id}/cancelreservation`}
                                  >
                                    Cancel
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </>
  );
}
