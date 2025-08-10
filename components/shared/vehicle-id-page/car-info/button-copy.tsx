"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
export const ButtonCopy = ({ copyLink }: ButtonCopyProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const copyText = async () => {
    try {
      setIsCopy(true);
      await navigator.clipboard.writeText(copyLink);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (error) {
      console.error(`Failed to copy: ${error}`);
    }
  };
  return (
    <div className="flex mt-[10px]">
      <button disabled={isCopy} className="ml-2 mt-[10px] flex pt-0  ">
        {isCopy ? (
          <IoIosCheckmark size={25} />
        ) : (
          <IoCopyOutline
            className="cursor-pointer hover:text-gray-500"
            onClick={copyText}
            size={20}
          />
        )}
      </button>
    </div>
  );
};

type ButtonCopyProps = {
  copyLink: string;
};
