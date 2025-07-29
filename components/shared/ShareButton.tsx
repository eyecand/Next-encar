"use client";
import React, { useRef } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useClickAway } from "react-use";
interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  description = "",
}) => {
  const [focused, setFocused] = React.useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setFocused(false);
  });

  const shareUrls = [
    {
      url: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title + (description ? description : ""))}`,
      icon: <FaTelegram size={20} className="text-blue-500" />,
    },
    {
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + (description ? description : "") + " " + url
      )}`,
      icon: <FaWhatsapp size={20} className="text-green-500" />,
    },
  ];

  return (
    <div ref={ref} className="relative inline-block ">
      <button
        type="button"
        className="inline-flex justify-center  w-full rounded-md border border-gray-200 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={() => setFocused(!focused)}
      >
        <CiShare2 size={18} />
      </button>

      <div
        className={`absolute top-0 left-full ml-2 flex items-center space-x-2 bg-white rounded-md shadow-lg border border-gray-300 transition-all duration-500 ease-linear  ${
          focused ? "" : "hidden"
        }`}
      >
        {shareUrls.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default ShareButton;
