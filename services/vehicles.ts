import { lib_makes } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
// import { encarType } from "@/app/api/vehicles/route";

// export const getAll = async (): Promise<encarType[]> => {
//   return (await axiosInstance.get<encarType[]>(ApiRoutes.VEHICLES)).data;
// };

export const getMakes = async (): Promise<lib_makes[]> => {
  return (await axiosInstance.get<lib_makes[]>(ApiRoutes.MAKES)).data;
};
