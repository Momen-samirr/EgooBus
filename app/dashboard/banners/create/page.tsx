"use client";

import { createBanner } from "@/app/actions";
import SubmitButtons from "@/app/components/dashboard/submitButtons";
import { UploadButton } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchema";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function CreateBannerRoute() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(createBanner, undefined);
  const [form, fileds] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: bannerSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Ensure fields are properly initialized
  if (!fileds.imageString || !fileds.title) {
    console.error("Form fields are not properly initialized:", fileds);
    return <div>Error loading form fields.</div>;
  }

  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex items-center gap-5">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/dashboard/banners"}>
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold tracking-tight">
            Create Banner
          </h1>
        </div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Banner Form</CardTitle>
            <CardDescription>
              This is a form to create a new banner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter title"
                  key={fileds.title.key}
                  name={fileds.title.name}
                  defaultValue={fileds.title.initialValue || ""}
                />
                <p className="text-red-500">{fileds.title.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Image</Label>
                <input
                  type="hidden"
                  value={image || ""}
                  key={fileds.imageString.key}
                  name={fileds.imageString.name}
                />
                {image ? (
                  <div className="flex items-center gap-5">
                    <Image
                      src={image}
                      alt="image"
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] rounded-md"
                    />
                  </div>
                ) : (
                  <UploadButton
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      if (res && res[0]?.url) {
                        setImage(res[0].url);
                      } else {
                        console.error("Upload result is invalid:", res);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                    }}
                  />
                )}
                <p className="text-red-500">{fileds.imageString.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButtons text="Create Banner" />
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
