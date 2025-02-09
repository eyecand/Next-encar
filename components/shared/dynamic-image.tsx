"use server";
import { getImage } from "@/lib/getImage";
import Image from "next/image";

export default async function DynamicImage({ url }: { url: string }) {
  const { base64, img } = await getImage(url);
  return (
    // <h4>Hello</h4>
    <Image
      className="relative"
      alt="#"
      {...img}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}
