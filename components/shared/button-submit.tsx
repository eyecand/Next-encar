"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "./spinner";
import { usePendingFormtore } from "@/store/pending-form";
import { useEffect } from "react";

export const ButtonSubmit = ({
  handleRemove,
}: {
  handleRemove: () => void;
}) => {
  const { pending } = useFormStatus();
  const setPending = usePendingFormtore((state) => state.setPendingFormStore);
  useEffect(() => {
    setPending(pending);
  }, [pending]);
  return (
    <div className="flex  justify-center flex-row col-span-12 ">
      <div className=" flex justify-start items-center relative text-sm w-full grow sm:w-1/2">
        <Button
          variant={"default"}
          type="submit"
          disabled={pending}
          className="mt-2 w-[160px] bg-green-700 hover:bg-green-700/70 transition-colors duration-200 easy-in"
        >
          {pending ? <Spinner /> : "Показать результат"}
        </Button>
      </div>
      <div className=" flex justify-end items-center relative text-sm w-full grow sm:w-1/2">
        <Button onClick={handleRemove} className="mt-2 w-[160px]">
          Сбросить все
        </Button>
      </div>
    </div>
  );
};
