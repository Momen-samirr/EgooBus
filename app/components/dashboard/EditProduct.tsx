"use client";

import { $Enums } from "@prisma/client";
import { useActionState, useState } from "react";
import { editProduct } from "../../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "../../lib/zodSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryList } from "./categoryList";
import Image from "next/image";
import { UploadButton } from "../../lib/uploadthing";
import SubmitButtons from "./submitButtons";

interface IAppProduct {
  productData: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    status: $Enums.stuatusEnum;
    category: $Enums.categoryEnum;
    isFeatured: boolean;
  };
}

export function EditProduct({ productData }: IAppProduct) {
  const [lastResult, action] = useActionState(editProduct, undefined);
  const [images, setImages] = useState<string[]>(productData.images);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: productSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handelDeleteImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={productData.id} />
      <div className="flex items-center gap-5">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={`/dashboard/products`}>
            <ChevronLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
        </div>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Edit Product Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Product Name"
                className="w-full"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={productData.name}
              />
              <p className="text-sm text-red-500">{fields.name.errors}</p>
            </div>
            <div className="felx flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Product Description"
                className="mt-3"
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={productData.description}
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Product Price"
                className="w-full"
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={productData.price}
              />
              <p className="text-sm text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Features</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={productData.isFeatured}
              />
              <p className="text-sm text-red-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={productData.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="publish">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={productData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CategoryList.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <Input
                type="hidden"
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as string}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-[100px] h-[100px] rounded-md"
                    >
                      <Image
                        key={index}
                        src={image}
                        width={100}
                        height={100}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handelDeleteImage(index)}
                        className="absolute -top-3 -right-3 bg-red-500 p-3 rounded-lg text-white"
                      >
                        <XIcon className="size-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtons text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
