"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "./spinner";

export const ImageLoader = ({ imageUrl }: { imageUrl: string | undefined }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = imageUrl ?? "./12.png";
  }, [imageUrl]);

  return (
    <>
      {isLoading ? (
        <div className=" flex justify-center items-center  h-full">
          <Spinner />
        </div>
      ) : (
        <>
          <Image
            className="object-cover rounded-md w-full h-full  md:max-w-[320px] md:max-h-[220px] lg:max-h-[240px]"
            src={imageUrl ?? "./12.png"}
            alt="#"
            width={320}
            height={240}
          />
        </>
      )}
    </>
  );
};
