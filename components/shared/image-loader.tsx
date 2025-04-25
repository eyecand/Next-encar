"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
type ImageErrorEvent = React.SyntheticEvent<HTMLImageElement, Event>;
import { Spinner } from "./spinner";

import SVG from "../../public/Logo-red.svg";

export const ImageLoader = ({ imageUrl }: { imageUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const onImageError = (e: ImageErrorEvent) => {
    const target = e.target as HTMLImageElement;
    target.src = "../../public/12.png";
  };
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = imageUrl;
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
            src={imageUrl}
            onError={onImageError}
            alt="#"
            width={320}
            height={240}
          />
          <div className="absolute items-center gap-3 sm:gap-0 flex w-[40%] h-[20%]  bg-black rounded-b-lg rounded-s-lg bottom-0 right-0 pl-1">
            <Image className="w-[35%]" src={SVG} alt="#" sizes="20" />
            <p className="text-white text-[16px] sm:text-[8px] md:text-[10px] md:ml-2 lg:text-sm">
              Autofish
            </p>
          </div>
        </>
      )}
    </>
  );
};
