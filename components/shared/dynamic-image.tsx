"use server";
import { getImage } from "@/lib/getImage";
import Image from "next/image";

export default async function DynamicImage({ url }: { url: string }) {
  const { base64, img } = await getImage(url);
  return (
    // <h4>Hello</h4>
    <Image
      className="object-cover rounded-md w-full h-full  md:max-w-[320px] md:max-h-[220px] lg:max-h-[240px]"
      alt="#"
      {...img}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}
