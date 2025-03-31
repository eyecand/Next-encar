import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getMaxCount = async () => {
  return (await axiosInstance.get(ApiRoutes.COUNT)).data;
};
