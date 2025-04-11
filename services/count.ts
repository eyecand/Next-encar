import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { cache } from "react";

export const getMaxCount = cache(async () => {
  return (await axiosInstance.get(ApiRoutes.COUNT)).data;
});
