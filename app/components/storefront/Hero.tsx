import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const getData = async () => {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
export async function Hero() {
  const data = await getData();
  return (
    <Carousel>
      <CarouselContent>
        {data.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className=" relative h-[60vh] lg:h-[80vh]">
              <Image
                className="object-cover w-full h-full rounded-xl"
                src={banner.imageString}
                alt="Image"
                fill
              />
              <div className="absolute top-6 left-6 text-white p-5 bg-black opacity-75 transition-all hover:scale-105 rounded-xl">
                <h1 className="text-2xl shadow-lg font-bold lg:text-4xl">
                  {banner.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  );
}
