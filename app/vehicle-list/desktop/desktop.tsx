"use client";
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

export const Desktop = ({
  vehicle,
  className,
  EUR,
  KRW,
  fraht,
  broker,
  k_krw,
  commision,
}: InterfaceProps) => {
  return (
    <div className={cn(className, "flex-col gap-10  ")}>
      {vehicle.length > 0 &&
        vehicle.map((item, index) => {
          return (
            item.encar.details !== null && (
              <Link
                key={index}
                target="_blank"
                href={`/${item.encar.details.makes.make_short_name}/${item.encar.details.model.model_short_name}/${item.encar.details.model.model_english}/uid-${item.encar.id}`}
                className=" p-5 max-w-7xl "
              >
                <div className="flex justify-between relative card-car">
                  <div className="mr-5 relative w-full h-full  md:w-[320px] md:h-[220px] lg:h-[240px]">
                    {item.encar.photos.length === 0 ? (
                      <Image
                        className="rounded-md"
                        alt="not found"
                        src={NotImage}
                        width={320}
                        height={240}
                      />
                    ) : (
                      <ImageLoader
                        imageUrl={
                          item.encar.photos.filter((photo) =>
                            photo.s3_images?.url.includes("001")
                          )[0] === undefined
                            ? item.encar.photos[0].s3_images?.url
                            : item.encar.photos.filter((photo) =>
                                photo.s3_images?.url.includes("001")
                              )[0].s3_images?.url
                        }
                      />
                    )}
                  </div>
                  <div className="flex flex-col basis-[400px] min-w-[232px] mr-5">
                    <div className="flex-1">
                      <div className="title">
                        <h3 className="inline text-[18px] leading-[25px] font-semibold">
                          {detectMake(
                            String(item.encar.details.makes.make_short_name)
                          )}{" "}
                          {item.encar.details.model.model_english === "Canival"
                            ? "Carnival"
                            : item.encar.details.model.model_english}
                          ,{" "}
                          {new Date(
                            item.encar.details.release_date
                          ).getFullYear()}
                        </h3>
                        <div className="text-[14px] leading-[20px] mt-1 text-gray-500">
                          {String(
                            item.encar.details.grades.grade_english
                          ).replace(" China Manufacturer", "")}{" "}
                          {item.encar.details.grades.grade_detail_english
                            ? String(
                                item.encar.details.grades.grade_detail_english
                              ).replace(" China Manufacturer", "")
                            : ""}
                        </div>
                      </div>
                      <div className="middle mt-1 text-[15px] leading-6">
                        {item.encar.details.engine_displacement < 500 ? (
                          ""
                        ) : (
                          <span className="whitespace-nowrap">
                            {Number(
                              item.encar.details.engine_displacement_liters
                            )}{" "}
                            л,{" "}
                          </span>
                        )}

                        <span className="whitespace-nowrap">
                          {detectFuels(
                            item.encar.details.fuel.fuel_english
                              ? item.encar.details.fuel.fuel_english
                              : ""
                          )}
                          ,{" "}
                        </span>
                        <span className="whitespace-nowrap">
                          {new Intl.NumberFormat("ru-RU")
                            .format(Number(item.encar.details.mileage))
                            .replace(",", ".")}{" "}
                          км
                        </span>
                      </div>

                      {Number(item.encar.accident?.current_accident_count) +
                      Number(item.encar.accident?.other_accident_count) ? (
                        <div className="button flex ">
                          <div className="inline-flex bg-rose-50 border-rose-100 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-rose-600 px-3 py-[10px] rounded-xl mt-1">
                            Был в аварии
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-shrink-0 flex-grow-0 w-[260px]">
                    <div className="flex-1 basis-full">
                      <PriceAll
                        price_origion={Number(item.encar.advertisements?.price)}
                        years={String(item.encar.details.release_date)}
                        fuel={item.encar.details.fuel.fuel_english}
                        engine={item.encar.details.engine_displacement}
                        isMobile={false}
                        EUR={EUR}
                        KRW={KRW}
                        broker={broker}
                        fraht={fraht}
                        k_krw={k_krw}
                        commision={commision}
                      />
                      <div className="flex flex-col items-end mt-2">
                        <span className="text-gray-500 text-[15px] leading-5">
                          Цена в Корее
                        </span>
                        <span className="font-bold text-lg">
                          {Intl.NumberFormat("ru", {
                            notation: "compact",
                            maximumFractionDigits: 2,
                          }).format(
                            Number(item.encar.advertisements?.price) * 10000
                          )}{" "}
                          ₩
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 items-end mt-2">
                        {(item.encar.lib_sell_types.sell_type ===
                          "RENT_SUCCESSION" ||
                          item.encar.lib_sell_types.sell_type ===
                            "RENT_CAR") && (
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
                              Кредит
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="middle mt-1 text-[15px] leading-6 flex justify-end">
                      <span className="whitespace-nowrap">
                        {detectedDate(item.encar.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
    </div>
  );
};
