import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardComponent from "./CardComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* Ensure CardComponent handles null/undefined internally */}
        <CardComponent />
      </div>
      <div className="grid gap-5 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Based on 100 Charges</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-7">
            {/* Guard Avatar and dynamic data */}
            <div className="flex items-center gap-5">
              <Avatar className="hidden sm:flex size-10">
                {/* Ensure fallback content is always present */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Momen Samir</p>
                <p className="text-sm text-muted-foreground">
                  midoalzahbe@gmail.com
                </p>
              </div>
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
