"use client";

import { createTrip } from "@/app/actions"; // Adjust path if necessary
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

export const dynamic = "force-dynamic"; // Prevents pre-rendering errors

export default function CreateTripRoute() {
  const [lastResult, action] = useActionState(createTrip, {});
  console.log("Last Result:", lastResult || "No data");

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: tripSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedType, setSelectedType] = React.useState(
    () => fields?.type?.initialValue || ""
  );

  if (!fields) return <p>Loading...</p>; // Prevent rendering errors

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-5">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/trips">
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
            <div className="flex flex-col gap-3">
              <Label>Trip Title</Label>
              <Input
                name={fields?.title?.name || "title"}
                defaultValue={fields?.title?.initialValue || ""}
                className="w-full"
              />
              {fields?.title?.errors?.[0] && (
                <p className="text-sm text-red-500">{fields.title.errors[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Type</Label>
              <Select
                name={fields?.type?.name || "type"}
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
              {fields?.type?.errors?.[0] && (
                <p className="text-sm text-red-500">{fields.type.errors[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Date</Label>
              <Input
                type="date"
                name={fields?.date?.name || "date"}
                defaultValue={fields?.date?.initialValue || ""}
                className="w-full"
              />
              {fields?.date?.errors?.[0] && (
                <p className="text-sm text-red-500">{fields.date.errors[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Time</Label>
              <Input
                type="time"
                name={fields?.time?.name || "time"}
                defaultValue={fields?.time?.initialValue || ""}
                className="w-full"
              />
              {fields?.time?.errors?.[0] && (
                <p className="text-sm text-red-500">{fields.time.errors[0]}</p>
              )}
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
