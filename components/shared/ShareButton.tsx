"use client";
import React, { useRef } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useClickAway } from "react-use";
import Link from "next/link";
import { toast } from "sonner";
import { IoCopyOutline } from "react-icons/io5";
interface ShareButtonProps {
  telegram: string;
  whatsapp: string;
  copyLink: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  telegram,
  whatsapp,
  copyLink,
}) => {
  const [focused, setFocused] = React.useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setFocused(false);
  });
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      toast("Ссылка на карточку автомобиля успешно скопирована!");
    } catch (error) {
      console.error(`Failed to copy: ${error}`);
    }
  };
  return (
    <div ref={ref} className="relative inline-block mt-2 ">
      <button
        type="button"
        className="inline-flex justify-center  w-full rounded-md border border-gray-200 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={() => setFocused(!focused)}
      >
        <CiShare2 size={14} />
      </button>

      <div
        className={`absolute top-11 right-0 min-w-[300px] min-h-[290px] p-3 bg-white rounded-md shadow-lg border border-gray-300 transition-all duration-500 ease-linear z-20  ${
          focused ? "" : "hidden"
        }`}
      >
        <h3 className="font-medium text-2xl">Поделиться</h3>
        <p className="text-[#6C757D] text-base mb-4">
          Вы можете поделиться ссылкой на страницу в соц. сетях
        </p>
        <Link
          href={telegram}
          target="_blank"
          className="flex items-center space-x-2 border-t-2 py-4 hover:text-blue-500 cursor-pointer"
        >
          <FaTelegram size={25} className="text-blue-500" />{" "}
          <span>Telegram</span>
        </Link>
        <Link
          href={whatsapp}
          target="_blank"
          className="flex items-center space-x-2 border-t-2 py-4 hover:text-green-500 cursor-pointer"
        >
          <FaWhatsapp size={25} className="text-green-500" />{" "}
          <span>WhatsApp</span>
        </Link>
        <Link
          href="#"
          onClick={copyText}
          className="flex items-center space-x-2 border-t-2 py-4 hover:text-gray-500 cursor-pointer"
        >
          <IoCopyOutline size={25} /> <span>Копировать ссылку</span>
        </Link>

        {/* {shareUrls.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 hover:bg-gray-100 "
            onClick={() => setFocused(false)}
          >
            {item.icon}
          </a>
        ))} */}
      </div>
    </div>
  );
};

export default ShareButton;
