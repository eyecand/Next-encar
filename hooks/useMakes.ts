import { Api } from "@/services/api-client";
import { lib_makes } from "@prisma/client";
import React from "react";

interface ReturnProps {
  makes: lib_makes[];
}
export const useMakes = (): ReturnProps => {
  const [makes, setMakes] = React.useState<lib_makes[]>([]);
  React.useEffect(() => {
    async function getMakes() {
      try {
        const makesAll = await Api.vehicles.getMakes();
        setMakes(makesAll);
      } catch (error) {
        console.log(error);
      }
    }
    getMakes();
  }, []);
  return { makes };
};
