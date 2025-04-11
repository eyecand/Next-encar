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
    <>
      <Button
        variant={"default"}
        type="submit"
        disabled={pending}
        className="mt-2"
      >
        {pending ? <Spinner /> : "Найти автомобиль"}
      </Button>
    </>
  );
};
