import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { detectFuels } from "@/lib/detect-fuels";
import { PriceAll } from "@/components/shared/price-on-mian-windows";
import { ImageLoader } from "../../../components/shared/image-loader";

import NotImage from "../../../public/12.png";
import { InterfaceProps } from "../model";
import { detectMake } from "@/components/shared/form-korea-cars/first-line/lib";
import { detectedDate } from "@/lib/detected-date";

export const Mobile = ({ vehicle, className }: InterfaceProps) => {
  return (
    <div
      className={cn(
        className,
        "flex-col items-center sm:flex-row p-4  pb-0 sm:flex-wrap"
      )}
    >
      {vehicle.length > 0 &&
        vehicle.map(
          (item) =>
            item.encar.details !== null && (
              <Link
                key={item.encar.id}
                target="_blank"
                href={`/vehicle/${item.encar.id}`}
                className={"w-[320px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"}
              >
                <div
                  className={`bg-white border-light-gray rounded-xl overflow-hidden flex flex-col relative
                min-h-[300px] sm:transition-all border-[2.5px] sm:hover:shadow-xl sm:hover:-translate-y-2 shadow-md`}
                >
                  <div className="w-full flex relative">
                    {item.encar.photos.length === 0 ? (
                      <Image
                        className="object-cover rounded-md w-full h-full  md:max-w-[320px] md:max-h-[220px] lg:max-h-[240px]"
                        alt="not found"
                        src={NotImage}
                        width={350}
                        height={276}
                      />
                    ) : (
                      <ImageLoader imageUrl={item.encar.photos[0].url} />
                    )}
                  </div>

                  <div className="p-1 sm:p-2 md:p-3 lg:p-4 grow flex flex-col">
                    <div className="items-center justify-between min-h-[81px] flex gap-1 md:gap-3 py-1 md:py-3 text-gray-900 border-b border-gray-200 grow">
                      <span className="font-bold text-xs sm:text-base lg:text-lg font-gilroy">
                        {detectMake(
                          String(item.encar.details.makes.make_short_name)
                        )}{" "}
                        {item.encar.details.model.model_short_name}
                      </span>
                      {(item.encar.lib_sell_types.sell_type ===
                        "RENT_SUCCESSION" ||
                        item.encar.lib_sell_types.sell_type === "RENT_CAR") && (
                        <div className="button flex ">
                          <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
                            Рента
                          </div>
                        </div>
                      )}
                      {(item.encar.lib_sell_types.sell_type ===
                        "FINANCING_LEASE" ||
                        item.encar.lib_sell_types.sell_type ===
                          "OPERATING_LEASE") && (
                        <div className="button flex ">
                          <div className="inline-flex bg-rose-500/80 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-3 py-[10px] rounded-xl mt-1">
                            Лизинг
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="align-middle flex py-3 text-gray-900 text-[12px] lg:text-sm justify-between items-baseline border-b  border-gray-200 relative">
                      <span className="text-gray-500">Год:</span>
                      <div className="flex">
                        <span className="text-red-700 mx-[2px] md:mx-2">
                          {item.encar.details.form_year}
                        </span>
                        <span className="whitespace-nowrap">
                          {String(
                            item.encar.details.grades.grade_english
                          ).replace(" China Manufacturer", "")}
                        </span>
                      </div>
                    </div>
                    <div className="align-middle  text-[12px] lg:text-sm mx-[2px] flex py-3 whitespace-nowrap text-gray-900  justify-between items-baseline border-b  border-gray-200 relative">
                      <span className="text-gray-500 ">Двигатель:</span>
                      <div>
                        <span className="text-red-700 mx-[2px] md:mx-2">
                          {detectFuels(
                            item.encar.details.fuel.fuel_english
                              ? item.encar.details.fuel.fuel_english
                              : ""
                          )}
                        </span>
                        {item.encar.details.engine_displacement < 500 ? (
                          ""
                        ) : (
                          <span className="text-gray-400 ml-2">
                            {Number(
                              item.encar.details.engine_displacement_liters
                            )}{" "}
                            л
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="align-middle flex py-3 text-[12px]  whitespace-nowrap text-gray-900  justify-between items-baseline border-b  border-gray-200 relative">
                      <span className="text-gray-500">Пробег:</span>
                      <div className="flex items-center space-x-2">
                        <span className="">
                          {new Intl.NumberFormat("ru-RU")
                            .format(Number(item.encar.details.mileage))
                            .replace(",", ".")}{" "}
                          км
                        </span>
                      </div>
                    </div>
                    <div className="align-middle flex py-3 text-[12px]  whitespace-nowrap text-gray-900  justify-between items-baseline border-b  border-gray-200 relative">
                      <span className="text-gray-500">Дата:</span>
                      <div className="flex items-center space-x-2">
                        <span className="">
                          {detectedDate(item.encar.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-black text-wrap text-[14px] whitespace-nowrap font-semibold px-2 pb-5">
                    <PriceAll
                      price_origion={Number(item.encar.advertisements?.price)}
                      years={item.encar.details.form_year}
                      fuel={item.encar.details.fuel.fuel_english}
                      engine={item.encar.details.engine_displacement}
                      isMobile={true}
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[10px]">
                        Цена в Корее
                      </span>
                      <span className="font-bold text-sm">
                        {Intl.NumberFormat("ru", {
                          notation: "compact",
                        }).format(
                          Number(item.encar.advertisements?.price) * 10000
                        )}{" "}
                        ₩
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
        )}
    </div>
  );
};
