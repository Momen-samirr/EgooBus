import { z } from "zod";
export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1),
  images: z.array(
    z.string().min(1, { message: "One Image is required at least" })
  ),
  status: z.enum(["draft", "publish", "archived"]),
  category: z.enum(["woman", "man", "kid"]),
  isFeatured: z.boolean().optional().default(false),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});

export const userSchema = z.object({
  applicationNumber: z.string().min(11, "Application Number is required"),
  role: z.enum(["admin", "driver", "user"]).default("user"),
});

export const tripSchema = z.object({
  title: z.string(),
  type: z.enum(["Attendance", "Departure"]),
  status: z.enum(["Available", "Reserved"]).default("Available"),
  date: z.date(),
  time: z.string(),
});
