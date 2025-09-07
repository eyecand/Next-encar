"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DiagnosticFront from "../../public/map_inspect_front.webp";
import DiagnosticBack from "../../public/map_inspect_back.png";
import { AlertDiagnosticProps } from "@/app/[makes]/[model]/[evolutions]/[id]/model";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { VehicleIdInspections } from "./vehicle-id-table/vehicle-id-inspections";
type list = {
  [key: string]: string;
};

const icons = [
  {
    name: "Замена",
    icon: "X",
    bg: "bg-red-500",
  },
  {
    name: "Листовой металл/сварка",
    icon: "W",
    bg: "bg-blue-500",
  },
  {
    name: "Коррозия",
    icon: "С",
    bg: "bg-orange-400",
  },
  {
    name: "Царапины",
    icon: "A",
    bg: "bg-gray-500",
  },
  {
    name: "Неровности",
    icon: "U",
    bg: "bg-green-500",
  },
  {
    name: "Повреждения",
    icon: "T",
    bg: "bg-amber-700",
  },
];
export const AlertDiagnostic = ({
  diagnostics,
  inspections,
}: AlertDiagnosticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false); // Close the dialog after confirmation
  };
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  const list = diagnostics?.diagnosis.filter(
    (item) => Number(item.diagnosis_result_id) === 2
  );
  const commentList = diagnostics?.diagnosis.filter(
    (item) => item.comments !== null
  );
  const replaceDetail = (diagnosis_result_id: number) => {
    const listDetail: list = {
      1: "top-[42%] left-[13%]",
      2: "top-[62%] left-[13%]",
      3: "top-[92%] left-[46%]",
      4: "top-[62%] left-[80%]",
      5: "top-[42%] left-[80%]",
      6: "top-[20%] left-[46%]",
      7: "top-[22%] left-[78%]",
      8: "top-[22%] left-[14%]",
    };
    return listDetail[diagnosis_result_id];
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={openDialog}
          className=" px-6 py-6 w-full  bg-blue-400 hover:bg-blue-600 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative grow"
        >
          Отчет осмотра авто
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent ref={ref}>
        <AlertDialogHeader className="flex-row justify-between items-center ">
          <AlertDialogTitle className="text-2xl mb-2">
            Отчёт инспекции авто
          </AlertDialogTitle>

          <IoIosClose
            onClick={handleConfirm}
            size={30}
            className="cursor-pointer mb-1 hover:text-gray-400 transition-colors duration-150 ease-linear"
          />
        </AlertDialogHeader>
        <div className="w-full">
          <h4 className="font-gilroy text-xl leading-6 font-medium text-zinc-900 pr-6 -pl-1 mb-8">
            Осмотр внешних компонентов
          </h4>
          <div className="flex flex-wrap gap-4 items-center justify-center bg-gray-200 rounded-2xl text-zinc-700 p-4">
            {icons.map((item) => (
              <div
                key={item.name}
                className="flex flex-row items-center gap-2 text-sm"
              >
                <span
                  className={`text-white ${item.bg} w-5 h-5 flex items-center justify-center rounded-full`}
                >
                  {item.icon}
                </span>{" "}
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row mb-8 mt-4 rounded-2xl bg-white">
            <div className="w-full lg:w-1/2 my-6">
              <div className="mx-auto relative max-w-[400px]">
                <Image src={DiagnosticFront} alt="front" />
                {list?.map((item) => (
                  <span
                    key={item.diagnosis_code_id}
                    className={`${replaceDetail(
                      item.diagnosis_code_id
                    )} bg-red-500  absolute rounded-full text-white w-6 h-6 flex justify-center items-center`}
                  >
                    X
                  </span>
                ))}
                {/* <span className="top-[42%] left-[80%] bg-red-500 absolute rounded-full text-white w-6 h-6 flex justify-center items-center">
                  X
                </span> */}
              </div>
            </div>
            <div className="w-full lg:w-1/2 my-6">
              <div className="mx-auto relative max-w-[400px]">
                <Image src={DiagnosticBack} alt="back" />
                {/* <span className="p022 insp-s-x absolute rounded-full text-white w-6 h-6 flex justify-center items-center"></span> */}
              </div>
            </div>
          </div>
          <h5 className="text-xl leading-6 font-medium text-zinc-900  pr-6 -pl-1 mb-5 mt-12">
            Инспекция авто
          </h5>
          <div className="flex flex-col">
            {commentList?.map((item, index) => (
              <span className="mb-3" key={index}>
                {item.comments?.comment_russian
                  ? `- ${item.comments?.comment_russian}`
                  : ""}
              </span>
            ))}
          </div>
          {inspections && <VehicleIdInspections data={inspections} />}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
