import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { detectFuels } from "@/hooks/use-fuels";
import DynamicImage from "@/components/shared/dynamic-image";
import { PriceAll } from "@/components/shared/price-on-mian-windows";

import NotImage from "../../../public/12.png";
import { InterfaceProps } from "../model";

export const Mobile = ({ vehicle, className }: InterfaceProps) => {
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
                  <div className="mr-5  w-full h-full  md:w-[320px] md:h-[220px] lg:h-[240px]">
                    {item.encar.photos.length === 0 ? (
                      <Image
                        className="object-cover rounded-md w-full h-full  md:max-w-[320px] md:max-h-[220px] lg:max-h-[240px]"
                        alt="not found"
                        src={NotImage}
                        width={350}
                        height={250}
                      />
                    ) : (
                      <DynamicImage url={item.encar.photos[0].url} />
                    )}
                  </div>
                  <div className="params flex-grow-0 flex-shrink basis-[400px] min-w-[232px] mr-5">
                    <div className="title">
                      <h3 className="inline text-[18px] leading-[25px]">
                        {item.encar.details.makes.make_short_name}{" "}
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
                    <div className="button flex ">
                      <div className="inline-flex bg-gray-300/50 items-center whitespace-nowrap h-[26px] text-[13px] leading-tight text-black px-2 py-[10px] rounded-xl mt-1">
                        без пробега по РФ
                      </div>
                    </div>
                  </div>
                  <div className="price flex flex-shrink-0 flex-grow-0 w-[140px]">
                    <div className="flex-shrink-0 flex-grow-0 basis-full">
                      <PriceAll
                        price_origion={item.encar.details.origin_price}
                        years={item.encar.details.form_year}
                        fuel={item.encar.details.fuel.fuel_english}
                        engine={item.encar.details.engine_displacement}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
        )}
    </div>
  );
};
