import Link from "next/link";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

interface Props {
  isActive: boolean;
  strHref: string;
}
export const ChekingActiveLot = ({ isActive, strHref }: Props) => {
  return (
    <>
      {isActive ? (
        <div className="flex flex-col w-full md:w-[36%] mt-2 md:mt-4">
          <Link
            target="_blank"
            rel="nofollow"
            href={`https://t.me/Autofish_office?text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            className="w-full  py-4 text-sm bg-[#e05358] text-white uppercase font-gilroy font-semibold rounded-xl  flex items-center justify-center hover:bg-[#ac3f42] duration-300"
          >
            Заказать
          </Link>
          <span className="w-full text-center mt-2">или напишите нам</span>
          <div className="flex items-center justify-between gap-4 mt-2 ">
            <Link
              className="block w-[50%]"
              target="_blank"
              rel="nofollow"
              href={`https://t.me/Autofish_office?text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            >
              <button className="flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                <FaTelegram size={25} className="text-blue-500" />
              </button>
            </Link>
            <Link
              className="block w-[50%]"
              target="_blank"
              rel="nofollow"
              href={`https://api.whatsapp.com/send/?phone=79850364206&text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            >
              <button className="flex justify-center items-center bg-gray-100 w-full h-[40px] rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                <FaWhatsapp size={25} className="text-green-500" />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full md:w-[36%] mt-2 md:mt-4">
          <p className="flex-1 text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Лот продан
          </p>
          <Link
            target="_blank"
            rel="nofollow"
            href={`https://t.me/Autofish_office?text=Здравствуйте, заинтересовал автомобиль ${strHref}`}
            className="w-full mb-0 md:mb-2  py-3.5 text-sm bg-[#e05358] text-white uppercase font-gilroy font-semibold rounded-xl text-center  flex items-center justify-center hover:bg-[#ac3f42] duration-300"
          >
            Заказать похожий
          </Link>
        </div>
      )}
    </>
  );
};
