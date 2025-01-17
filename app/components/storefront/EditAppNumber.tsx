"use client";

import { updateApplicationNumber } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import { userSchema } from "@/app/lib/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

interface iAppprops {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    applicationNumber: string;
    createAt: Date;
  };
}

export function ProfilePage({ data }: iAppprops) {
  const { toast } = useToast();
  const [lastResult, action] = useActionState(
    updateApplicationNumber,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: userSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Handle success or error after form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    form.onSubmit(e);

    if (lastResult?.error) {
      // Display error to the user
      const errorMessages = lastResult.error.general || [];
      errorMessages.forEach((error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Success",
        description: "Application Number updated successfully.",
        variant: "default",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Button asChild variant={"outline"}>
          <Link href={`/`}>
            <ChevronLeft />
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <div className="p-6">
          <CardTitle className="mb-[5px]">Profile</CardTitle>
          <CardDescription>
            Edit your profile and set your Application Number.
          </CardDescription>
        </div>
        <CardContent>
          <form id={form.id} onSubmit={handleSubmit} action={action}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Application Number</Label>
                <Input
                  type="text"
                  placeholder="Enter Application Number"
                  key={fields.applicationNumber.key}
                  name={fields.applicationNumber.name}
                  defaultValue={data.applicationNumber ?? ""}
                />
                <p className="text-red-500">
                  {fields.applicationNumber.errors}
                </p>
              </div>
            </div>
            <CardFooter>
              <SubmitButtons text="Save" variant={"default"} />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
