import { lib_makes } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getMakes = async (): Promise<lib_makes[]> => {
  return (await axiosInstance.get<lib_makes[]>(ApiRoutes.MAKES)).data;
};
