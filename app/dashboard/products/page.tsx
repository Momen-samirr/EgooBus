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

export async function getProductData() {
  const data = await prisma.product.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  return data;
}

export default async function ProductsRoute() {
  const data = await getProductData();
  console.log(data);
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href={"/dashboard/products/create"}>
            <PlusCircle className="size-5" />
            <span>Create Product</span>
          </Link>
        </Button>
      </div>
      <div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Moinitor products list</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.price}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Intl.DateTimeFormat("en-Us").format(
                        product.createAt
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} size={"icon"}>
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/${product.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/products/${product.id}/delete`}
                            >
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
      </div>
    </>
  );
}
