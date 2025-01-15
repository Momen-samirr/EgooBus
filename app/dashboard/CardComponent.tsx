import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function CardComponent() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Card Title</CardTitle>
          <DollarSign className="size-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$100.00</p>
          <p className="text-sm text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Card Title</CardTitle>
          <DollarSign className="size-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$100.00</p>
          <p className="text-sm text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Card Title</CardTitle>
          <DollarSign className="size-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$100.00</p>
          <p className="text-sm text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Card Title</CardTitle>
          <DollarSign className="size-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$100.00</p>
          <p className="text-sm text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
    </>
  );
}
