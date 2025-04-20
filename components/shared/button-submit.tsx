"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "./spinner";
import { usePendingFormtore } from "@/store/pending-form";
import { useEffect } from "react";

export const ButtonSubmit = () => {
  const { pending } = useFormStatus();
  const setPending = usePendingFormtore((state) => state.setPendingFormStore);
  useEffect(() => {
    setPending(pending);
  }, [pending]);
  return (
    <div className="flex flex-col sm:flex-row col-span-12 gap-6">
      <div className=" flex justify-center items-center relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <Button
          variant={"default"}
          type="submit"
          disabled={pending}
          className="mt-2 w-[160px]"
        >
          {pending ? <Spinner /> : "Показать результат"}
        </Button>
      </div>
    </div>
  );
};
