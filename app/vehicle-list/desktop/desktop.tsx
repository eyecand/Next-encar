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

export const Desktop = ({ vehicle, className }: InterfaceProps) => {
  return (
    <div className={cn(className, "flex-col gap-10  ")}>
      {vehicle.length > 0 &&
        vehicle.map(
          (item, index) =>
            item.encar.details !== null && (
              <Link
                key={index}
                target="_blank"
                href={`/vehicle/${item.encar.id}`}
                className=" p-5 max-w-5xl "
              >
                <div className="flex justify-between relative card-car">
                  <div className="mr-5 relative w-full h-full  md:w-[320px] md:h-[220px] lg:h-[240px]">
                    {item.encar.photos.length === 0 ? (
                      <Image
                        className="object-cover rounded-md w-full h-full  md:max-w-[320px] md:max-h-[220px] lg:max-h-[240px]"
                        alt="not found"
                        src={NotImage}
                        width={350}
                        height={250}
                      />
                    ) : (
                      <ImageLoader imageUrl={item.encar.photos[0].url} />
                    )}
                  </div>
                  <div className="params flex-grow-0 flex-shrink basis-[400px] min-w-[232px] mr-5">
                    <div className="title">
                      <h3 className="inline text-[18px] leading-[25px]">
                        {detectMake(
                          String(item.encar.details.makes.make_short_name)
                        )}{" "}
                        {item.encar.details.model.model_short_name},{" "}
                        {item.encar.details.form_year}
                      </h3>
                      <div className="text-[13px] leading-[20px] mt-1 text-gray-400">
                        {item.encar.details.grades.grade_english}
                      </div>
                    </div>
                    <div className="middle mt-1 text-[15px] leading-6">
                      {item.encar.details.engine_displacement < 500 ? (
                        ""
                      ) : (
                        <span className="whitespace-nowrap">
                          {(
                            Math.round(item.encar.details.engine_displacement) /
                            1000
                          ).toFixed(1)}{" "}
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
                        {item.encar.details.mileage} км
                      </span>
                    </div>
                  </div>
                  <div className="price flex flex-shrink-0 flex-grow-0 w-[260px]">
                    <div className="flex-shrink-0 flex-grow-0 basis-full">
                      <PriceAll
                        price_origion={Number(item.encar.advertisements?.price)}
                        years={item.encar.details.form_year}
                        fuel={item.encar.details.fuel.fuel_english}
                        engine={item.encar.details.engine_displacement}
                        isMobile={false}
                      />
                      <div className="flex flex-col items-end mt-2">
                        <span className="text-gray-400 text-sm">
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
                    </div>
                  </div>
                </div>
              </Link>
            )
        )}
    </div>
  );
};
