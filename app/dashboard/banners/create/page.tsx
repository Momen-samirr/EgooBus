"use client";

// import { createBanner } from "@/app/actions";
// import SubmitButtons from "@/app/components/dashboard/submitButtons";
// import { UploadButton } from "@/app/lib/uploadthing";
// import { bannerSchema } from "@/app/lib/zodSchema";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm } from "@conform-to/react";
// import { parseWithZod } from "@conform-to/zod";
// import { ChevronLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useActionState, useState } from "react";

export const dynamic = "force-dynamic"; // Prevents pre-rendering errors

export default function CreateBannerRoute() {
  <div>Soon</div>;
  // const [image, setImage] = useState<string | undefined>(undefined);
  // const [lastResult, action] = useActionState(createBanner, undefined);

  // const [form, fields] = useForm({
  //   lastResult,
  //   onValidate: ({ formData }) => {
  //     return parseWithZod(formData, {
  //       schema: bannerSchema,
  //     });
  //   },
  //   shouldValidate: "onBlur",
  //   shouldRevalidate: "onInput",
  // });

  // if (!fields) {
  //   console.error("Form fields are not properly initialized");
  //   return <div>Error loading form fields.</div>;
  // }

  // return (
  //   <form id={form.id} onSubmit={form.onSubmit} action={action}>
  //     <div className="flex items-center gap-5">
  //       <Button variant={"outline"} size={"icon"} asChild>
  //         <Link href={"/dashboard/banners"}>
  //           <ChevronLeft className="size-5" />
  //         </Link>
  //       </Button>
  //       <h1 className="text-xl font-semibold tracking-tight">Create Banner</h1>
  //     </div>
  //     <Card className="mt-5">
  //       <CardHeader>
  //         <CardTitle>Banner Form</CardTitle>
  //         <CardDescription>
  //           This is a form to create a new banner
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="flex flex-col gap-6">
  //           {/* Banner Title */}
  //           <div className="flex flex-col gap-3">
  //             <Label>Title</Label>
  //             <Input
  //               type="text"
  //               placeholder="Enter title"
  //               key={fields?.title?.key}
  //               name={fields?.title?.name || "title"}
  //               defaultValue={fields?.title?.initialValue || ""}
  //             />
  //             <p className="text-red-500">{fields?.title?.errors?.[0]}</p>
  //           </div>

  //           {/* Banner Image */}
  //           <div className="flex flex-col gap-3">
  //             <Label>Image</Label>
  //             <input
  //               type="hidden"
  //               value={image || ""}
  //               key={fields?.imageString?.key}
  //               name={fields?.imageString?.name || "imageString"}
  //             />
  //             {image ? (
  //               <div className="flex items-center gap-5">
  //                 <Image
  //                   src={image}
  //                   alt="Uploaded Image"
  //                   width={200}
  //                   height={200}
  //                   className="w-[200px] h-[200px] rounded-md"
  //                 />
  //               </div>
  //             ) : (
  //               <UploadButton
  //                 endpoint={"imageUploader"}
  //                 onClientUploadComplete={(res) => {
  //                   if (res?.[0]?.url) {
  //                     setImage(res[0].url);
  //                   }
  //                 }}
  //                 onUploadError={(error: Error) => {
  //                   console.error(error);
  //                 }}
  //               />
  //             )}
  //             <p className="text-red-500">{fields?.imageString?.errors?.[0]}</p>
  //           </div>
  //         </div>
  //       </CardContent>
  //       <CardFooter>
  //         <SubmitButtons text="Create Banner" />
  //       </CardFooter>
  //     </Card>
  //   </form>
  // );
}
