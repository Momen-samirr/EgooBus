import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BannersPage() {
  // Fetch data directly within the component
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href={"/dashboard/banners/create"}>
            <PlusCircle className="size-5" />
            <span>Create Banner</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners Page</CardTitle>
          <CardDescription>This is a list of all the Banners.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Image
                      src={banner.imageString}
                      alt="image"
                      width={100}
                      height={100}
                      className="relative rounded-full"
                    />
                  </TableCell>
                  <TableCell>{banner.title}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banners/${banner.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
