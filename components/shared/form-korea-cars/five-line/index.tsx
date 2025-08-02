"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoQuestion } from "react-icons/go";

export const FiveLine: React.FC<Props<string | null>> = ({
  isChecked,
  isCheckedNewCar,
  isCheckedOldCar,
  onChangeCheckNew,
  onChangeCheckOld,
  onChangeCheck,
  setIsChecked,
  setIsCheckedNewCar,
  setIsCheckedOldCar,
}) => {
  useEffect(() => {
    const valueToSend = isChecked ? "2" : null;
    const valueNewCar = isCheckedNewCar ? "3" : null;
    const valueOldCar = isCheckedOldCar ? "4" : null;
    onChangeCheck(valueToSend);
    onChangeCheckNew(valueNewCar);
    onChangeCheckOld(valueOldCar);
  }, [isChecked, isCheckedNewCar, isCheckedOldCar]);

  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <div className="flex items-center space-x-2">
              <Checkbox
                className="rounded-[8px] w-6 h-6 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                checked={isCheckedNewCar}
                onCheckedChange={(checked) =>
                  setIsCheckedNewCar(checked as boolean)
                }
              />
              <label
                htmlFor={`checkbox-${String(2)}-${String(2)}`}
                className="leading-none cursor-pointer flex-1 flex items-center gap-2"
              >
                Новые
                <Popover>
                  <PopoverTrigger>
                    <GoQuestion size={20} className="hover:text-orange-500" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Новыми считаются автомобили, до 3-ех лет с даты производства
                    (таможенные правила РФ) Пошлина - 48% от стоимости авто
                  </PopoverContent>
                </Popover>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <div className="flex items-center space-x-2">
              <Checkbox
                className="rounded-[8px] w-6 h-6 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              />
              <label
                htmlFor={`checkbox-${String(1)}-${String(1)}`}
                className="leading-none cursor-pointer flex-1 flex items-center gap-2"
              >
                Проходные
                <Popover>
                  <PopoverTrigger>
                    <GoQuestion size={20} className="hover:text-orange-500" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Автомобили - от 3 до 5 лет, с даты производства. Самая
                    низкая пошлина!
                  </PopoverContent>
                </Popover>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 lg:col-span-4">
        <div className=" p-0.5  flex flex-row  hover:border-gray-400 focus-within:border-gray-400  rounded-lg ">
          <div className=" w-full text-[16px] md:text-sm ">
            <div className="flex items-center space-x-2">
              <Checkbox
                className="rounded-[8px] w-6 h-6 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                checked={isCheckedOldCar}
                onCheckedChange={(checked) =>
                  setIsCheckedOldCar(checked as boolean)
                }
              />
              <label
                htmlFor={`checkbox-${String(3)}-${String(3)}`}
                className="leading-none cursor-pointer flex-1 flex items-center gap-2"
              >
                От 5 до 7 лет
                <Popover>
                  <PopoverTrigger>
                    <GoQuestion size={20} className="hover:text-orange-500" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Пошлина дороже чем проходные, тем не менее проверьте свой
                    автомобиль, возможно не критично!
                  </PopoverContent>
                </Popover>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
interface Props<T> {
  onChangeCheck: (value: T) => void;
  onChangeCheckNew: (value: T) => void;
  onChangeCheckOld: (value: T) => void;
  setIsChecked: (value: boolean) => void;
  setIsCheckedNewCar: (value: boolean) => void;
  setIsCheckedOldCar: (value: boolean) => void;
  isCheckedNewCar: boolean;
  isCheckedOldCar: boolean;
  isChecked: boolean;
}
