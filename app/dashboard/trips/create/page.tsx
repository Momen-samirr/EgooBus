"use client";

import { createTrip } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import { tripSchema } from "@/app/lib/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";

export default function CreateTripRoute() {
  const [lastResult, action] = useActionState(createTrip, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: tripSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedType, setSelectedType] = React.useState(
    fields.type?.initialValue || ""
  );

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-5">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/trips"}>
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Create Trip</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Create Trip</CardTitle>
          <CardDescription>Enter the trip details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Trip Title */}
            <div className="flex flex-col gap-3">
              <Label>Trip Title</Label>
              <Input
                name={fields.title?.name || ""}
                defaultValue={fields.title?.initialValue || ""}
                className="w-full"
              />
              <p className="text-sm text-red-500">{fields.title?.errors}</p>
            </div>

            {/* Trip Type */}
            <div className="flex flex-col gap-3">
              <Label>Type</Label>
              <Select
                name={fields.type?.name || ""}
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Attendance">Attendance</SelectItem>
                  <SelectItem value="Departure">Departure</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">
                {fields.type?.errors?.[0] || ""}
              </p>
            </div>

            {/* Trip Date */}
            <div className="flex flex-col gap-3">
              <Label>Date</Label>
              <Input
                type="date"
                name={fields.date?.name || ""}
                defaultValue={fields.date?.initialValue || ""}
                className="w-full"
              />
              <p className="text-sm text-red-500">{fields.date?.errors}</p>
            </div>

            {/* Trip Time */}
            <div className="flex flex-col gap-3">
              <Label>Time</Label>
              <Input
                type="time"
                name={fields.time?.name || ""}
                defaultValue={fields.time?.initialValue || ""}
                className="w-full"
              />
              <p className="text-sm text-red-500">{fields.time?.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtons text="Create Trip" />
        </CardFooter>
      </Card>
    </form>
  );
}
